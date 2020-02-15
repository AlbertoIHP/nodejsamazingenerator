/* eslint-disable prefer-const */
import request from 'supertest'
import { expect } from 'chai'
import app from '../src/app'
import models from '../src/services/sequelize'
import config from '../src/config'


const fetchApp = request(app)
let cacheObject = {
    users: {
        email: 'myemail@email.com',
        password: 'asdasdasd',
        role: 'admin',
        name: 'user',
        link: 'https://myfrontdomain.mytld/confirmation/'
    },
    masterBasicAuthKey: Buffer.from('myprojectname:mymasterkey').toString('base64'),
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
        try {
            models.sequelize.sync({ force: true, logging: false }).then(() => {
                console.log('[SUCCESS] DATABASE HAS BEEN SYNC (UPDATED)')
                models.user.destroy({
                    where: {},
                    truncate: false
                })
                done()
            });
        } catch (err) {
            console.log(err)
        }
    })

    describe('User register at page', function () {
        it('Registering user, getting code 200, new property on object user. On cache as savedUser attribute', async () => {
            let res = await fetchApp
                .post('/api/users')
                .send(cacheObject.users)
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

            expect(getUserByTokenRequest.body.email).to.equal(cacheObject.users.email)

            const requestBody = {
                activation_token: cacheObject.activation_token
            }
            const res = await fetchApp
                .post('/api/users/validateUser')
                .send(requestBody)
                .set('Accept', 'application/json')
                .set('Authorization', 'Basic ' + cacheObject.masterBasicAuthKey)
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




    describe('Cache object', function () {
        it('#TEST SUITE FINISHED SUCCESFULLY', async () => {
            console.log(cacheObject)
        })
    })
})
