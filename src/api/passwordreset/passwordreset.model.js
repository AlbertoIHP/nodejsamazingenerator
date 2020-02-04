
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
  models.project.hasMany(models.sector, {
    as: 'sectors', allowNull: true
  }, {
    onDelete: 'CASCADE',
    hooks: true
  })

  models.project.belongsTo(models.company, {
    foreignKey: 'companyId',
    allowNull: true
  })
  passwordreset.associate = function (models) {

    /**
     * An example of association is the follow
     * Guess $modelname$ has a collection of cookies table.
     * At the same time, cookies just saves one reference 
     * (foreign key) to it's $modelname$'s
     * 
     *   models.$modelname$.hasMany(models.cookie, {
     *     as: 'cookies', allowNull: true
     *   }, {
     *     onDelete: 'CASCADE',
     *     hooks: true
     *   })
     * 
     * At cookie.model.js must be declared the reference to it's $modelname$ owner 
     * on associate function as follow:
     * 
     *   models.cookie.belongsTo(models.$modelname$, {
     *     foreignKey: '$modelname$Id',
     *     allowNull: true
     *   })
     * 
     * 
     */
  }

  return passwordreset
}
