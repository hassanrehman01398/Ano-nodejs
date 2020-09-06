const express = require('express')

// use process.env variables to keep private variables,
// be sure to ignore the .env file in github
require('dotenv').config()

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests
const app=express()
app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined'


app.use(cors())
// var db = require('knex')({
  
//   client: 'pg',
  
// process.env.NODE_TLS_REJECT_UNAUTHORIZED "0";
//   connection: {
    
//     connectionString: "postgres://qzlxmsfcehahpz:2f538ded7e8115802d0570dcb4a0bdee06d3e6cfbf82f3d37e8ef3703f186471@ec2-52-23-86-208.compute-1.amazonaws.com:5432/ddu36ura7kra61",
//     // host : 'ec2-52-23-86-208.compute-1.amazonaws.com',
//     // user : 'qzlxmsfcehahpz',
//     // password : '2f538ded7e8115802d0570dcb4a0bdee06d3e6cfbf82f3d37e8ef3703f186471',
//     // database : 'ddu36ura7kra61',
//     // port: 5432,
//     ssl: true
    
//   }
// });
 const { Client } = require('pg');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const db = new Client({
  connectionString: "postgres://qzlxmsfcehahpz:2f538ded7e8115802d0570dcb4a0bdee06d3e6cfbf82f3d37e8ef3703f186471@ec2-52-23-86-208.compute-1.amazonaws.com:5432/ddu36ura7kra61",
  ssl: true,
});

db.connect();
 

// Controllers - aka, the db queries
const main = require('./controllers/main')

// App


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

// var server = app.listen(process.env.PORT || 5000, function () {
//   var port = server.address().port;
//   console.log("Express is working on port " + port);
// });
// App Server Connection
app.listen(process.env.PORT || 5000, () => {
  console.log(`app is running on port ${process.env.PORT || 5000}`)
})