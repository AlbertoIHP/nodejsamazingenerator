const execSync = require('child_process').execSync
let postinstallScript = "node ../../node_modules/.bin/babel-node generator/ postinstall.js"

console.log("ASDASDASDASDAS****************> ",process.cwd().includes('node_modules'))

execSync(pythonCommand, { stdio: [0, 1, 2] })