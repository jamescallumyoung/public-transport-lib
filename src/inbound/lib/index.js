'use strict';

const stationPort = require('../../outbound/opendata-transport/OpendataStationAdaptor');
const timetablePort = require('../../outbound/opendata-transport/OpendataTimetableAdaptor');

module.exports = class PublicTransportLib {

    constructor() {
        this.stationPort = new stationPort();
        this.timetablePort = new timetablePort();
    }

    /**
     * Search for a list of Stations where the name/ID matches the querystring
     * @param query {String}
     * @returns {Promise<Array<Station>>}
     */
    async searchForStation(query) {
        return this.stationPort.searchForStations(query);
    }

    /**
     * Get the next departures from the given Station.
     * @param station {Station}
     * @param limit {Number}
     * @returns {Promise<Array<Departure>>}
     */
    async getDepartures(station, limit) {
        return this.timetablePort.getStationDepartures(station, limit);
    }
};
