const router = require('express').Router();
const validate = require('express-validation');
const userService = require('../../services/user.service');
const authService = require('../../services/auth.service')
const APIError = require('../../errors/api-error');
const {
    login
} = require('../../validations/auth.validation');

router.route('/login')
.post(validate(login),async(req,res,next)=>{
    try{
        const data = req.body;

       
        //GET USER DATA
        const getUser = await userService.getUsers({
            filters: {
                email: data.email
            }
        })

        //AUTHENTICATE USER AND GENERATE TOKEN
        const auth = await authService.authenticate({
            user_id:getUser[0].id,
            email:data.email,
            password:data.password,
            hashPassword:getUser[0].password
        })


        return res.status(200).json({
            data:{
                user_id:getUser[0].user_id,
                ...auth
            }
        })

    }
    catch(e){
        next(e)
    }
})

router.route('/refresh').post()

module.exports = router;