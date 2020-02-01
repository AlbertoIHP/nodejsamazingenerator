import path from 'path'
import merge from 'lodash/merge'

/**
 * Usefull function to get specific key from hash name of .env file :)
 * @param {*} name Name of the var in .env file
 */
export const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/**
 * dotenv allows developers use a .env file to save usefull environment variables
 * this by adding each one of this elements (or hash vals) to the process.env node global var
 * thats why it's called dotENV jeje (https://www.npmjs.com/package/dotenv)
 */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.config({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
}

/**
 * Usefull object with global configuration of the server
 */
const config = {
  /**
   * As on a webpack config should be, there is some common vars declared
   */
  all: {
    env: requireProcessEnv('SERVER_ENVIRONMENT') || 'development',
    root: path.join(__dirname, '..'),
    port: requireProcessEnv('SERVER_PORT') || 9000,
    ip: requireProcessEnv('SERVER_IP') || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    defaultEmail: requireProcessEnv('DEFAULT_EMAIL_ALIAS'),
    sendgridKey: requireProcessEnv('SENDGRID_KEY'),
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET')
  },
  /**
   * And other specific config to specific environments as Production, Development and Test
   */
  test: {

  },
  development: {
    mongo: {
      db_user: requireProcessEnv('DB_USER'),
      db_pass: requireProcessEnv('DB_PASSWORD'),
      db_host: requireProcessEnv('DB_HOST'),
      db_port: requireProcessEnv('DB_PORT'),
      db_name: requireProcessEnv('DB_NAME_DEV'),
      db_log: requireProcessEnv('DB_LOG'),
      uri: 'mongodb://' + requireProcessEnv('DB_USER') + ':' + requireProcessEnv('DB_PASSWORD') + '@' + requireProcessEnv('DB_HOST') + ':' + requireProcessEnv('DB_PORT') + '/' + requireProcessEnv('DB_NAME_DEV'),
      options: {
        debug: true
      }
    },
    postgresql: {
      db_user: requireProcessEnv('DB_USER'),
      db_pass: requireProcessEnv('DB_PASSWORD'),
      db_host: requireProcessEnv('DB_HOST'),
      db_port: requireProcessEnv('DB_PORT'),
      db_name: requireProcessEnv('DB_NAME_DEV'),
      db_log: requireProcessEnv('DB_LOG'),
      uri: 'postgres://' + requireProcessEnv('DB_USER') + ':' + requireProcessEnv('DB_PASSWORD') + '@' + requireProcessEnv('DB_HOST') + ':' + requireProcessEnv('DB_PORT') + '/' + requireProcessEnv('DB_NAME_DEV'),
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      db_user: requireProcessEnv('DB_USER'),
      db_pass: requireProcessEnv('DB_PASSWORD'),
      db_host: requireProcessEnv('DB_HOST'),
      db_port: requireProcessEnv('DB_PORT'),
      db_name: requireProcessEnv('DB_NAME_PROD'),
      db_log: requireProcessEnv('DB_LOG'),
      uri: 'mongodb://' + requireProcessEnv('DB_USER') + ':' + requireProcessEnv('DB_PASSWORD') + '@' + requireProcessEnv('DB_HOST') + ':' + requireProcessEnv('DB_PORT') + '/' + requireProcessEnv('DB_NAME_PROD'),
      options: {
        debug: false
      }
    },
    postgresql: {
      db_user: requireProcessEnv('DB_USER'),
      db_pass: requireProcessEnv('DB_PASSWORD'),
      db_host: requireProcessEnv('DB_HOST'),
      db_port: requireProcessEnv('DB_PORT'),
      db_name: requireProcessEnv('DB_NAME_PROD'),
      db_log: requireProcessEnv('DB_LOG'),
      uri: 'postgres://' + requireProcessEnv('DB_USER') + ':' + requireProcessEnv('DB_PASSWORD') + '@' + requireProcessEnv('DB_HOST') + ':' + requireProcessEnv('DB_PORT') + '/' + requireProcessEnv('DB_NAME_PROD'),
      options: {
        debug: false
      }
    }
  }
}

/**
 * Finally, as again, a webpack configuration, we just merge the common config, with specific environment config
 */
export default merge(config.all, config[config.all.env])
