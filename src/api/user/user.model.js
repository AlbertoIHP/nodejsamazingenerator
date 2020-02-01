/* jshint indent: 2 */

import bcrypt from 'bcrypt'
import { errorHandler } from '../../utils/error_handler'

const roles = [
  'user',
  'admin',
  'superadmin'
]

/**
 * From queryman lib syntaxis (Check https://www.npmjs.com/package/bodymen)
 * Which could be use as validating fetching tool at controller or event at express
 * example of schema definitions:
 * attribute: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 6,
    enum: roles
  }
 *
 */
export const userDataSchema = {
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: roles
  },
  username: {
    type: String,
    required: true
  }
}

/**
 * This method build usefull attr to be declared in many places as it could be necessary (migrations example)
 * @param {*} DataTypes From Sequelize instance
 */
export const userAttributes = (DataTypes) => {
  return {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
}

/**
 * Sequelize model
 */
export default (sequelize, DataTypes) => {
  return sequelize.define('user', {
    ...userAttributes(DataTypes)
  }, {
    tableName: 'users',
    hooks: {
      /**
       * hooks methods from models recognize some
       * lifecycle hooks from the user model component
       * to execute some custom 'scripts' on them
       * (Check https://sequelize.org/master/manual/hooks.html)
       */
      beforeSave: async (user) => {
        try {
          const hashedPass = await bcrypt.hash(user.password, 9)
          user.password = hashedPass
        } catch (err) {
          errorHandler(err)
        }
      }
    }
  })
}
