const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
//var MongoClient = require('mongodb').MongoClient
const cookieParser = require('cookie-parser')
const session = require('express-session')

// load User model

require('./Model/User')

// passport config 


require('./config/passport')(passport)


const app = express()

app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))



app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
    res.locals.user = req.user || null
    next()
})

const auth = require('./routes/auth')

const db = require('./config/keys').mongoURI
mongoose.Promise = global.Promise
mongoose.connect(db)
    .then(() => {
        console.log('mongodb connected')
    })
    .catch(err => console.log(`erros is ${err}`))


app.get('/', (req, res) => {
    res.send('it works')
})

app.get('/verify', (req, res) => {

    if (req.user) {
        console.log(req.user)
    } else {
        console.log('Not Auth')
    }
})



app.use('/auth', auth)

PORT = 3000

app.listen(PORT, () => {
    console.log(`server is up and running on ${PORT}`)
})