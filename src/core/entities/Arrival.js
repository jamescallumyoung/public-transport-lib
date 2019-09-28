'use strict';

const Event = require('./Event');
const Departure = require('./Departure');

/**
 * An Arrival event.
 * e.g. A Train arriving at the Station
 * @class
 * @extends {Event}
 */
module.exports = class Arrival extends Event {

    getCurrentStation() {
        return this.arrivalStation;
    }

    getArrivalTime() {
        return this.arrivalTimestamp;
    }

    getDeparture() {
        return new Departure(this.departureStation, this.departureTimestamp, this.arrivalStation, this.arrivalTimestamp);
    }
};

