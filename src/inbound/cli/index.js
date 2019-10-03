#!/usr/bin/env node
'use strict';

const { promisify } = require('util');
const version = require('version');
const commander = require('commander');

const getVersion = promisify(version.fetch);

(async function cli() {

    const program = new commander.Command();

    program
        .version(await getVersion())
        .command(
            'find-station [options] <query>',
            'search for a station',
            { executableFile: __dirname+'/commands/find-station.js' } )
        .command(
            'departures [options] <query>',
            'get the upcoming departures for a station',
            { executableFile: __dirname+'/commands/departures.js' } )
        .command(
            'connections [options] <from> <to>',
            'get the upcoming connections between two stations',
            { executableFile: __dirname+'/commands/connections.js' } )
        .parse(process.argv);
})();
