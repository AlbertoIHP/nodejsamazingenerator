import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

import config from '../../config'
const target = path.join(__dirname, '../../api')

/**
 * Instance of the main Sequelize object to be injected in other files, as the user controller from legacy example
 */

const sequelize = new Sequelize(config.postgresql.uri, {
  logging: config.postgresql.db_log === 'true',
  dialect: 'postgres',
  host: config.postgresql.db_host,
  port: config.postgresql.db_port,
  define: {
    timestamps: false /** Must be true */
  }
})

/** db is the default export that this service will give by sequelize instance and class by Sequelize */
const db = {}

/** Array which saves the PATH of models which will be given to te searchModels function */
const models = []

/**
 * This recursive function goes through a main directory given by first time at target parameter
 * to find Sequelize models
 * @param {*} target directory to check models
 * @param {*} result_array an array which will be filled with PATH's of models founded
 */
const searchModels = (target, result_array = []) => {
  fs.readdirSync(target, { withFileTypes: true }).map(element => {
    if (element.isDirectory()) {
      const directoryPath = path.join(target, element.name)
      searchModels(directoryPath, result_array)
    } else {
      const isModel = (element.name.indexOf('.model') !== -1)
      if (isModel) {
        const modelPath = path.join(target, element.name)
        result_array.push(modelPath)
      }
    }
  })
}

searchModels(target, models)
models.map((modelPath) => {
  const model = sequelize.import(modelPath)
  db[model.name] = model
  if ('associate' in db[model.name]) {
    db[model.name].associate(db)
  }
})

/**
 * Assign just sequelize to the instance of the object Sequelize
 * and also a Sequelize default style as class without instance
 */
db.sequelize = sequelize
db.Sequelize = Sequelize
export default db
module.exports = db
