const router = require('express').Router();
const validate = require('express-validation');
const {authorize} = require('../../middlewares/auth');

router.route('/')
.get(authorize(),async(req,res)=> {
    try{
        res.status(200).json({
            ...req.user
        })
    }
    catch(e){
        throw e
    }
})


module.exports = router;