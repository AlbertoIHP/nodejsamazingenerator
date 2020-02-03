import factory from '../../services/factorygirl'
import faker from 'faker'
import models from '../../services/sequelize'
import { roles } from './user.model'

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * For generating fakers strategies check the API (https://www.npmjs.com/package/faker)
 * Description: Generator use as default follow:
 *  DataTypes.STRING: faker.lorem.sentence()
 *  DataTypes.INTEGER: faker.random.number()
 *  DataTypes.DATE: Date.now()
 * Rembember that is correct as well to build object with params to change this default
 * by building factory as factory.build('user', { some_ttr: some_other_val }, callback)
 *
 * For generator: $attrfakerlist$ is list querymanAttributes at generator.py
 * splitted and replaced by templates fakers. Check it by checking generator code base folder :)
 */
factory.define('user', models.user, {
  email: () => faker.internet.email(),
  password: () => faker.internet.password(),
  role: () => roles[getRandomInt(0, roles.length)],
  username: () => faker.internet.userName()
})

export default factory
