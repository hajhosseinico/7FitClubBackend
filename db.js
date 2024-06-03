const mysql = require('mysql');

const db = mysql.createConnection({
    host: '172.18.0.2',
    user: 'root',
    password: 'your_password',
    database: '7FitClubDB'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

module.exports = db;
