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
        .name('transporter departures')
        .usage('[options] <query>')
        .arguments('<query>')
        .option('--json', 'output results as JSON', )
        .option('-q, --quiet', 'quiet; only output results', )
        .parse(process.argv);

    const query = get( program, 'args.0', null );

    const log = logFn(program);
    const logFound = logFoundFn(log);

    if (query === null) {
        log(`❌  No station name given.`);
        process.exit(1);
    }

    log(`🔍 Searching for Departures from Station ${JSON.stringify(query)}`);

    const stationPort = new OpendataStationAdaptor();
    const timetablePort = new OpendataTimetableAdaptor();

    return stationPort.searchForStations(query)
        .then( logFound )
        .then( selectStation )
        .then( station => timetablePort.getStationDepartures(station, program.limit) )
        .then( logFound )
        .then( departures => (program.json)
            ? JSON.stringify(departures, null, 3)
            : departures.map( departure => departure.toString() ).join('\n') )
        .then(console.log);

})();
