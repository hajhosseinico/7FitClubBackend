const mysql = require('mysql');

const connectionConfig = {
    host: '7fitclub.com', // Update this to the correct hostname or IP address
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'my_password',
    database: process.env.DB_NAME || '7FitClubDB'
};

let connection;

function handleDisconnect() {
    connection = mysql.createConnection(connectionConfig);

    connection.connect(err => {
        if (err) {
            console.error('Error connecting to the database:', err);
            setTimeout(handleDisconnect, 2000); // Retry connection after 2 seconds
        } else {
            console.log('Connected to the database');
        }
    });

    connection.on('error', err => {
        console.error('Database connection error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET' || err.code === 'ENOTFOUND') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = connection;
