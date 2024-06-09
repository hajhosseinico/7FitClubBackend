const mysql = require('mysql');

const connectionConfig = {
    host: 'mariadb_new',
    user: 'root',
    password: 'my_password',
    database: '7FitClubDB'
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
