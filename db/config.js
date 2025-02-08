// db/config.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'm2.gym.db.exame',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || '1f18ac3cd637',
    database: process.env.DB_NAME || 'gym_schedule_exame',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;