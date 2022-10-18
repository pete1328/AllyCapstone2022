const express = require('express');
const router= express.Router();
const db = require('../util/database');
const Appreciation = require('../models/appreciation');
const Sequelize = require('sequelize');
const { addAppreciation, latestSentAppreciations, latestReceivedAppreciations } = require("../controllers/index");

router.get('/', (req, res) => ('This is root!'))
router.post('/appreciation/add', addAppreciation) //POST request to store sent appreciation in db when user sends message
router.get('/appreciations/sent', latestSentAppreciations) //GET request to retrieve all of a users sent appreciations from db
router.get('/appreciations/received', latestReceivedAppreciations) //GET request to retrieve all of a users recieved appreciations

module.exports = router;