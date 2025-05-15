const mysql = require('mysql2')
require('dotenv').config()

const {HOST,USER,PASSWORD,DB_NAME}=process.env

const db = mysql.createConnection({
    host:HOST,
    user:USER,
    password:PASSWORD,
    database:DB_NAME
})

db.connect(err=>{
    if (err) {
        console.error('fail to connect to db',err);
    }
    else{
        console.log('Db connected successfully !');
        
    }
})
module.exports = db