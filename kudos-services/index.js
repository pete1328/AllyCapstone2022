const sequelize = require("./util/database")

const User = require("./models/user");
const Appreciation = require("./models/appreciation");

sequelize.sync().then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
});