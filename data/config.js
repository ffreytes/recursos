const mysql = require("mysql")
// util sirve para hacer conexion 
const util = require("util")

//LLAMAMOS A LOS VALORES DE LA ENV
const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'rrhh'


    //host: process.env.db_host,
    //database: process.env.db_name,
    //user: process.env.db_user,
})

pool.getConnection((err) => {
    err ? console.warn("No conectado", { "error": err.message }) : console.log("Conexión con B.D. establecida...")
})

pool.query = util.promisify(pool.query)
module.exports = pool