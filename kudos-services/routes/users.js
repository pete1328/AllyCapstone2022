const express = require('express');
const router= express.Router();
const db = require('../util/database');
const User = require('../models/user');
const Sequelize = require('sequelize');
const controllers = require('../controllers');

router.get('/', (req, res) => ('This is root!'))
router.post('/user/create', controllers.createUser)

module.exports = router;