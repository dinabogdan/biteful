const Sequelize = require('sequelize');
const config = require('config');

var database = config.get('config.dbConfig');

console.log(database);
