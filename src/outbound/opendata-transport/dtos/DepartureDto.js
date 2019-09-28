'use strict';

const { get, last } = require('lodash');

const StationDto = require('./StationDto');
const Departure = require('../../../core/entities/Departure');

module.exports = class DepartureDto {

    static fromJson(json) {
        const currentStation = StationDto.fromJson(get(json, 'stop.station'));
        const destination = StationDto.fromJson(last(get(json, 'passList', [])).station);
        const departureTime = get(json, 'stop.departureTimestamp');
        const destinationArrivalTime = last(get(json, 'passList', [])).arrivalTimestamp;

        return new DepartureDto(currentStation, destination, departureTime, destinationArrivalTime);
    }

    /**
     * @param currentStation {StationDto}
     * @param destination {StationDto}
     * @param departureTime {Number}
     * @param destinationArrivalTime {Number}
     */
    constructor(currentStation, destination, departureTime, destinationArrivalTime) {
        this.currentStation = currentStation;
        this.destination = destination;
        this.departureTime = departureTime;
        this.destinationArrivalTime = destinationArrivalTime;
    }

    toEntity() {
        return new Departure(
            this.currentStation.toStation(),
            this.departureTime,
            this.destination.toStation(),
            this.destinationArrivalTime
        );
    }
};
