const httpStatus = require('http-status');
const passport = require('passport');

const APIError = require('../errors/api-error');

const handleJWT = (req, res, next) => async(err, user, info) => {
    const error = err || info;
    const apiError = {
        message: error ? error.message : 'Unauthorized',
        status: httpStatus.UNAUTHORIZED,
        stack: error ? error.stack : undefined,
    };

    // 1. Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session.
    // 2. When the login operation completes, user will be assigned to req.user
    // 3. Note: passport.authenticate() middleware invokes req.login() automatically.
    
    const logIn = Promise.promisify(req.logIn);
    
    try {
        //console.log(error || !user)
        if (error || !user) throw error;
        await logIn(user, { session: false });
    } 
    catch (e) {
        return next(new APIError(apiError));
    }

    req.user = user;
    return next();
}

exports.authorize = () => (req, res, next) => passport.authenticate('jwt', { session: false },handleJWT(req, res, next))(req, res, next);
