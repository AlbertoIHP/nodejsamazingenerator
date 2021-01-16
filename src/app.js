
import http from 'http'
import config from './config'
import express from './services/express'
import api from './api'
import cluster from 'cluster'
import os from 'os'
const numCPUs = os.cpus().length;
/*
import https from 'https'
import fs from 'fs'
import path from 'path'
const key = fs.readFileSync(path.resolve(__dirname, './key.pem'));
const cert = fs.readFileSync(path.resolve(__dirname, './cert.pem'));
const options = {
    key: key,
    cert: cert
};
const server = https.createServer(options, app)
*/
let app

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    app = express(config.apiRoot, api)
    const server = http.createServer(app)
    setImmediate(() => {
        server.listen(config.port, config.ip, () => {
            console.log('Express server listening on http://%s:%d, in %s mode', config.ip, config.port, config.env)
        })
    })

    console.log(`Worker ${process.pid} started`);
}

export default app
