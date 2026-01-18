require('dotenv').config(); // Adiciona suporte ao dotenv

module.exports = {
  "development": {
    "username": process.env.DB_USER || "postgres",
    "password": process.env.DB_PASSWORD || "docker",
    "database": process.env.DB_NAME || "minha_poc",
    "host": process.env.DB_HOST || "localhost",
    "port": process.env.DB_PORT || 5432,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USER_TEST || "root",
    "password": process.env.DB_PASSWORD_TEST || null,
    "database": process.env.DB_NAME_TEST || "database_test",
    "host": process.env.DB_HOST_TEST || "127.0.0.1",
    "port": process.env.DB_PORT_TEST || 5432,
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USER_PROD || "root",
    "password": process.env.DB_PASSWORD_PROD || null,
    "database": process.env.DB_NAME_PROD || "database_production",
    "host": process.env.DB_HOST_PROD || "127.0.0.1",
    "port": process.env.DB_PORT_PROD || 5432,
    "dialect": "postgres"
  }
}