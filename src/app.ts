import * as express from 'express'
import { Server } from 'http'
import { resolve } from 'path'

const app = express()
const server = new Server(app)

const baseDir = resolve(__dirname + '/../')
const clientDir = resolve(__dirname + '/../client')

app.set('views', clientDir)
app.set('view engine', 'html')

app.get(/node_modules/, (req, res) => res.sendFile(baseDir + req.path))
app.get(/client/, (req, res) => res.sendFile(baseDir + req.path))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', (req, res) => res.sendFile(clientDir + '/index.html'))

server.listen(8080)
console.log('Server started on port 8080')
