/**
 * @abstract
 * @class Event
 */
module.exports = class Event {

    /**
     * @param departureStation {Station}
     * @param departureTimestamp {Number}
     * @param arrivalStation {Station}
     * @param arrivalTimestamp {Number}
     */
    constructor(departureStation, departureTimestamp, arrivalStation, arrivalTimestamp) {

        this.departureStation = departureStation;
        this.departureTimestamp = departureTimestamp;
        this.arrivalStation = arrivalStation;
        this.arrivalTimestamp = arrivalTimestamp;
    }
};
