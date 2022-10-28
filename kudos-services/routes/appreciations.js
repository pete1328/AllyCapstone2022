const express = require('express');
const router= express.Router();
const db = require('../util/database');
const Appreciation = require('../models/appreciation');
const Sequelize = require('sequelize');
const { addAppreciation, latestSentAppreciations, latestReceivedAppreciations, allAppreciations, monthlyReceivedKudos, monthlySentKudos} = require("../controllers/index");

router.get('/', (req, res) => ('This is root!'))
router.post('/appreciation/add', addAppreciation) //POST request to store sent appreciation in db when user sends message
router.get('/appreciations/sent', latestSentAppreciations) //GET request to retrieve all of a users sent appreciations from db
router.get('/appreciations/received', latestReceivedAppreciations) //GET request to retrieve all of a users recieved appreciations
router.get('/appreciations/all', allAppreciations) //GET request to get amount of all appreciations sent by Ally employees
router.get('/appreciations/monthlySent', monthlySentKudos)
router.get('/appreciations/monthlyReceived', monthlyReceivedKudos)

module.exports = router;