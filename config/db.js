const mysql = require('mysql2')
require('dotenv').config()
const HOST = process.env.DB_HOST || 'sql5.freesqldatabase.com';
const USER = process.env.DB_USER || 'sql5779023';
const PASSWORD = process.env.DB_PASSWORD || '3wvCJhgIic';
const DB_NAME = process.env.DB_NAME || 'sql5779023';
const PORT = process.env.DB_PORT || 3306;

// Create connection
const db = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DB_NAME,
    port: PORT
});

db.connect(err=>{
    if (err) {
        console.error('fail to connect to db',err);
    }
    else{
        console.log('Db connected successfully !');
        
    }
})
module.exports = db