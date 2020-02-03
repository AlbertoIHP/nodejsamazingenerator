
import { errorHandler } from '../../utils/error_handler'
import moment from 'moment'

/**
 * From queryman lib syntaxis (Check https://www.npmjs.com/package/bodymen)
 * Which could be use as validating fetching tool at controller or event at express
 * example of schema definitions:
 * attribute: {
 *   type: String,
 *   match: /^\S+@\S+\.\S+$/,
 *   required: true,
 *   unique: true,
 *   trim: true,
 *   lowercase: true,
 *   minlength: 6,
 *   enum: roles
 * }
 *
 */
export const passwordresetDataSchema = {
  user_id:
   {
     type: Number,
     required: true
   },
  rest_token:
   {
     type: String,
     required: false
   },
  created_at:
   {
     type: Date,
     required: false
   }

}

/**
 * This method build usefull attr to be declared in many places as it could be necessary (migrations example)
 * @param {*} DataTypes From Sequelize instance
 */
export const passwordresetAttributes = (DataTypes) => {
  return {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id:
   {
     type: DataTypes.INTEGER,
     allowNull: false
   },
    rest_token:
   {
     type: DataTypes.STRING,
     allowNull: false
   },
    created_at:
   {
     type: DataTypes.DATE,
     defaultValue: DataTypes.NOW,
     allowNull: false
   }

  }
}

/**
 * Sequelize model
 */
export default (sequelize, DataTypes) => {
  const passwordreset = sequelize.define('passwordreset', {
    ...passwordresetAttributes(DataTypes)
  }, {
    tableName: 'passwordresets',
    hooks: {
      /**
       * hooks methods from models recognize some
       * lifecycle hooks from the user model component
       * to execute some custom 'scripts' on them
       * (Check https://sequelize.org/master/manual/hooks.html)
       */
      beforeCreate: async (beforeSaveNewPasswordReset) => {
        try {
          beforeSaveNewPasswordReset.set('expires', moment().add(1, 'days'))
        } catch (err) {
          errorHandler(err)
        }
      }
    }
  })

  passwordreset.associate = function (models) {
    // associations can be defined here
  }

  return passwordreset
}
