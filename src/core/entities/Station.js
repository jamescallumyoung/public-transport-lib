'use strict';

module.exports = class Station {

    constructor(id, name) {
        this.id = id || null;
        this.name = name || '';
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    toString() {
        return `${this.getName()} [${this.getId()}]`
    }
};
