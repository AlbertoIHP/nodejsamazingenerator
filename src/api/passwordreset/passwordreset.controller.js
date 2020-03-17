
import { success, notFound } from '../../services/response'
import models from '../../services/sequelize'
import consoleColors from '../../utils/console_colors'
import { errorHandler } from '../../utils/error_handler'
import { sendMail } from '../../services/sendgrid'
import { htmlEmailContent } from './passwordreset.helpers'
import { uid } from 'rand-token'
import bcrypt from 'bcrypt'

export const show = async ({ params }, res, next) => {
  try {
    const resetToken = params.token
    let passwordReset = await models.passwordreset.findOne({ where: { rest_token: resetToken } })

    if (passwordReset) {
      const userFetcher = await models.user.findOne({ where: { id: passwordReset.user_id } })
      if (userFetcher) {
        passwordReset = JSON.parse(JSON.stringify(passwordReset)) /** Forky copy object JS */
        passwordReset.user = userFetcher
        console.log(passwordReset)
        success(res, 200)(passwordReset)
      } else throw 'User dont exist'
    } else throw 'Token dont exist or it expires'
  } catch (err) {
    errorHandler(err)
    notFound(res)({ msj: err })
  }
}

/**
 * This method creates a new passwordreset by using bodymen and other usefull functions from the response service, check it ;)
 * @param {*} param0 params from the request, getting it with bodymen
 * @param {*} res res object to return to fetcher
 * @param {*} next next function from Express to go through the next middleware on the fetch
 */
export const create = async ({ bodymen: { body } }, res, next) => {
  console.log(consoleColors.successConsole, '[SUCCESS] Master and Bodyman middlewares check completed succesfully')
  try {
    const userFetcher = await models.user.findOne({ where: { email: body.email } })

    if (userFetcher) {
      const newPasswordReset = await models.passwordreset.build({ user_id: userFetcher.id, rest_token: uid(32) })
      newPasswordReset.save()

      if (newPasswordReset) {
        const link = `${body.link.replace(/\/$/, '')}/${newPasswordReset.rest_token}`
        const mail = await sendMail({ toEmail: userFetcher.email, subject: 'Password Reset', content: htmlEmailContent(userFetcher.username, link) })
        if (mail) {
          success(res)({ msj: 'Email sent with status ' + mail[0].statusCode, newPasswordReset })
        } else throw 'Could not send email'
      } else throw 'Could not generate your password reset ticket'
    } else throw 'User does not exist.'
  } catch (err) {
    errorHandler(err)
    notFound(res)({ msj: err })
  }
}

export const update = async ({ bodymen: { body }, params, passwordreset }, res, next) => {
  try {
    if (params.token) {
      const resetToken = params.token
      const passwordReset = await models.passwordreset.findOne({ where: { rest_token: resetToken } })

      if (passwordReset) {
        const userFetcher = await models.user.findOne({ where: { id: passwordReset.user_id } })
        if (userFetcher) {
          userFetcher.password = await bcrypt.hash(body.password, 9)
          await userFetcher.save()
          passwordReset.destroy()
          success(res, 200)(userFetcher)
        } else throw 'User dont exist'
      } else throw 'Token dont exist or it expires'
    } else throw 'You must specifiy the rest_token at url'
  } catch (err) {
    errorHandler(err)
    notFound(res)({ msj: err.message ? err.message : err })
  }
}
