'use strict'

import { passwordresetAttributes } from '../src/api/passwordreset/passwordreset.model'

/**
 * With passwordresetAttributes we can spread whole attr model config
 */
module.exports = (() => {
  return {
    up: (sequelize, DataTypes) => {
      return sequelize.createTable('passwordresets', {
        ...passwordresetAttributes(DataTypes)
      })
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('passwordresets')
    }
  }
})()
