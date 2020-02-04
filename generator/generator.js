
/**
 * Kind of npm run generate:model --name bebinski --attr name:string,location:string,email:string
 */
const execSync = require('child_process').execSync
const modelName = process.argv[2]
const modelAttributes = process.argv[3]
const dirPath = 'src/api/' + modelName

const statusConsole = '\x1b[36m%s\x1b[0m'
const successConsole = '\x1b[32m%s\x1b[0m'
const errorConsole = '\x1b[33m%s\x1b[0m'

const python = ( filePath ) =>{
  console.log(statusConsole, '[STATUS] Executing ' + filePath)
  const pythonCommand = 'python '+filePath
  execSync(pythonCommand, { stdio: [0, 1, 2] })
  console.log(successConsole, '[SUCCESS] ' + filePath +' execution without errors')
}

const cmd = (command) => {
  try {
    execSync(command, { stdio: [0, 1, 2] })
  } catch (err) {
    console.log(errorConsole, 'ERROR:', JSON.stringify(err))
  }
}

const rollback = (fullEnv, shortEnv) => {
  const dbDropCommand = 'npm run sequelize -- db:drop --env=' + fullEnv
  const dbCreateCommand = 'npm run sequelize -- db:create --env=' + fullEnv
  const dbMigrateCommand = 'npm run sequelize -- db:migrate --env=' + fullEnv
  const startServerCommand = 'npm run ' + shortEnv

  cmd(dbDropCommand)
  cmd(dbCreateCommand)
  cmd(dbMigrateCommand)
  cmd(startServerCommand)
}

try {
  if (process.argv[(process.argv.length - 1)] === 'true') {
    python('generator/init_project.py')
  } else if (process.argv[(process.argv.length - 1)] === 'dev:rollback') {
    rollback('development', 'dev')
  } else if (process.argv[(process.argv.length - 1)] === 'test:rollback') {
    rollback('test', 'test')
  } else if (process.argv[(process.argv.length - 1)] === 'prod:rollback') {
    rollback('production', 'prod')
  } else {
    console.log(statusConsole, '[STATUS] Generating structure for model: ', modelName)
    console.log(statusConsole, '[STATUS] Creating directory at ', dirPath)
    const mkDirCommand = 'mkdir -p ' + dirPath
    execSync(mkDirCommand, { stdio: [0, 1, 2] })
    console.log(successConsole, '[SUCCESS] directory created succesfully')

    console.log(statusConsole, '[STATUS] Creating model and migration with attributes: ', modelAttributes)
    const sequelizeCliCommand = 'npx sequelize-cli --models-path ' + dirPath + ' model:generate --name ' + modelName + '.model --attributes ' + modelAttributes
    execSync(sequelizeCliCommand, { stdio: [0, 1, 2] })
    console.log(successConsole, '[SUCCESS] Model and Migration were created with SEQUELIZE-CLI without problems.')

    console.log(statusConsole, '[STATUS] Applying RESTful, DAO and MVC patterns to generated files (Executing generator script)')
    const pythonCommand = 'python generator/generator.py --modelname ' + modelName + ' --dirpath ' + dirPath
    execSync(pythonCommand, { stdio: [0, 1, 2] })
    console.log(successConsole, '[SUCCESS] generator.py execution without errors')
  }
} catch (err) {
  console.log(errorConsole, err.message)
}
