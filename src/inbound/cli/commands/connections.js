#!/usr/bin/env node
'use strict';

const commander = require('commander');
const { get } = require('lodash');

const OpendataTimetableAdaptor = require('../../../outbound/opendata-transport/OpendataTimetableAdaptor');
const OpendataStationAdaptor = require('../../../outbound/opendata-transport/OpendataStationAdaptor');

const logFn = require('../tools/log');
const logFoundFn = require('../tools/log-found');
const selectStation = require('../tools/prompt-for-correct-station');

(async function cli() {

    const program = new commander.Command();

    program
        .name('transporter connections')
        .usage('[options] <from> <to>')
        .arguments('<from> <to>')
        .option('--json', 'output results as JSON', )
        .option('-q, --quiet', 'quiet; only output results', )
        .parse(process.argv);

    const from = get( program, 'args.0', null );
    const to = get( program, 'args.1', null );

    const log = logFn(program);
    const logFound = logFoundFn(log);

    if (from === null) {
        log(`❌  No station given for <from>`);
        process.exit(1);
    }

    if (to === null) {
        log(`❌  No station given for <to>`);
        process.exit(1);
    }

    log(`🔍 Getting connections from ${JSON.stringify(from)} to ${JSON.stringify(to)}`);

    const stationPort = new OpendataStationAdaptor();
    const timetablePort = new OpendataTimetableAdaptor();

    const fromStation = await stationPort.searchForStations(from)
        .then( logFound )
        .then( selectStation );

    const toStation = await stationPort.searchForStations(to)
        .then( logFound )
        .then( selectStation );

    return timetablePort.getConnections(fromStation, toStation, program.limit)
        .then( logFound )
        .then( departures => (program.json)
            ? JSON.stringify(departures, null, 3)
            : departures.map( departure => departure.toString() ).join('\n') )
        .then(console.log);

})();
