import { program } from 'commander';
import dotenv from 'dotenv';
import Action from './classes/Action.js';

dotenv.config();

const action = new Action();

program.version('1.0.0');

program
    .command('install [package]')
    .description('Install a package by name')
    .action(async (packageName) => {
        await action.installPackageByName(packageName);
    });

program
    .command('update [package]')
    .description('Update all installed packages or a specific package')
    .action(async (packageName) => {
        await action.updatePackageByName(packageName);
    });

program
    .command('remove <package>')
    .description('Remove a package by name')
    .action(async (packageName) => {
        await action.removePackageByName(packageName);
    });

program
    .command('create:manifest')
    .description('Create a manifest file for your mod or modpack using the dependencies in your thunderstorePackage.json')
    .action(async () => {
        await action.createManifest();
    });

program
    .command('update:manifest')
    .description('Update the dependencies in your manifest file using the dependencies in your thunderstorePackage.json')
    .action(async () => {
        await action.createManifest();
    });

program
    .command('create:modpack [updateManifest]')
    .description('Create a modpack using the dependencies in your thunderstorePackage.json')
    .action(async (updateManifest = 'true') => {
        await action.createModpack(updateManifest === 'true');
    });

program.parse(process.argv);
