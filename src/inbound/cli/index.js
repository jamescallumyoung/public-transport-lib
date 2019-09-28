#!/usr/bin/env node
'use strict';

const commander = require('commander');

const findStationFn = require('./commands/find-station');
const getDeparturesFromFn = require('./commands/get-departures-from');
const logFn = require('./tools/log');
const promptForStation = require('./tools/prompt-for-correct-station');

(async function cli() {

    const program = new commander.Command();

    program.option('--find-station <query>', 'search for a station by name or ID')
        .option('--get-departures', 'get the upcoming departures for the searched station')
        .option('--json', 'response should be formatted as JSON')
        .option('-l, --limit <number>', 'limit the number of departures/arrivals to show')
        .option('-j, --use-first-match', 'do not prompt which station to use, just use the first one')
        .option('-q, --quiet', 'only output the response and any required prompts')
        .parse(process.argv);

    const findStation = findStationFn(program);
    const getDeparturesFrom = getDeparturesFromFn(program);
    const log = logFn(program);

    let stations;

    if (program.findStation)
        stations = await findStation(program.findStation);

    if (program.getDepartures && stations.length === 0)
        log('👎 Cannot search for departures since no stations were found ');

    else if (program.getDepartures && (stations.length === 1 || program.useFirstMatch))
        getDeparturesFrom(stations[0], program.limit);

    else if (program.getDepartures && stations.length > 1)
        promptForStation(stations).then(station => getDeparturesFrom(station, program.limit));

})();
