import http from 'http'
import config from './config'
import express from './services/express'
import api from './api'

const app = express(config.apiRoot, api)
const server = http.createServer(app)

setImmediate(() => {
  server.listen(config.port, config.ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', config.ip, config.port, config.env)
  })
})

export default app
