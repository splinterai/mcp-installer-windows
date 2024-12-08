# Windows MCP Installer

A Windows-optimized installer for Model Context Protocol (MCP) servers. This installer properly handles Windows-specific path formatting and npm global installations.

## Features

- Windows-compatible path handling
- Proper npm global module resolution
- Environment variable support
- Configuration validation
- Server management (install, uninstall, list)

## Installation

```bash
npm install -g @splinterai/mcp-installer-windows
```

## Usage

### Installing a Server

```bash
mcp-installer-windows install <name> <package> [paths...] [-e KEY=VALUE...]

# Example: Installing filesystem MCP
mcp-installer-windows install filesystem @modelcontextprotocol/server-filesystem "C:\\Users\\Username\\Desktop" "C:\\Data"
```

### Uninstalling a Server

```bash
mcp-installer-windows uninstall <name>

# Example
mcp-installer-windows uninstall filesystem
```

### Listing Installed Servers

```bash
mcp-installer-windows list
```

### Validating Configuration

```bash
mcp-installer-windows validate
```

## Configuration

The installer creates a configuration file at `%APPDATA%\mcp\mcp-config.json`. The configuration format is:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "node",
      "args": [
        "C:\\Users\\Username\\AppData\\Roaming\\npm\\node_modules\\@modelcontextprotocol\\server-filesystem\\dist\\index.js",
        "C:\\Users\\Username\\Desktop",
        "C:\\Data"
      ],
      "env": {
        "KEY": "value"
      }
    }
  }
}
```

## Environment Variables

You can specify environment variables for MCP servers using the `-e` or `--env` option:

```bash
mcp-installer-windows install myserver mypackage path1 path2 -e API_KEY=xyz DEBUG=true
```

## Development

### Building

```bash
npm install
npm run build
```

### Testing

```bash
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT