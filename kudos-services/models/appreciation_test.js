const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const User = require("./user_test");

const TestAppreciation = sequelize.define("TestAppreciations", {
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
    message: {
        type: Sequelize.STRING,
        allowNull: true
    },
});

TestAppreciation.sync({ force: true });

module.exports = TestAppreciation;