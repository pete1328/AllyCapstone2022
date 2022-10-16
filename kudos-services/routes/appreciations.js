const express = require('express');
const router= express.Router();
const db = require('../util/database');
const Appreciation = require('../models/appreciation');
const Sequelize = require('sequelize');
const { addAppreciation, latestSentAppreciations, latestReceivedAppreciations } = require("../controllers/index");

router.get('/', (req, res) => ('This is root!'))
router.post('/appreciation/add', addAppreciation)
router.get('/appreciations/sent', latestSentAppreciations)
router.get('/appreciations/received', latestReceivedAppreciations)

module.exports = router;