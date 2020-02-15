/* jshint indent: 2 */

import bcrypt from 'bcrypt'
import { errorHandler } from '../../utils/error_handler'
import { Role } from '../../enums/Role.enum'
import { uid } from 'rand-token'
export const roles = Role

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
    required: true,
    match: /^\S+@\S+\.\S+$/
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
  name: {
    type: String,
    required: true
  },
  is_active: {
      type: Boolean,
      required: false
  },
  activation_token: {
      type: String,
      required: false
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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    activation_token: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: uid(32)
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
          if (!user.id) {
              const hashedPass = await bcrypt.hash(user.password, 9)
              user.password = hashedPass
          }
      } catch (err) {
          errorHandler(err)
      }
      }
    }
  })
}
