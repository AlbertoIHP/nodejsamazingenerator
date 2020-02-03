import consoleColors from './console_colors'

/**
 * This function through a switch case selector, checks the error type and how to react to it (on dev...)
 * @param {*} error receives an error JS type, which should have a .name attr, and also a .message attr
 */
export const errorHandler = (error) => {
  switch (error.name) {
    case 'TypeError':
      console.log(consoleColors.errorConsole, '[ERROR] Error on TypeError: ', error)
      break
    case 'SequelizeConnectionError':
      console.log(consoleColors.errorConsole, '[ERROR] Error on SequelizeConnectionError: ', error)
      break
    default:
      console.log(consoleColors.errorConsole, '[ERROR] Error on ' + error.name + ': ', error)
      break
  }
}
