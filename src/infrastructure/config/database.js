const mysql = require('mysql2/promise');
const { env } = require('./env');

// Create a MySQL connection pool using environment variables. The pool
// configuration mirrors the original implementation.
const dbPool = mysql.createPool({
  host: env.dbHost,
  port: env.dbPort,
  user: env.dbUser,
  password: env.dbPassword,
  database: env.dbName,
  connectionLimit: env.dbConnectionLimit,
  namedPlaceholders: false,
  queueLimit: env.dbQueueLimit,
  waitForConnections: env.dbWaitForConnections,
  enableKeepAlive: true
});

module.exports = { dbPool };