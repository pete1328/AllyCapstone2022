const config = require('../EC2-config.json');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.dbname, config.user, config.password, {
    host: config.host,
    port: 3306,
    maxConcurrentQueries: 100,
    dialect: 'mysql',
    dialectOptions: {
        ssl:'Amazon RDS'
    },
    pool: { maxConnections: 5, maxIdleTime: 30},
    language: 'en'
})

module.exports = sequelize;





