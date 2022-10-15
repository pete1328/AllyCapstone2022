const User = require('../models/user');
const Appreciation = require('../models/appreciation')
const { Op } = require("sequelize");
const sequelize = require('../util/database');

const allUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["user_id", "first_name", "last_name"],
        });
        return res.status(201).json({
            users,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const allManagers = async (req, res) => {
    try {
        const managers = await User.findAll({
            attributes: ["user_id", "first_name", "last_name"],
            where: {
                [Op.or]: [{ position: "Admin" }, { position: "Manager" }],  
            }
        });
        return res.status(201).json({
            managers,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const allKudos = async (req, res) => {
    try {
        const kudos = await User.findAll({
            attributes: ["user_id", "sent", "received"],
        });
        return res.status(201).json({
            kudos,
        });
    } catch (error) {
        return res.status(500).json({ error : error.message })
    }
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const validateUser = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                username: req.query.username,
                password: req.query.password
            }
        });
        return res.status(201).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const addAppreciation = async (req, res) => {
    try {
        const appr = await Appreciation.create(req.body);
        return res.status(201).json({
            appr,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

const incrementSent = async (req, res) => {
    try {
        const [result, metadata] = await sequelize.query(`UPDATE Users SET sent = sent + ${req.body.sent.toString()} WHERE user_id = ${req.body.user_id.toString()}`);
        return res.status(201).json();
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

const incrementReceived = async (req, res) => {
    try {
        const [result, metadata] = await sequelize.query(`UPDATE Users SET sent = sent + ${req.body.received.toString()} WHERE user_id = ${req.body.user_id.toString()}`);
        return res.status(201).json();
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

module.exports = {
    createUser, 
    validateUser, 
    addAppreciation,
    incrementSent,
    incrementReceived,
    allManagers,
    allUsers,
    allKudos,
}
