import jwt from 'jsonwebtoken'
import Promise from 'bluebird'
import config from '../../config'

/**
 * With promisify we can change the original function return by a Promise response
 */
const jwtSign = Promise.promisify(jwt.sign)
const jwtVerify = Promise.promisify(jwt.verify)

/**
 * This method allows to sign in through jsonwebtoken lib
 * @param {*} id id from the fetching user
 * @param {*} options options to sign in
 * @param {*} method method to sign in at platform, usually jwt secret method
 */
export const sign = (id, options, method = jwtSign) => {
  console.log('Signing in with JWT_SECRET = ', config.jwtSecret)
  return method({ id }, config.jwtSecret, options)
}

/**
 * Same behaviour of sign function, but as synchronos flow
 * @param {*} id id from the fetching user
 * @param {*} options options to sign in
 */
export const signSync = (id, options) => sign(id, options, jwt.sign)

/**
 * Synchronously verify given token using a secret or a public key to get a decoded token token
 * @param {*} token given token
 */
export const verify = (token) => jwtVerify(token, config.jwtSecret)
