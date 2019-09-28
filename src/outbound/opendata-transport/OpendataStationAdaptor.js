'use strict';

const rp = require('request-promise');

const StationPort = require('../../core/outbound-ports/StationPort');
const StationDto = require('./dtos/StationDto');

/**
 * An implementation of the StationPort using Opendata's transport API
 * @class {OpendataTransportStationAdaptor}
 * @implements {StationPort}
 */
module.exports = class OpendataTransportStationAdaptor extends StationPort {

    // N.B. The OpenData API isn't great so we have to do some extra work to get exactly what we want

    /**
     * Search for a station by either its name or its ID.
     * Returns a list of stations with matching names.
     * @param query {String} the name or the id of the station to search for
     * @returns {Promise<Array<Station>>}
     */
    async searchForStations(query) {
        const requestOptions = {
            uri: 'http://transport.opendata.ch/v1/locations',
            qs: {
                'query': query,
                'type': 'station'
            },
            json: true
        };

        return rp(requestOptions)
            .then( response => ( response.stations || [] )  )
            .then( locationsJson => locationsJson.filter( locationJson => locationJson.id ) )
                // filter out responses without an id; all Stations have an id
                // this fixes the 'type: station' param not always being honoured in the request
            .then( stationsJson => stationsJson.map( stationJson => StationDto.fromJson( stationJson ) )
                .map( dto => dto.toStation() ) );
    }
};
