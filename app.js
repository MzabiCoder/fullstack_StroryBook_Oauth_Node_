const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

// passport config 

require('./config/passport')(passport)


const app = express()

const auth = require('./routes/auth')


app.get('/', (req, res) => {
    res.send('it works')
})


app.use('/auth', auth)


PORT = 3000

app.listen(PORT, () => {
    console.log(`server is up and running on ${PORT}`)
})