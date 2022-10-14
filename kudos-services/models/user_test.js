const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const TestAppreciation = require("./appreciation_test");

const TestUser = sequelize.define("TestUser", {
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

//TestUser.hasMany(TestAppreciation, {foreignKey: 'associated_id'}); // A user has many appreciations which can be get
//TestAppreciation.belongsTo(TestUser, {foreignKey: 'associated_id'}); // Foreign key added to appreciations table

//TestUser.sync({ force: true });

module.exports = TestUser;

