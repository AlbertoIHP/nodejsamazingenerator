
import { sign } from '../../services/jwt'
import { success, notFound } from '../../services/response/'

/**
 * This methods uses SIGN function from service JWT (Check services/jwt folder)
 * To basically sign in into the API
 * @param {*} param0 User object to be added to response
 * @param {*} res response from request fetching
 * @param {*} next function to go to next flow on fetching
 * (check https://stackoverflow.com/questions/10695629/what-is-the-parameter-next-used-for-in-express)
 */
export const login = ({ user }, res, next) => {
  if (!user.is_active) {
    return notFound(res, 401)({ msg: 'This user did not confirm his email.' })
  }
  return sign(user.id)
    .then((token) => ({ token, user: user }))
    .then(success(res, 201))
    .catch(next)
}
