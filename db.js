const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '172.18.0.2', // Use the IP address of the MariaDB container
  user: 'root',
  password: 'my_password',
  database: '7FitClubDB'
});

connection.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to the database');
});

module.exports = connection;
