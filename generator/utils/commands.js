export const statusConsole = '\x1b[36m%s\x1b[0m'
export const successConsole = '\x1b[32m%s\x1b[0m'
export const errorConsole = '\x1b[33m%s\x1b[0m'
export const execSync = require('child_process').execSync

/**
 * Python at amazinGenerator executes a python script by a path given.
 * It basically asumes that you have UNIX console which needs Python 2.7 
 * at Linux debian distros to work with it package manager (yum, apt, etc)
 * @name python
 * @param {*} filePath path to python script including .py (example src/app.py)
 */
export const python = ( filePath ) =>{
  console.log(statusConsole, '[STATUS] Executing ' + filePath)
  const pythonCommand = 'python '+filePath
  execSync(pythonCommand, { stdio: [0, 1, 2] })
  console.log(successConsole, '[SUCCESS] ' + filePath +' execution without errors')
}

/**
 * CMD function at amazinGenerator executes direct a UNIX command to Linux or Mac console (Not windows support)
 * @name cmd
 * @param {*} command normal command that would be executed by bash console...
 */
export const cmd = (command) => {
  try {
    execSync(command, { stdio: [0, 1, 2] })
  } catch (err) {
    console.log(errorConsole, 'ERROR:', JSON.stringify(err))
  }
}

/**
 * Rollback function at amazinGenerator follow the sequelize-cli flow to drop, create and migrate your data
 * As well as start the server after doing all that stuff :)
 * @name rollback
 * @param {*} fullEnv complete environment name (example production)
 * @param {*} shortEnv abbreviation of the environment name (example: prod)
 */
export const rollback = (fullEnv, shortEnv) => {
  const dbDropCommand = 'npm run sequelize -- db:drop --env ' + fullEnv
  const dbCreateCommand = 'npm run sequelize -- db:create --env ' + fullEnv
  const dbMigrateCommand = 'npm run sequelize -- db:migrate --env ' + fullEnv
  const dbSeedCommand = 'NODE_ENV=' + fullEnv + ' npm run sequelize -- db:seed:all'
  const startServerCommand = 'npm run ' + shortEnv

  cmd(dbDropCommand)
  cmd(dbCreateCommand)
  cmd(dbMigrateCommand)
  cmd(dbSeedCommand)
  cmd(startServerCommand)
}

/**
 * Model function at amazinGenerator follow the sequelize-cli scaffold script to create a new model by 
 * a model name given and also attributes with sequelize-cli syntax.
 * Then, comes the magic, amazinGenerator runs a python script which goes through this sacffolded files
 * and modifies it to good practices peace of code ¡ AUTO GENERATED !
 * @name model
 * @param {*} dirPath path to save files
 * @param {*} modelName name of the entity to scaffold
 * @param {*} modelAttributes attributes given by npm script as format name:string,age:integer...
 */
export const model = ( dirPath, modelName, modelAttributes) => {
    const mkDirCommand = 'mkdir -p ' + dirPath
    const sequelizeCliCommand = 'npx sequelize-cli --models-path ' + dirPath + ' model:generate --name ' + modelName + '.model --attributes ' + modelAttributes
    const sequelizeSeedComand = 'npx sequelize-cli seed:generate --name ' + modelName + '-seed'
    const pythonCommand = 'python generator/generator.py --modelname ' + modelName + ' --dirpath ' + dirPath

    cmd(mkDirCommand)
    cmd(sequelizeCliCommand)
    cmd(sequelizeSeedComand)
    python(pythonCommand)
}