// make bluebird default Promise
Promise = require('bluebird');
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const dbConnect = require('./config/sequelize');

//connect to existing databases
dbConnect();


// listen to requests
app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

/**
* Exports express
* @public
*/
module.exports = app;
