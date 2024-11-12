// importing express package as express
const express = require('express')
require('dotenv').config();           // we have to import dotenv as require('dotenv').config()
const workoutroutes = require('./routes/workouts')
const userroutes = require('./routes/user')
const mongoose = require('mongoose')

// building the app using express
const app = express();

//middlewares

app.use(express.json()); 
// express.json() is a built-in middleware function in Express. It parses incoming requests with JSON 
// payloads and is based on body-parser.

// Returns middleware that only parses JSON and only looks at requests where the Content-Type header
// matches the type option.  

// A new 'body' object containing the parsed data is populated on the request object after the middleware
// (i.e. req.body), or an empty object ({}) if there was no body to parse, the Content-Type was not
// matched, or an error occurred.

app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

// routes
app.use("/api/workouts", workoutroutes)
app.use("/api/user", userroutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log("Connected to db & Listening on ", process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error);
    })
