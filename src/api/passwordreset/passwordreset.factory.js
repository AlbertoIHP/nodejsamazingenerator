import factory from '../../services/factorygirl'
import models from '../../services/sequelize'
import faker from 'faker'

/**
 * For generating fakers strategies check the API (https://www.npmjs.com/package/faker)
 * Description: Generator use as default follow: 
 *  DataTypes.STRING: faker.lorem.sentence()
 *  DataTypes.INTEGER: faker.random.number()
 *  DataTypes.DATE: Date.now()
 * Rembember that is correct as well to build object with params to change this default
 * by building factory as factory.build('passwordreset', { some_ttr: some_other_val }, callback)
 *
 * For generator: $attrfakerlist$ is list querymanAttributes at generator.py
 * splitted and replaced by templates fakers. Check it by checking generator code base folder :)
 */
factory.define('passwordreset', models.passwordreset, {
  user_id: () => faker.random.number(),
  rest_token: () => faker.lorem.sentence(),
  created_at: () => Date.now()
})

export default factory
