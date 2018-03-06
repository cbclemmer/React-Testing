import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as session from 'express-session'
import * as mongo from 'mongodb'
import * as passport from 'passport'

import { Server } from 'http'
import { resolve } from 'path'

import Procedures from './procedures'
import routes from './routes'
import auth from './auth'
import config from './config'

const clientDir = resolve(__dirname + '/../../client')
const mongoClient = mongo.MongoClient
const { app, server } = config()

const main = async () => {
  try {
    const client = await mongoClient.connect('mongodb://localhost:27017')
    const db: mongo.Db = client.db('twitter')

    const procedures = new Procedures(db)
    auth(procedures)
    routes(app, procedures)

    app.get(/\/.*/, (req, res) => res.sendFile(clientDir + '/index.html'))

    server.listen(8080)
    console.log('Server started on port 8080')
  } catch (err) {
    console.log(err)
  }
}

main()
