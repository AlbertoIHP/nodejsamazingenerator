
import { success, notFound } from '../../services/response'
import models from '../../services/sequelize'
import { errorHandler } from '../../utils/error_handler'
import { sendMail } from '../../services/sendgrid'
import { registerEmailHtmlContent } from './user.helpers'

export const index = async ({ querymen: { query, select, cursor } }, res, next) => {
    try {
        const users = await models.user.findAll()
        success(res)({ users: users })
    } catch (err) {
        errorHandler(err)
        notFound(res)({ msj: err })
    }
}

export const show = async ({ params }, res, next) => {
    try {
        const s = await models.user.findOne({ where: { id: params.id } })
        if (s != null) success(res)({ user: s })
        else notFound(res)({})
    } catch (err) {
        errorHandler(err)
        notFound(res)({ msj: err })
    }
}

/**
 * This method creates a new user by using bodymen and other usefull functions from the response service, check it ;)
 * @param {*} param0 params from the request, getting it with bodymen
 * @param {*} res res object to return to fetcher
 * @param {*} next next function from Express to go through the next middleware on the fetch
 */
export const create = async ({ bodymen: { body } }, res, next) => {
    // console.log(consoleColors.successConsole, '[SUCCESS] Master and Bodyman middlewares check completed succesfully')
    try {
        const newUser = await models.user.build(body)
        if (newUser) {
            await newUser.save()
            if (newUser.id) {
                /**
         * Send email for confirmation on succes register
         */
                const link = `${body.link.replace(/\/$/, '')}/${newUser.activation_token}`
                const mail = await sendMail({ toEmail: newUser.email, subject: 'Page - Email confirmation to active your account', content: registerEmailHtmlContent(newUser, link) })
                if (mail) {
                    success(res, 200)(newUser)
                } else throw 'Could not send email'
            } else throw 'User cant be saved on BD'
        } else throw 'User cant be created'
    } catch (err) {
        errorHandler(err)
        notFound(res)({ msj: err })
    }
}

export const validateUser = async ({ bodymen: { body } }, res, next) => {
    try {
        const receivedToken = body.activation_token
        const userActivated = await models.user.findOne({ where: { activation_token: receivedToken } })

        if (userActivated) {
            if (receivedToken == userActivated.activation_token) {
                userActivated.is_active = true
                await userActivated.save()
                if (userActivated) {
                    delete userActivated.password
                    success(res, 200)(userActivated)
                } else throw 'Could not activate user'
            } else throw 'Token received for user specified dont match.'
        } else throw 'Token dont match with any user.'
    } catch (err) {
        errorHandler(err)
        notFound(res)({ msj: err })
    }
}

export const update = async ({ bodymen: { body }, params, user }, res, next) => {
    try {
        const s = await models.user.update(body, { where: { id: params.id } })
        if (s != null) success(res)({ msj: 'user updated', user: body })
        // eslint-disable-next-line no-throw-literal
        else throw 'User does not exist.'
    } catch (err) {
        errorHandler(err)
        notFound(res)({ msj: err })
    }
}

export const findByToken = async ({ params }, res, next) => {
    try {
        const user = await models.user.findOne({
            where: { activation_token: params.token }
        })
        if (user) {
            success(res, 200)(user);
        } else throw 'El usuario no existe.'
    } catch (err) {
        errorHandler(err)
        notFound(res)({ msj: err })
    }
}

export const destroy = async ({ params }, res, next) => {
    try {
        const s = await models.user.findOne({ where: { id: params.id } })
        const deleted = await s.destroy()
        success(res, 200)({ msj: 'User deleted', user: deleted })
    } catch (err) {
        errorHandler(err)
        notFound(res)({ msj: err })
    }
}
