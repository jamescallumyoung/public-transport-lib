'use strict';

const chai = require('chai');
chai.should();

const PublicTransportLib = require('../../src/inbound/lib/index');
const Station = require('../../src/core/entities/Station');

describe('PublicTransportLibrary', () => {

    // todo Nock the API

    describe('searchForStation', () => {

        it('search by name; returns an Array of Stations', async () => {

            // given
            const lib = new PublicTransportLib();
            const name = 'Waldburg';

            // when
            const r = await lib.searchForStation(name);

            // then
            r.should.have.be.an('array');
            r.should.have.length(2);

            r[0].should.have.property('id', '8503078');
            r[0].should.have.property('name', 'Waldburg');

            r[1].should.have.property('id', '8590879');
            r[1].should.have.property('name', 'Waldburg, Station');
        } );

        it('search by station ID; returns an Array of Stations', async () => {

            // given
            const lib = new PublicTransportLib();
            const id = '8503078';

            // when
            const r = await lib.searchForStation(id);

            // then
            r.should.have.be.an('array');
            r.should.have.length(1);

            r[0].should.have.property('id', '8503078');
            r[0].should.have.property('name', 'Waldburg');
        } );

        it('bad search query; returns an empty Array', async () => {

            // given
            const lib = new PublicTransportLib();
            const id = 'NOT_AN_ID_FOO_BING';

            // when
            const r = await lib.searchForStation(id);

            // then
            r.should.have.be.an('array');
            r.should.have.length(0);
        } );
    } );

    describe('getDepartures', () => {

        it('returns an empty Array, when the Station is invalid', async () => {

            const lib = new PublicTransportLib();
            const station = new Station('BAD_ID_BING_BONG', 'SOME_WHERE');

            const r = await lib.getDepartures(station);

            r.should.be.an('Array');
            r.should.have.length(0);
        } );

        it('returns an Array of Departures, when the Station is valid', async () => {

            const lib = new PublicTransportLib();
            const station = new Station('8503078', 'Waldburg');

            const r = await lib.getDepartures(station);

            r.should.be.an('Array');
            r.should.have.length(10);
        } );

        it('returns an Array of N length, when a limit of N is provided', async () => {

            const lib = new PublicTransportLib();
            const station = new Station('8503078', 'Waldburg');
            const length = 3;

            const r = await lib.getDepartures(station, length);

            r.should.be.an('Array');
            r.should.have.length(length);
        } );
    } );
} );
