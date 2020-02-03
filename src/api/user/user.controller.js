
import { success, notFound } from '../../services/response'
import models from '../../services/sequelize'
import consoleColors from '../../utils/console_colors'
import { errorHandler } from '../../utils/error_handler'

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
  console.log(consoleColors.successConsole, '[SUCCESS] Master and Bodyman middlewares check completed succesfully')
  try {
    const newUser = await models.user.build(body)
    if (newUser) {
      await newUser.save()
      console.log(newUser.password)
      if (success(res, 200)(newUser)) {
        console.log(consoleColors.statusConsole, '[STATUS] Returned res succesfully to fetcher')
      } else {
        next()
      }
    } else {
      next()
    }
  } catch (err) {
    errorHandler(err)
    notFound(res)({ msj: err })
  }
}

export const update = async ({ bodymen: { body }, params, user }, res, next) => {
  try {
    const s = await models.user.update(body, { where: { id: body.id } })
    if (s != null) success(res)({ msj: 'user updated', user: s })
    // eslint-disable-next-line no-throw-literal
    else throw 'User does not exist.'
  } catch (err) {
    errorHandler(err)
    notFound(res)({ msj: err })
  }
}

export const destroy = async ({ params }, res, next) => {
  try {
    const s = await models.user.findOne({ where: { id: params.id } })
    const deleted = await s.destroy()
    success(200)({ msj: 'User deleted', user: deleted })
  } catch (err) {
    errorHandler(err)
    notFound(res)({ msj: err })
  }
}
