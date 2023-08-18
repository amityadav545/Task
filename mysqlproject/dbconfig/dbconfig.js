// const { createPool } = require("mysql")
// const pool = createPool({
//     port: process.env.DB_PORT,
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     connectionLimit: process.env.CONNECTIONLIMIT

// })
// module.exports = pool;

const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",   
    password: "",   
    database: "Testing",   
});

module.exports = pool;
