const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '../../.env'),
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',

    emailConfig: {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      username: process.env.EMAIL_USERNAME,
      password: process.env.EMAIL_PASSWORD,
    },
    redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_URL,
      expire: process.env.REDIS_SESSION_EXPIRE
    },
    rataDb:{
      host:process.env.RATA_HOST,
      username:process.env.RATA_USER,
      password:process.env.RATA_PASSWORD,
      database:process.env.RATA_DB,
      dialect:'mysql',
      logging: process.env.NODE_ENV !== 'production' ? true : false,
      pool:{
        max: 10,
        min: 1,
        idle: 2000000,
        acquire: 2000000
      },
        dialectOptions: {
        //useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true
      },
      timezone: '+08:00' /**for writing to database**/
    }
};