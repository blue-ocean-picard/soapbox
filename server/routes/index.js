const router = require('express').Router();
const axios = require('axios');
// Pass ensureAuthenticated as a second parameter in routing to authenticate
const { ensureAuthenticated } = require('../../config/auth');



module.exports = router;