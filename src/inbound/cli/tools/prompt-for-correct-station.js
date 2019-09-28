const { AutoComplete } = require('enquirer');

module.exports = stations =>
    new AutoComplete({
        name: 'station',
        message: 'Select the Station',
        limit: 10,
        choices: stations.map( station => station.toString() )
    })
        .run()
        .then( answer => stations.filter( station => station.toString() === answer ) )
        .then( stations => stations[0] );
