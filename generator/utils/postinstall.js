
const cmd = function (command) {
    const execSync = require('child_process').execSync
    try {
        execSync(command, { stdio: [0, 1, 2] })
    } catch (err) {
        console.log('ERROR:', JSON.stringify(err))
    }
}

var basePath = process.cwd()
var strict = '/node_modules/nodejsamazingenerator'
basePath = basePath.split(strict)[0]
strict = basePath + '/package-lock.json'
const fs = require('fs')

try {
    if (fs.existsSync(strict)) {
        console.log('[POST INSTALL ALREADY MAKED]')
    } else {
        console.log('BASE: ', basePath)
        const deletePackagesCommand = 'rm -rf ' + basePath + '/package.json ' + basePath + '/package-lock.json'
        const transferNodeModulesPackageCommand = 'mv ' + basePath + '/node_modules/nodejsamazingenerator/* ' + basePath
        const createDotFilesCommand = 'mv ' + basePath + '/env.example ' + basePath + '/.env.example; mv ' + basePath + '/eslintrc ' + basePath + '/.eslintrc; mv ' + basePath + '/gitignore ' + basePath + '/.gitignore; mv ' + basePath + '/editorconfig ' + basePath + '/.editorconfig; mv ' + basePath + '/babelrc ' + basePath + '/.babelrc'
        const copyPackageJsonCommand = 'rm -rf ' + basePath + '/package.json; cp ' + basePath + '/generator/templates/package.template ' + basePath + '/package.json'
        const pythonInitCommand = 'python2.7 ' + basePath + '/generator/init_project.py'
        const deleteAmazingPackage = 'rm -rf ' + basePath + '/node_modules ' + basePath + '/package-lock.json' // Project is yours now :)

        console.log('[POST INSTALL] Deleting package.json and package-lock.json.............')
        cmd(deletePackagesCommand)

        console.log('[POST INSTALL] Copying amazinGenerator files.............')
        cmd(transferNodeModulesPackageCommand)
        console.log('[POST INSTALL] Generating conf files (dot files).............')
        cmd(createDotFilesCommand)
        console.log('[POST INSTALL] Creating new package.json with amazinGenerator.............')
        cmd(copyPackageJsonCommand)
        console.log('[POST INSTALL] Configure vars at your scaffolded amazinGenerator project.............')
        cmd(pythonInitCommand)
        console.log('[POST INSTALL] Deleting the source code from node_modules (project is yours now ).............')
        cmd(deleteAmazingPackage)
        console.log('Run npm install to fill dependencies, then npm run dev:rollback to build your whole environment for development. Check docs.')
        console.log('Thanks by using us !')
        console.log(`
    _____       _        __ _____                      _     _____                     _           
    |   | |___ _| |___ __|  |   __|   ___ _____ ___ ___|_|___|   __|___ ___ ___ ___ ___| |_ ___ ___ 
    | | | | . | . | -_|  |  |__   |  | .'|     | .'|- _| |   |  |  | -_|   | -_|  _| .'|  _| . |  _|
    |_|___|___|___|___|_____|_____|  |__,|_|_|_|__,|___|_|_|_|_____|___|_|_|___|_| |__,|_| |___|_|  
                                                                                                                                        
    `)
    }
} catch (err) {

}
