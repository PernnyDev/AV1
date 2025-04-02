const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'servermysqlcn1.mysql.database.azure.com',
    user: 'userdb',
    password: 'admin@123',
    database: 'viniciusribeiro',
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = db;