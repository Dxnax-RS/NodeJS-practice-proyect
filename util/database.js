const Sequelize = require("sequelize");

const sequelize = new Sequelize('node-complete', 'root', '', {
    dialect: 'mariadb', 
    host: 'localhost'
});

module.exports = sequelize;