const express = require('express');
const router= express.Router();
const db = require('../util/database');
const Appreciation = require('../models/appreciation');
const Sequelize = require('sequelize');
const controllers = require('../controllers');

router.get('/', (req, res) => ('This is root!'))
router.post('/appreciation/add', controllers.addAppreciation)

module.exports = router;