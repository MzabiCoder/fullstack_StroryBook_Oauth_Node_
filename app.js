const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')


// load User model

require('./Model/User')

// passport config 


require('./config/passport')(passport)


const app = express()

app.use(passport.initialize());
app.use(passport.session());

const auth = require('./routes/auth')

const db = require('./config/keys').mongoURI
//mongoose.Promise = global.Promise
mongoose.connect(db)
    .then(() => {
        console.log('mongodb connected')
    })
    .catch(err => console.log(`erros is ${err}`))


app.get('/', (req, res) => {
    res.send('it works')
})


app.use('/auth', auth)


PORT = 3000

app.listen(PORT, () => {
    console.log(`server is up and running on ${PORT}`)
})