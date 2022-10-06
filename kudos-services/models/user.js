const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("User", {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    position: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reports_to: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    balance: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

module.exports = User;

