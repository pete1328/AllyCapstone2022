const express = require('express');
const router= express.Router();
const db = require('../util/database');
const User = require('../models/user');
const Sequelize = require('sequelize');
const { createUser, validateUser, allManagers, allUsers, allKudos }  = require("../controllers/index");

router.get('/', (req, res) => ('This is root!'))
router.post('/user/create', createUser)
router.get('/user/validate', validateUser)
router.get('/allManagers', allManagers)
router.get('/allUsers', allUsers)
router.get('/allKudos', allKudos)

module.exports = router;