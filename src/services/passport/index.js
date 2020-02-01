import passport from 'passport'
import { Schema } from 'bodymen'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import config from '../../config'
import User from '../../api/user/user.model'
import bcrypt from 'bcrypt'

import models from '../sequelize'

import consoleColors from '../../utils/console_colors'
import { errorHandler } from '../../utils/error_handler'

/**
 * Common password login (check use passport definiton for 'password')
 */
export const password = () => (req, res, next) => {
  console.log(consoleColors.statusConsole, '[STATUS] Checking password ')

  /** user param comes as a Basic Authorization base 64 (Go https://www.blitter.se/utils/basic-authentication-header-generator/) */
  return passport.authenticate('password', { session: false }, (err, user, info) => {
    if (err && err.param) {
      console.log(consoleColors.errorConsole, '[ERROR] param gives: ', err)
      return res.status(400).json(err)
    } else if (err || !user) {
      console.log(consoleColors.errorConsole, '[ERROR] user not found, user gives: ', user)
      return res.status(401).end()
    }

    console.log(consoleColors.successConsole, '[SUCCESS] Password checked succesfully')
    console.log(consoleColors.statusConsole, '[STATUS] Logging in with password getted')
    req.logIn(user, { session: false }, (err) => {
      if (err) {
        console.log(consoleColors.errorConsole, '[ERROR] Unauthorized')
        return res.status(401).end()
      }

      console.log(consoleColors.successConsole, '[SUCCESS] Sucesfully pasword checked, getting next middleware (through next() express Method')
      next()
    })
  })(req, res, next)
}

/**
 * This function receives some usefull info through an object (see param def), to execute a passport authenticate
 * this by executing an anonymous function (check use passport definition for 'token')
 *
 * @param {*} param0 Object composed by 'required' boolean which said if should go through
 * JWT flow or not, also allows roles as an array of allowed roles [ 'admin' ] as example
 */
export const token = ({ required, roles = User.roles } = {}) => (req, res, next) =>
  passport.authenticate('token', { session: false }, (err, user, info) => {
    if (err || (required && !user) || (required && !~roles.indexOf(user.role))) {
      return res.status(401).end()
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)

/**
 * Checks if fetch has the Bearer with MASTER_KEY to authorize fetching to the API (check use passport definition for 'master')
 */
export const master = () => {
  return passport.authenticate('master', { session: false })
}

/**
 * Basic password auth, by validating fields through schema
 * then finding specific user which is trying to login
 * and finally authenticating with bcrypt comparison
 */
passport.use('password', new BasicStrategy(async (email, password, done) => {
  /**
   * Bodyman middleware allows developers to filter and set some rules for
   * fetching data
   */
  console.log(consoleColors.statusConsole, '[STATUS] Building Schema on bodymen')
  const userSchema = new Schema({
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    }
  })
  console.log(consoleColors.successConsole, '[SUCCESS] Schema created for user validation ')

  console.log(consoleColors.statusConsole, '[STATUS] Validating params receives email: ', email, ', password: ', password)
  userSchema.validate({ email, password }, (err) => {
    if (err) {
      console.log(consoleColors.errorConsole, '[ERROR] Error on validating body parameters: ', JSON.stringify(err))
      done(err)
    }
    console.log(consoleColors.successConsole, '[SUCCESS] Params validated succesfully ')
  })

  try {
    const user = await models.users.findOne({
      where: {
        email: email
      }
    })

    /** NOTE: done dont break the fetch flow, os the llines below it will be executed as well as it did */
    if (!user) done(true)

    const passCheck = await bcrypt.compare(password, user.password)
    if (passCheck) {
      done(null, user)
    }
  } catch (err) {
    errorHandler(err)
    done(null, false)
  }
}))

/**
 * Receives a token through the header Bearer, which ones must contain the MASTER_KEY to private the access to the API just to authorized
 * Apps and not any user from any fetching tool with a correct JWT token
 * If token is correct returns an object empty, that is interpreted as a correct done function result
 * But if isnt, is used by given a false value which is interpreted by passport as deny access to the Fetching indeed
 */
passport.use('master', new BearerStrategy((token, done) => {
  console.log(consoleColors.statusConsole, '[STATUS] Checking master key on body access_token param')
  if (token === config.masterKey) {
    done(null, {})
  } else {
    done(null, false)
  }
}))

/**
 * Passport configuration for using JWT
 */
passport.use('token', new JwtStrategy({
  secretOrKey: config.jwtSecret, /** Mainly by giving to it the JWT_SECRET from .env (check config.js) */
  /**
   * Then by extracting from request the access_token given after logging API (It could be at URL, at Body from request, or Header from request)
   */
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('Bearer')
  ])
  /**
   * At last, get the user and is added to request as req.user with
   * done function, that takes the profile info and attaches it on the request object so its available on your callback url as req.user.
   * ( Read  https://hackernoon.com/passportjs-the-confusing-parts-explained-edca874ebead )
   */
}, ({ id }, done) => {
  User.findById(id).then((user) => {
    done(null, user)
    return null
  }).catch(done)
}))
