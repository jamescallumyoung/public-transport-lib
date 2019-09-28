'use strict';

const Station = require('../../../core/entities/Station');

module.exports = class StationDto {

    static fromJson(json) {
        return new StationDto(json.id, json.name);
    }

    constructor(id, name) {
        this.__id = id; // The id of the location
        this.__name = name; // The location name
    }

    getId() {
        return this.__id;
    }

    getName() {
        return this.__name;
    }

    toStation() {
        return new Station(this.__id, this.__name);
    }
};
