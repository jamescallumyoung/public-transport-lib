'use strict';

const OpendataTimetableAdaptor = require('../../../outbound/opendata-transport/OpendataTimetableAdaptor');
const logFn = require('../tools/log');
const logFoundFn = require('../tools/log-found');

module.exports = program => (station, limit) => {

    const log = logFn(program);
    const logFound = logFoundFn(log);

    log(`🔍 Searching for Departures from Station ${JSON.stringify(station.toString())}`);

    const timetablePort = new OpendataTimetableAdaptor();

    return timetablePort.getStationDepartures(station, limit)
        .then( logFound )
        .then( departures => (program.json)
            ? JSON.stringify(departures, null, 3)
            : departures.map( departure => departure.toString() ).join('\n') )
        .then(console.log);
};
