const Sequelize = require('sequelize');
const {rataModels} = require('../api/models');

/**
* Exports Databases 
* @public
*/
module.exports = async() => {
    await rataModels.sequelize.authenticate().then(() => {
        console.log(`Connected to ${rataModels.sequelize.getDatabaseName()}`)
    });
}
