'use strict';

const logFn = require('../tools/log');
const logFoundFn = require('../tools/log-found');
const OpendataTimetableAdaptor = require('../../../outbound/opendata-transport/OpendataTimetableAdaptor');

module.exports = program => (from, to, limit) => {

    const log = logFn(program);
    const logFound = logFoundFn(log);

    log(`🔍 Getting connections from ${from.getName()} to ${to.getName()}`);

    const timetablePort = new OpendataTimetableAdaptor();

    return timetablePort.getConnections(from, to, limit)
        .then( logFound )
        .then( departures => (program.json)
            ? JSON.stringify(departures, null, 3)
            : departures.map( departure => departure.toString() ).join('\n') )
        .then(console.log);
};
