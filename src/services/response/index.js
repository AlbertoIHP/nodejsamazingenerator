
/**
 * This methods builds a json response based on the original response, giving
 * to it a status and also the result of the fetching as an object entity
 * @param {*} res receives the res from a fetching request
 * @param {*} status Code with status of the response for a fetching request
 */
export const success = (res, status) => (entity) => {
  if (entity) {
    res.status(status || 200).json(entity)
  }
  return null
}

/**
 * This method try at last try, checking entity existing, if not just a 404 is deployed
 * @param {*} res receives the res from a fetching request
 */
export const notFound = (res) => (entity) => {
  if (entity) {
    return res.status(500).json(entity)
  }
  res.status(404).end()
  return null
}

/**
 * Checks if there is an admin or author logging
 * and checks if it exist with entity given
 * else just return a 401 code
 * @param {*} res receives the res from a fetching request
 * @param {*} user user to be checked as user o author
 * @param {*} userField entity checked from DB with the Sequelize ORM
 */
export const authorOrAdmin = (res, user, userField) => (entity) => {
  if (entity) {
    const isAdmin = user.role === 'admin'
    const isAuthor = entity[userField] && entity[userField].equals(user.id)
    if (isAuthor || isAdmin) {
      return entity
    }
    res.status(401).end()
  }
  return null
}
