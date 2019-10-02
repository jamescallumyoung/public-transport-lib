#!/usr/bin/env node
'use strict';

const commander = require('commander');

const findStationFn = require('./commands/find-station');
const getDeparturesFromFn = require('./commands/get-departures-from');
const getConnectionsFn = require('./commands/get-connections');
const logFn = require('./tools/log');
const promptForStation = require('./tools/prompt-for-correct-station');

(async function cli() {

    const program = new commander.Command();

    program.option('--find-station <query>', 'search for a station by name or ID')
        .option('--get-departures', 'get the upcoming departures for the searched station')
        .option('--get-connections <query>', 'get the upcoming connections from the first station to the second')
        .option('--json', 'response should be formatted as JSON')
        .option('-l, --limit <number>', 'limit the number of departures/arrivals to show')
        .option('-j, --use-first-match', 'do not prompt which station to use, just use the first one')
        .option('-q, --quiet', 'only output the response and any required prompts')
        .parse(process.argv);

    const findStation = findStationFn(program);
    const getDeparturesFrom = getDeparturesFromFn(program);
    const getConnections = getConnectionsFn(program);
    const log = logFn(program);

    let stations;
    let toStations;

    // --find-station <query>
    if (program.findStation)
        stations = await findStation(program.findStation);

    // ... --get-connections <query>
    if (program.getConnections)
        toStations = await findStation(program.getConnections);

    // --find-station <query> --get-departures
    if (program.getDepartures && stations.length === 0)
        log(`👎 Cannot search for departures since no stations were found for ${JSON.stringify(program.findStation)}`);

    // --find-station <query> --get-departures
    else if (program.getDepartures && (stations.length === 1 || program.useFirstMatch))
        getDeparturesFrom(stations[0], program.limit);

    // --find-station <query> --get-departures
    else if (program.getDepartures && stations.length > 1)
        promptForStation(stations).then(station => getDeparturesFrom(station, program.limit));

    // --find-station <query> --get-connections <query>
    else if (program.getConnections && stations.length === 0)
        log(`👎 Cannot search for departures since no stations were found for ${JSON.stringify(program.findStation)}`);

    // --find-station <query> --get-connections <query>
    else if (program.getConnections && ((stations.length === 1 && toStations.length === 1) || program.useFirstMatch))
        getConnections(stations[0], toStations[0], program.limit);

    // --find-station <query> --get-connections <query>
    else if (program.getConnections && (stations.length > 1 || toStations.length > 1)) {

        const from = await promptForStation(stations);
        const to = await promptForStation(toStations);

        getConnections(from, to, program.limit);
    }
})();
