const dataLayer = require('./user.datalayer');
const APIError = require('../../errors/api-error');
const httpStatus = require('http-status');

exports.getUsers = async({filters}) => {
    try{

        const users =  await dataLayer.getAllUser({
            filters
        })

        if(users.length === 0){
            throw new APIError({
                message:'User does not exists!',
                status:httpStatus.NOT_FOUND
            })
        }

        return users
    }
    catch(e){
        throw e
    }
}

exports.getByID = async(id)=>{
    try{
        const data = await dataLayer.getByID(id)
       
        if(!data){
            return null
        }

        return JSON.parse(JSON.stringify(data))
    }
    catch(e){
        throw e
    }
}