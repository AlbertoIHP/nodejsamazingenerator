


const cmd = function(command) {
    const execSync = require('child_process').execSync
    try {
      execSync(command, { stdio: [0, 1, 2] })
    } catch (err) {
      console.log(errorConsole, 'ERROR:', JSON.stringify(err))
    }
  }
const moveCommand = 'cd ../..'
const deletePackagesCommand = 'rm -rf package-lock.json package.json'
const transferNodeModulesPackageCommand = 'mv node_modules/nodejsamazingenerator/* .'
const deleteNodeModulesCommand = 'rm -rf node_modules'
const createDotFilesCommand = 'mv env.example .env.example; mv eslintrc .eslintrc; mv gitignore .gitignore; mv editorconfig .editorconfig; mv babelrc .babelrc; cp .env.example .env'

cmd(moveCommand)
cmd(deletePackagesCommand)
cmd(transferNodeModulesPackageCommand)
cmd(deleteNodeModulesCommand)
cmd(createDotFilesCommand)
