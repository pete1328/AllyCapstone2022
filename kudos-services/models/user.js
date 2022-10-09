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
        allowNull: true
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    position: {
        type: Sequelize.STRING,
        allowNull: true
    },
    reports_to: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    balance: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
},
{timestamps: false}
);

module.exports = User;

