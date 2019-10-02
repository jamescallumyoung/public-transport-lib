'use strict';

/**
 * @interface TimetablePort
 */
module.exports = class TimetablePort {

    /**
     * Get the stations upcoming arrivals.
     * @param station {Station} the station to get the timetable for
     * @param limit {Number} how many result to get; defaults to 10
     * @returns {Promise<Array<Arrival>>}
     */
    async getStationArrivals(station, limit = 10) { throw new Error("Unimplemented [TimetablePort]"); }

    /**
     * Get the stations upcoming departures.
     * @param station {Station} the station to get the timetable for
     * @param limit {Number} how many result to get; defaults to 10
     * @returns {Promise<Array<Departure>>}
     */
    async getStationDepartures(station, limit = 10) { throw new Error("Unimplemented [TimetablePort]"); }

    /**
     * Get connections between two stations.
     * The given stations do not have to been the terminus, but they must both be list on the stop list.
     * @param from {Station}
     * @param to {Station}
     * @param limit {Number}
     * @returns {Promise<Array<Departure>>}
     */
    async getConnections(from, to, limit = 10) { throw new Error("Unimplemented [TimetablePort]"); }
};
