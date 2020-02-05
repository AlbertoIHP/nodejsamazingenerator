import dotenv from 'dotenv-safe'
dotenv.config()

module.exports = {
  development: {
    database: process.env.DB_NAME_DEV,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  },

  test: {
    database: process.env.DB_NAME_TEST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  },
  production: {
    database: process.env.POSTGRES_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
}
