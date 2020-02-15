
import { errorConsole, python, rollback, model } from './utils/commands'

try {
    const modelName = process.argv[2]
    const modelAttributes = process.argv[3]
    const dirPath = 'src/api/' + modelName

    if (process.argv[(process.argv.length - 1)] === 'true') {
        python('generator/init_project.py') /** npm run init:project */
    } else if (process.argv[(process.argv.length - 1)] === 'dev:rollback') {
        rollback('development', 'dev') /** npm run dev:rollback */
    } else if (process.argv[(process.argv.length - 1)] === 'test:rollback') {
        rollback('test', 'test') /** npm run test:rollback */
    } else if (process.argv[(process.argv.length - 1)] === 'prod:rollback') {
        rollback('production', 'prod') /** npm run prod:rollback */
    } else {
        model(dirPath, modelName, modelAttributes) /** npm run model --name person --attr name:string,age:integer,isman:boolean */
    }
    console.log('Thanks by using us !')
    console.log(`

                                                                                                
  _____       _        __ _____                      _     _____                     _           
  |   | |___ _| |___ __|  |   __|   ___ _____ ___ ___|_|___|   __|___ ___ ___ ___ ___| |_ ___ ___ 
  | | | | . | . | -_|  |  |__   |  | .'|     | .'|- _| |   |  |  | -_|   | -_|  _| .'|  _| . |  _|
  |_|___|___|___|___|_____|_____|  |__,|_|_|_|__,|___|_|_|_|_____|___|_|_|___|_| |__,|_| |___|_|  
                                                                                                  
                                                                                                                          
  `)
} catch (err) {
    console.log(errorConsole, err.message)
}
