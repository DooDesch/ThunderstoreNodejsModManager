const { program } = require('commander');

require('dotenv').config();

const PackageUpdater = require('./thunderstore/PackageUpdater');
const packageUpdater = new PackageUpdater(); // Update thunderstorePackage.json

program.version('1.0.0');

program
    .command('install [package]')
    .description('Install a package by name')
    .action(async (packageName) => {
        await packageUpdater.isDone();

        const ThunderstorePackageHandler = require('./classes/ThunderstorePackageHandler');
        const thunderstorePackageHandler = new ThunderstorePackageHandler();

        if (packageName) await thunderstorePackageHandler.installPackageByName(packageName);
        else await thunderstorePackageHandler.updateInstalledPackages();

        const totalInstalledMods = Object.keys(thunderstorePackageHandler.thunderstorePackage.getInstalledPackages()).length
        console.log('-------------------------')
        console.log(`Total installed packages: ${totalInstalledMods}`)
    });

program
    .command('update [package]')
    .description('Update all installed packages or a specific package')
    .action(async (packageName) => {
        await packageUpdater.isDone();

        const ThunderstorePackageHandler = require('./classes/ThunderstorePackageHandler');
        const thunderstorePackageHandler = new ThunderstorePackageHandler();

        if (packageName) await thunderstorePackageHandler.installPackageByName(packageName);
        else await thunderstorePackageHandler.updateInstalledPackages();
    });

program
    .command('remove <package>')
    .description('Remove a package by name')
    .action(async (packageName) => {
        await packageUpdater.isDone();

        const ThunderstorePackageHandler = require('./classes/ThunderstorePackageHandler');
        const thunderstorePackageHandler = new ThunderstorePackageHandler();

        thunderstorePackageHandler.removePackageByName(packageName);
    });

program.parse(process.argv);