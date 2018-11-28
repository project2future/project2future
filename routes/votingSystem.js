var express = require('express');
var router = express.Router();

//Require our controllers.
var votingUsers = require('../models/votingUsers'); 
var adminUsers = require('../models/adminUsers'); 
var login = require('../models/login'); 

//Login fucntions
router.get('/', login.index);  
router.post('/home', login.login);
router.get('/logout', login.logout);

// votes functions
router.post('/vote', votingUsers.vote);

//admins functions
router.get('/newUser', adminUsers.newUser);
router.post('/createUser', adminUsers.createUser);


module.exports = router;
