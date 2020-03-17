/* eslint-disable prefer-const */
import request from 'supertest'
import { expect } from 'chai'
import app from '../src/app'
import models from '../src/services/sequelize'
import config from '../src/config'

const fetchApp = request(app)
let cacheObject = {
  initialFrontData: {
    email: 'myemail@email.com',
    password: 'asdasdasd',
    role: 'admin',
    name: 'user',
    link: 'https://myfrontdomain.mytld/confirmation/',
    my_new_password: 'mynewpassword'
  },
  masterBasicAuthKey: Buffer.from(config.projectName + ':' + config.masterKey).toString('base64'),
  basicAuthCodeUser: Buffer.from('myemail@email.com:asdasdasd').toString('base64')
}

/**
 * Describe method let testers to group by sections their test
 * Top describe use to be a user storie, followed by
 * script of it process
 */
describe('Minimal features test', function () {
  this.enableTimeouts(false)

  before(function (done) {
    let env = process.env.NODE_ENV
    try {
        models.sequelize.sync({ force: true, logging: false }).then(() => {
            console.log('[SUCCESS] DATABASE HAS BEEN SYNC (UPDATED)')
            models.user.destroy({
                where: {},
                truncate: false
            })
            if (env != 'test') process.exit(1)
            done()
      })
    } catch (err) {
      console.log(err)
    }
  })

  describe('User register at page', function () {
    it('Registering user, getting code 200, new property on object user. On cache as savedUser attribute', async () => {
      let res = await fetchApp
        .post('/api/users')
        .send(cacheObject.initialFrontData)
        .set('Accept', 'application/json')
        .set('Authorization', 'Basic ' + cacheObject.masterBasicAuthKey)

      expect(res.status).to.equal(200)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('email')
      cacheObject.activation_token = res.body.activation_token
      cacheObject.savedUser = res.body
    })
  })

  describe('User try to login into page, but he did not active his account.', function () {
    it('Login dont let unvalidated users get a token, must return 401', async () => {
      let res = await fetchApp
        .post('/api/auth')
        .set('Accept', 'application/json')
        .set('Authorization', 'Basic ' + cacheObject.basicAuthCodeUser)
      expect(res.status).to.equal(401)
    })
  })

  describe('User want to confirm his email with him token to active the account.', function () {
    it('Expecting cache user email, equals saved email. Also the activation service at /api/users/validateUser must return 200', async () => {
      const getUserByTokenRequest = await request(app)
        .get('/api/users/get_user_by_token/' + cacheObject.activation_token)
        .set('Accept', 'application/json')
        .set('Authorization', 'Basic ' + cacheObject.masterBasicAuthKey)

      expect(getUserByTokenRequest.body.email).to.equal(cacheObject.initialFrontData.email)

      const requestBody = {
        activation_token: cacheObject.activation_token
      }
      const res = await fetchApp
        .post('/api/users/validateUser')
        .send(requestBody)
        .set('Accept', 'application/json')
        .set('Authorization', 'Basic ' + cacheObject.masterBasicAuthKey)
      cacheObject.savedUser.is_active = true
      expect(res.status).to.equal(200)
    })
  })

  describe('User did active the account, so now tries to log in', function () {
    it('Login let activated users to get a token and an auth code repsonse 201 POST - /api/auth/', async () => {
      let res = await fetchApp
        .post('/api/auth')
        .set('Accept', 'application/json')
        .set('Authorization', 'Basic ' + cacheObject.basicAuthCodeUser)
      expect(res.status).to.equal(201)
      cacheObject.jwtToken = res.body.token
    })
  })

  describe('User has an activated account on Page, but he forgot his password', function () {
    it('User must get an rest_token from POST - /api/passwordresets', async () => {
      const passwordreset = {
        email: cacheObject.initialFrontData.email,
        link: cacheObject.initialFrontData.link
      }

      const res = await request(app)
        .post('/api/passwordresets')
        .send(passwordreset)
        .set('Accept', 'application/json')
        .set('Authorization', 'Basic ' + cacheObject.masterBasicAuthKey)
      expect(res.status).to.equal(200)
      expect(res.body).to.have.property('newPasswordReset')
      expect(res.body).to.have.property('msj')
      cacheObject.rest_token = res.body.newPasswordReset.rest_token
    })

    it('With rest_token and new password user changes his password at PUT - /api/passwordresets', async () => {
      const passwordreset = {
        email: cacheObject.initialFrontData.email,
        password: cacheObject.initialFrontData.my_new_password
      }

      const res = await request(app)
        .put('/api/passwordresets/' + cacheObject.rest_token)
        .send(passwordreset)
        .set('Accept', 'application/json')
        .set('Authorization', 'Basic cHJvcGxhbm5lcnYyOlNwNzBKZ2M4a29mOTA0djdtelRlUXQxdlFvd0JzWkVm')

      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('updatedAt')
    })
  })

  describe('Cache object', function () {
    it('#TEST SUITE FINISHED SUCCESFULLY', async () => {
      delete cacheObject.initialFrontData
      console.log(cacheObject)
    })
  })
})
