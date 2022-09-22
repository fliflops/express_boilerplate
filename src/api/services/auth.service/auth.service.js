const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken')

const APIError = require('../../errors/api-error');
const {jwtSecret,jwtExpirationInterval,env, jwtRefreshSecret, jwtRefreshExpiration} = require('../../../config/vars')


const comparePassword = async ({
    hashPassword,
    password
}) => {
    try{
        return bcrypt.compare(password,hashPassword)
    }  
    catch(e){
        throw e
    }
}

exports.authenticate = async({
    user_id,
    email,
    password,
    hashPassword
}) => {
    try{
        const err = {
            status: httpStatus.UNAUTHORIZED,
            isPublic: true
        };

        const isPasswordMatch = await comparePassword({
            hashPassword,
            password
        })

        if(!isPasswordMatch){
            err.message = 'Incorrect email or password'
            throw new APIError(err)
        }
        
        const token = jwt.sign({email,user_id},jwtSecret,{expiresIn:jwtExpirationInterval})
        const refreshToken = jwt.sign({email},jwtRefreshSecret,{expiresIn:jwtRefreshExpiration})

        return {
            token:token,
            refreshToken:refreshToken,
            email,
            expiresIn:jwtExpirationInterval
        }
    }
    catch(e){
        throw e
    }
}