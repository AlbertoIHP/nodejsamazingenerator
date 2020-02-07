

import { errorConsole, python, cmd, rollback, model } from './utils/commands'

try {
  const modelName = process.argv[2]
  const modelAttributes = process.argv[3]
  const dirPath = 'src/api/' + modelName

  if (process.argv[(process.argv.length - 1)] === 'true') {
    python('generator/init_project.py')  /** npm run init:project */
  } else if (process.argv[(process.argv.length - 1)] === 'dev:rollback') {
    rollback('development', 'dev')  /** npm run dev:rollback */
  } else if (process.argv[(process.argv.length - 1)] === 'test:rollback') {
    rollback('test', 'test') /** npm run test:rollback */
  } else if (process.argv[(process.argv.length - 1)] === 'prod:rollback') {    
    rollback('production', 'prod') /**npm run prod:rollback */
  } else { 
    model( dirPath, modelName, modelAttributes ) /**npm run model --name person --attr name:string,age:integer,isman:boolean */
  }
  console.log("Thanks by using us !")
  console.log(`
 
  | \ | |         | |      |_  /  ___|                           (_)     |  __ \                         | |            
  |  \| | ___   __| | ___    | \ `--.    __ _ _ __ ___   __ _ _____ _ __ | |  \/ ___ _ __   ___ _ __ __ _| |_ ___  _ __ 
  | . ` |/ _ \ / _` |/ _ \   | |`--. \  / _` | '_ ` _ \ / _` |_  | | '_ \| | __ / _ | '_ \ / _ | '__/ _` | __/ _ \| '__|
  | |\  | (_) | (_| |  __/\__/ /\__/ / | (_| | | | | | | (_| |/ /| | | | | |_\ |  __| | | |  __| | | (_| | || (_) | |   
  \_| \_/\___/ \__,_|\___\____/\____/   \__,_|_| |_| |_|\__,_/___|_|_| |_|\____/\___|_| |_|\___|_|  \__,_|\__\___/|_|   
                                                                                                                            
  `)

} catch (err) {
  console.log(errorConsole, err.message)
}
