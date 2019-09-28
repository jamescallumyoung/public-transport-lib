'use strict';

const Event = require('./Event');
const Arrival = require('./Arrival');
const Moment  = require('moment');

/**
 * A Departure event.
 * e.g. A Train leaving the Station
 * @class
 * @extends {Event}
 */
module.exports = class Departure extends Event {

    getCurrentStation() {
        return this.departureStation;
    }

    getDepartureTime() {
        return this.departureTimestamp;
    }

    getArrival() {
        return new Arrival(this.departureStation, this.departureTimestamp, this.arrivalStation, this.arrivalTimestamp);
    }

    toString() {
        const arrival = this.getArrival();
        const formattedDeparttureTime = Moment.unix(this.getDepartureTime()).utcOffset(120).format("HH:mm");
        const formattedArrivalTime = Moment.unix(arrival.getArrivalTime()).utcOffset(120).format("HH:mm");

        return `${this.getCurrentStation().getName()} @ ${formattedDeparttureTime} ► ` +
            `${arrival.getCurrentStation().getName()} @ ${formattedArrivalTime}`;
    }
};
