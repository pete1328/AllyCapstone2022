const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Appreciation = sequelize.define("Appreciation", {
    appreciation_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_receive_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    kudos_points: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    message: {
        type: Sequelize.STRING,
        allowNull: true
    },
});

module.exports = Appreciation;