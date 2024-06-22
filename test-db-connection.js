const mysql = require('mysql');
require('dotenv').config(); // Load environment variables

const connectionConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const connection = mysql.createConnection(connectionConfig);

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
    connection.end();
});

