const express = require('express');


const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

router.use('/auth',require('./auth.route'))
router.use('/user',require('./user.route'))

module.exports = router;