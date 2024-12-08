#!/usr/bin/env node

import { Command } from 'commander';
import { join } from 'path';
import { WindowsMCPInstaller } from './installer';

const program = new Command();
const configDir = join(process.env.APPDATA || '', 'mcp');
const installer = new WindowsMCPInstaller(configDir);

program
  .name('mcp-installer-windows')
  .description('Windows-optimized MCP server installer')
  .version('1.0.0');

program
  .command('install <name> <package> [paths...]')
  .description('Install an MCP server')
  .option('-e, --env <envs...>', 'Environment variables in KEY=VALUE format')
  .action(async (name: string, packageName: string, paths: string[], options) => {
    try {
      const env: { [key: string]: string } = {};
      if (options.env) {
        options.env.forEach((envStr: string) => {
          const [key, value] = envStr.split('=');
          if (key && value) {
            env[key] = value;
          }
        });
      }
      await installer.installServer(name, packageName, paths, env);
      console.log(`Successfully installed ${name} MCP server`);
    } catch (error) {
      console.error('Error installing server:', error);
      process.exit(1);
    }
  });

program
  .command('uninstall <name>')
  .description('Uninstall an MCP server')
  .action(async (name: string) => {
    try {
      await installer.uninstallServer(name);
      console.log(`Successfully uninstalled ${name} MCP server`);
    } catch (error) {
      console.error('Error uninstalling server:', error);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List installed MCP servers')
  .action(async () => {
    try {
      const servers = await installer.listServers();
      if (servers.length === 0) {
        console.log('No MCP servers installed');
      } else {
        console.log('Installed MCP servers:');
        servers.forEach(server => console.log(`- ${server}`));
      }
    } catch (error) {
      console.error('Error listing servers:', error);
      process.exit(1);
    }
  });

program
  .command('validate')
  .description('Validate MCP server configuration')
  .action(async () => {
    try {
      const isValid = await installer.validateConfig();
      if (isValid) {
        console.log('Configuration is valid');
      } else {
        console.error('Configuration is invalid');
        process.exit(1);
      }
    } catch (error) {
      console.error('Error validating configuration:', error);
      process.exit(1);
    }
  });

program.parse(process.argv);