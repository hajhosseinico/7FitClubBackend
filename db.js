const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'mariadb_new',
    user: 'root',
    password: 'my_password',
    database: '7FitClubDB'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

module.exports = connection;
