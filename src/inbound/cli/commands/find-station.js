#!/usr/bin/env node
'use strict';

const commander = require('commander');
const { get } = require('lodash');

const OpendataStationAdaptor = require('../../../outbound/opendata-transport/OpendataStationAdaptor');

const logFn = require('../tools/log');
const logFoundFn = require('../tools/log-found');

(async function cli() {

    const program = new commander.Command();

    program
        .name('transporter find-station')
        .usage('[options] <query>')
        .arguments('<query>')
        .option('-j, --json', 'output results as JSON', )
        // .option('-l, --limit <number>', 'limit the number of results to return', )
        .option('-q, --quiet', 'quiet; only output results', )
        .parse(process.argv);

    const query = get( program, 'args.0', null );

    const log = logFn(program);
    const logFound = logFoundFn(log);

    if (query === null) {
        log(`❌  No station name given.`);
        process.exit(1);
    }

    log(`🔍 Searching for a station with name ${JSON.stringify(query)}`);

    const stationPort = new OpendataStationAdaptor();

    return stationPort.searchForStations(query)
        // .then( stations => (program.limit) ? slice(stations, 0, program.limit+1) : stations )
        .then( logFound )
        .then( stations => {
            log( (program.json)
                ? JSON.stringify(stations, null, 3)
                : stations.map( station => station.toString() ).join('\n') );
            return stations;
        } );

})();
