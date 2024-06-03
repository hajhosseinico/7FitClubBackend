const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'mariadb_new',
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
