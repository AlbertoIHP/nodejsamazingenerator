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
        projectName: (process.env.NODE_ENV !== 'production' ? requireProcessEnv('PROJECT_NAME') : process.env.PROJECT_NAME),
        env: process.env.NODE_ENV,
        root: path.join(__dirname, '..'),
        port: (process.env.NODE_ENV !== 'production' ? requireProcessEnv('SERVER_PORT') : process.env.SERVER_PORT),
        ip: (process.env.NODE_ENV !== 'production' ? requireProcessEnv('SERVER_IP') : process.env.SERVER_IP),
        apiRoot: (process.env.NODE_ENV !== 'production' ? requireProcessEnv('API_ROOT') : process.env.API_ROOT),
        defaultEmail: (process.env.NODE_ENV !== 'production' ? requireProcessEnv('DEFAULT_EMAIL_ALIAS') : process.env.DEFAULT_EMAIL_ALIAS),
        sendgridKey: (process.env.NODE_ENV !== 'production' ? requireProcessEnv('SENDGRID_KEY') : process.env.SENDGRID_KEY),
        masterKey: (process.env.NODE_ENV !== 'production' ? requireProcessEnv('MASTER_KEY') : process.env.MASTER_KEY),
        jwtSecret: (process.env.NODE_ENV !== 'production' ? requireProcessEnv('JWT_SECRET') : process.env.JWT_SECRET)
    },
    /**
   * And other specific config to specific environments as Production, Development and Test
   */
    test: {
        postgresql: {
            db_user: requireProcessEnv('DB_USER'),
            db_pass: requireProcessEnv('DB_PASSWORD'),
            db_host: requireProcessEnv('DB_HOST'),
            db_port: requireProcessEnv('DB_PORT'),
            db_name: requireProcessEnv('DB_NAME_TEST'),
            db_log: requireProcessEnv('DB_LOG'),
            uri: 'postgres://' + requireProcessEnv('DB_USER') + ':' + requireProcessEnv('DB_PASSWORD') + '@' + requireProcessEnv('DB_HOST') + ':' + requireProcessEnv('DB_PORT') + '/' + requireProcessEnv('DB_NAME_TEST')
        }
    },
    development: {
        postgresql: {
            db_user: requireProcessEnv('DB_USER'),
            db_pass: requireProcessEnv('DB_PASSWORD'),
            db_host: requireProcessEnv('DB_HOST'),
            db_port: requireProcessEnv('DB_PORT'),
            db_name: requireProcessEnv('DB_NAME_DEV'),
            db_log: requireProcessEnv('DB_LOG'),
            uri: 'postgres://' + requireProcessEnv('DB_USER') + ':' + requireProcessEnv('DB_PASSWORD') + '@' + requireProcessEnv('DB_HOST') + ':' + requireProcessEnv('DB_PORT') + '/' + requireProcessEnv('DB_NAME_DEV')
        }
    },
    production: {
        postgresql: {
            db_user: process.env.DB_USER,
            db_pass: process.env.DB_PASSWORD,
            db_host: process.env.DB_HOST,
            db_port: process.env.DB_PORT,
            db_name: process.env.DB_NAME_PROD,
            db_log: process.env.DB_LOG,
            uri: 'postgres://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME_PROD
        }
    }
}

const mergedConf = merge(config.all, config[config.all.env])

console.log(`




..######.#######.########.##.....#.#######.########....######..#######.##....#.#######.###..######..
.##....#.##......##.....#.##.....#.##......##.....#...##....#.##.....#.###...#.##.......##.##....##.
.##......##......##.....#.##.....#.##......##.....#...##......##.....#.####..#.##.......##.##.......
..######.######..########.##.....#.######..########...##......##.....#.##.##.#.######...##.##...####
.......#.##......##...##...##...##.##......##...##....##......##.....#.##..###.##.......##.##....##.
.##....#.##......##....##...##.##..##......##....##...##....#.##.....#.##...##.##.......##.##....##.
..######.#######.##.....#....###...#######.##.....#....######..#######.##....#.##......###..######..
`)
console.log(mergedConf)

/**
 * Finally, as again, a webpack configuration, we just merge the common config, with specific environment config
 */
export default mergedConf
