const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const Appreciation = require("./appreciation");

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
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    position: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reports_to: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
},
{timestamps: false}
);

//User.hasMany(Appreciation, {foreignKey: 'associated_id'}); // A user has many appreciations which can be get
//Appreciation.belongsTo(User, {foreignKey: 'associated_id'}); // Foreign key added to appreciations table

module.exports = User;

