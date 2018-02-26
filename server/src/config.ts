import * as session from 'express-session'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as passport from 'passport'

import { Server } from 'http'
import { resolve } from 'path'
import { Express } from 'express-serve-static-core'

export default function() {
  const app = express()
  const server = new Server(app)

  const baseDir = resolve(__dirname + '/../../')
  const clientDir = resolve(__dirname + '/../../client')

  app.set('views', clientDir)
  app.set('view engine', 'html')

  app.get(/node_modules/, (req, res) => res.sendFile(baseDir + req.path))
  app.get(/client/, (req, res) => res.sendFile(baseDir + req.path))

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded())
  app.use(session({ secret: '4AOyx5imrFsTPehmtBGqsHvHfwzUZhKtTB1JA9wuRkl3a/8nZ' }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  return { app, server }
}
