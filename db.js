const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'mariadb_new', // Make sure this matches the container name
  user: 'root',
  password: 'my_password', // Ensure this is correct
  database: '7FitClubDB'
});

connection.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to the database');
});

module.exports = connection;
