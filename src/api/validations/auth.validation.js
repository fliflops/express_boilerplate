const Joi = require('joi');

module.exports = {
    //POST /v1/auth/login
    login : {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required().max(128)
        }
    }
}