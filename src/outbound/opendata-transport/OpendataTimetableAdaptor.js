'use strict';

const rp = require('request-promise');

const TimetablePort = require('../../core/outbound-ports/TimetablePort');
const ArrivalDto = require('./dtos/ArrivalDto');
const DepartureDto = require('./dtos/DepartureDto');

/**
 * @class OpendataTimetableAdaptor
 * @implements TimetablePort
 */
module.exports = class OpendataTimetableAdaptor extends TimetablePort {

    // N.B. The OpenData API isn't great so we have to do some extra work to get exactly what we want

    /**
     * @see TimetablePort.getStationArrivals
     * @returns {Array<Arrival>}
     */
    async getStationArrivals(station, limit = 10) {

        const requestOptions = {
            uri: 'http://transport.opendata.ch/v1/stationboard',
            qs: {
                'limit': limit,
                'type': 'arrival',
                'id': station.getId()
            },
            json: true
        };

        return rp(requestOptions)
            .then( response => ( response.stationboard || [] ) )
            .then( stationboard => stationboard.map( entry => ArrivalDto.fromJson(entry) )
                .map( dto => dto.toEntity() ) );
    }

    /**
     * @see TimetablePort.getStationDepartures
     * @returns {Array<Departure>}
     */
    async getStationDepartures(station, limit = 10) {

        const requestOptions = {
            uri: 'http://transport.opendata.ch/v1/stationboard',
            qs: {
                'limit': limit,
                'type': 'departure',
                'id': station.getId()
            },
            json: true
        };

        return rp(requestOptions)
            .then( response => ( response.stationboard || [] ) )
            .then( stationboard => stationboard.map( entry => DepartureDto.fromJson(entry) )
                .map( dto => dto.toEntity() ) );
    }

    /**
     * @see TimetablePort.getConnections
     * @returns {Promise<Array<Departure>>}
     */
    async getConnections(from, to, limit = 10) {

        const requestOptions = {
            uri: 'http://transport.opendata.ch/v1/connections',
            qs: {
                'limit': limit,
                'from': from.getId(),
                'to': to.getId(),
                'direct': true
            },
            json: true
        };

        return rp(requestOptions)
            .then( response => ( response.connections || [] ) )
            .then( connections => connections.map( entry => DepartureDto.fromConnectionJson(entry) )
                .map( dto => dto.toEntity() ) );
    }
};
