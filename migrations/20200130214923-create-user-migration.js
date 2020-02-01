'use strict'

import { userAttributes } from '../src/api/user/user.model'

/**
 * With userAttributes we can spread whole attr model config
 */
module.exports = (() => {
  return {
    up: (sequelize, DataTypes) => {
      return sequelize.createTable('users', {
        ...userAttributes(DataTypes)
      })
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('users')
    }
  }
})()
