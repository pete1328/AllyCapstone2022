const User = require('../models/user');
const Appreciation = require('../models/appreciation')
const { Op } = require("sequelize");
const sequelize = require('../util/database');

/* Returns all of the current users that have created an account
    Used for pop-up option when choosing who to send Kudos to
 */
const allUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["user_id", "first_name", "last_name"],
            where: {
                user_id: {
                    [Op.not]: req.query.user_id
                  }
            }
        });
        return res.status(201).json({
            users,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

/* Returns all of the managers/admins registed on the web-app
    Used for pop-up option when creating account for "Reports To"
*/
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

/* GET Request returns total amount of appreciations sent/received by all users
    Used for dashboard statistics "Total Letters Sent Across Ally" */
const allAppreciations = async (req, res) => {
    try {
        const kudos = await Appreciation.findAll();
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
        const [result, metadata] = await sequelize.query(`UPDATE Users SET received = received + ${req.body.received.toString()} WHERE user_id = ${req.body.user_id.toString()}`);
        return res.status(201).json();
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}
/* POST Request to add appreciation to database table
    When user clicks next button in KudosResult page */
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

/* GET Request for sent appreciations that returns them in order of most recent
    Used for history shown on dashboard */
const latestSentAppreciations = async (req, res) => {
    try {
        const appreciations = await Appreciation.findAll({
            where: {
                user_id : req.query.user_id
            },
            order: [
                ["createdAt", "DESC"]
            ]
        });
        return res.status(201).json({
            appreciations,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

/* GET Request for received appreciations that returns them in recent order
    Used for history shown on dashboard */
const latestReceivedAppreciations = async (req, res) => {
    try {
        const appreciations = await Appreciation.findAll({
            where: {
                user_receive_id : req.query.user_id
            },
            order: [
                ["createdAt", "DESC"]
            ]
        });
        return res.status(201).json({
            appreciations,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

const monthlySentKudos = async (req, res) => {
    try {
        const kudos = await Appreciation.findAll({
            attributes: ["kudos_points", "createdAt"],
            where: {
                user_id : req.query.user_id
            }
        });
        return res.status(201).json({
            kudos,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

const monthlyReceivedKudos = async (req, res) => {
    try {
        const kudos = await Appreciation.findAll({
            attributes: ["kudos_points", "createdAt"],
            where: {
                user_receive_id : req.query.user_id
            }
        });
        return res.status(201).json({
            kudos,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

module.exports = {
    createUser, 
    validateUser, 
    addAppreciation,
    latestSentAppreciations,
    latestReceivedAppreciations,
    monthlyReceivedKudos,
    monthlySentKudos,
    allAppreciations,
    incrementSent,
    incrementReceived,
    allManagers,
    allUsers,
    allKudos,
}
