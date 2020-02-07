'use strict'
import userFactory from '../src/api/user/user.factory'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let usersArray = []
    const users = await userFactory.buildMany('user', 100)
    users.map(userFactory => {
      usersArray.push(userFactory.dataValues)
    })
    usersArray = usersArray.map(user => { delete user.id; return user })
    return queryInterface.bulkInsert('users', usersArray, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
