const {Sequelize} = require("sequelize")

const connection = new Sequelize(process.env.MYSQL_URI)

connection.authenticate()

console.log("DB is working")

module.exports = connection