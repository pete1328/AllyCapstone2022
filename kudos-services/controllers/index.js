const User = require('../models/user');
const Appreciation = require('../models/appreciation')

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
exports.createUser = createUser;
exports.addAppreciation = addAppreciation;