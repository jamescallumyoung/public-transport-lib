'use strict';

const logFn = require('../tools/log');
const logFoundFn = require('../tools/log-found');
const OpendataStationAdaptor = require('../../../outbound/opendata-transport/OpendataStationAdaptor');

module.exports = program => query => {

    const log = logFn(program);
    const logFound = logFoundFn(log);

    log(`🔍 Searching for a station with name ${JSON.stringify(query)}`);

    const stationPort = new OpendataStationAdaptor();

    return stationPort.searchForStations(query)
        .then( logFound )
        .then( stations => {
            log( (program.json)
                ? JSON.stringify(stations, null, 3)
                : stations.map( station => station.toString() ).join('\n') );
            return stations;
        } );
};
