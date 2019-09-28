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
};
