const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('./config/db.config')
require('dotenv').config()
const app = express()
const port = process.env.PORT
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose')


app.use(
    session({
      secret: 'my-secret-weapon',
      saveUninitialized: true,
      resave: true,
      cookie: {
        maxAge: 60 * 60 * 24 * 1000, //60 sec * 60 min * 24hrs = 1 day (in milliseconds)
      },
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        //time to live (in seconds)
        ttl: 60 * 60 * 24,
        autoRemove: 'disabled',
      }),
    })
);

//A library that helps us log the requests in the console
const logger = require('morgan');
app.use(logger('dev'));
  

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
    credentials: true, 
    origin: ['http://127.0.0.1:3000']
}))

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Use body parser. To be able parse post request information
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()) //crucial for post requests from client

const authRoutes = require('./routes/auth.routes')
app.use('/api', authRoutes);


app.listen(port, () => console.log(`Server LoRo running on port ${port}`))