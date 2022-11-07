const express = require('express');
const router= express.Router();
const db = require('../util/database');
const User = require('../models/user');
const Sequelize = require('sequelize');
const { createUser, validateUser, allManagers, allUsers, allKudos, incrementSent, incrementReceived, findEmail, findFirstName }  = require("../controllers/index");

router.get('/', (req, res) => ('This is root!'))
router.post('/user/create', createUser) // post request to add new user to database table
router.get('/user/validate', validateUser) // get request to check user credentials during login
router.get('/user/email', findEmail)
router.get('/user/firstName', findFirstName)
router.put('/user/incrementSent', incrementSent) // put request to update user's sent appreciations ctr
router.put('/user/incrementReceived', incrementReceived) // put request to update user's received appreciations ctr
router.get('/allManagers', allManagers) // get request for create account pop-up 
router.get('/allUsers', allUsers) // get request for sending kudos pop-up
router.get('/allKudos', allKudos) // get request for ...? 10/25 Abby

module.exports = router;