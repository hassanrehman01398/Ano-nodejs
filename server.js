const express = require('express')

// use process.env variables to keep private variables,
// be sure to ignore the .env file in github
require('dotenv').config()

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests

// db Connection w/ Heroku
// const db = require('knex')({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   }
// });

// db Connection w/ localhost
var db = require('knex')({
  client: 'pg',
  connection: {
    host : 'anonymous.postgres.database.azure.com',
    user : 'hassanrehman01398@anonymous',
    password : 'hassan01398=',
    database : 'ano_posting',
    port: 5432,
    ssl: true
    
  }
});

// Controllers - aka, the db queries
const main = require('./controllers/main')

// App
const app = express()

// App Middleware
const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined'

// App Routes - Auth
app.get('/', (req, res) => res.send('hello world'))
app.get('/crud', (req, res) => main.getTableData(req, res, db))

app.get('/count', (req, res) => main.getcountpostData(req, res, db))
app.get('/getmaxviews', (req, res) => main.getmaxview(req, res, db))
app.get('/getminviews', (req, res) => main.getminview(req, res, db))
app.get('/getnewest', (req, res) => main.getnewest(req, res, db))
app.get('/specificpostdata', (req, res) => main.getspecificpostData(req, res, db))

app.get('/specificreplydata', (req, res) => main.getspecificreplyData(req, res, db))
app.post('/crud', (req, res) => main.postTableData(req, res, db))
app.post('/reply', (req, res) => main.postreplyData(req, res, db))
app.put('/crud', (req, res) => main.putTableData(req, res, db))
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db))

// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
})