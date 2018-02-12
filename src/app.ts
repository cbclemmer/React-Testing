import * as Promise from 'bluebird'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import { Server } from 'http'
import * as mongo from 'mongodb'
import { resolve } from 'path'
import routes from './routes'

const mongoClient = mongo.MongoClient

const app = express()
const server = new Server(app)

const baseDir = resolve(__dirname + '/../')
const clientDir = resolve(__dirname + '/../client')

app.set('views', clientDir)
app.set('view engine', 'html')

app.get(/node_modules/, (req, res) => res.sendFile(baseDir + req.path))
app.get(/client/, (req, res) => res.sendFile(baseDir + req.path))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get(/\/.*/, (req, res) => res.sendFile(clientDir + '/index.html'))

const p = new Promise((res, rej) => {
  mongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
      return rej(err)
    }
    res(client.db('twitter'))
  })
})

p
.then((db) => {
  routes(app, db)
  server.listen(8080)
  console.log('Server started on port 8080')
})
.catch((err) => console.log(err))
