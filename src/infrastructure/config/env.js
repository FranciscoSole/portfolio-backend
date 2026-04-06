const dotenv = require('dotenv');

// Load variables from a .env file into process.env
dotenv.config();

/**
 * Helper to retrieve required environment variables. Throws an error if
 * a variable is missing so that configuration issues surface early.
 *
 * @param {string} name
 */
function getRequired(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

module.exports = {
  env: {
    port: Number(process.env.PORT),
    dbHost: getRequired('DB_HOST'),
    dbPort: Number(process.env.DB_PORT),
    dbUser: getRequired('DB_USER'),
    dbPassword: getRequired('DB_PASSWORD'),
    dbName: getRequired('DB_NAME'),
    dbConnectionLimit: Number(process.env.DB_CONNECTION_LIMIT),
    dbQueueLimit: Number(process.env.DB_QUEUE_LIMIT),
    dbWaitForConnections: Boolean(process.env.DB_WAIT_FOR_CONNECTIONS)
  }
};