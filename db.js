const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'mariadb_new',
  user: 'root',
  password: 'my_password',
  database: '7FitClubDB',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    throw err;
  }
  console.log('Connected to the database');
});

module.exports = db;
