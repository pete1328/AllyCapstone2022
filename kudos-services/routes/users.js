const express = require('express');
const router= express.Router();
const db = require('../util/database');
const User = require('../models/user');
const Sequelize = require('sequelize');
const { createUser, validateUser, allManagers, allUsers, allKudos, findEmail, findFirstName, updateSent, updateReceived, totalUsers, userCount, d3Nodes, userNameIDs, userIDs }  = require("../controllers/index");

router.get('/', (req, res) => ('This is root!'))
router.post('/user/create', createUser) // post request to add new user to database table
router.get('/user/validate', validateUser) // get request to check user credentials during login
router.get('/user/email', findEmail)
router.get('/user/firstName', findFirstName)
router.get('/allManagers', allManagers) // get request for create account pop-up 
router.get('/allUsers', allUsers) // get request for sending kudos pop-up
router.get('/allKudos', allKudos) // get request for ...? 10/25 Abby
router.get('/user/sent', updateSent)
router.get('/user/received', updateReceived)
router.get('/totalUsers', totalUsers) // get request to get all users
router.get('/users/count', userCount)
router.get('/user/d3Nodes', d3Nodes) // get request for user names dictionary for nodes of graph
router.get('/user/nodeText', userNameIDs) //GETs all of the userIDS and correlating userFirstNames from table
router.get('/user/nodeIds', userIDs) //GETs all of the userIDS from table for radius calculation

module.exports = router;