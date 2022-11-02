const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const User = require("./user");

const Appreciation = sequelize.define("Appreciations", {
    appreciation_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    user_receive_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    kudos_points: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    gif: {
        type: Sequelize.STRING,
        allowNull: true
    },
    font: {
        type: Sequelize.STRING,
        allowNull: true
    },
    message: {
        type: Sequelize.STRING,
        allowNull: true
    },
    approved: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

module.exports = Appreciation;