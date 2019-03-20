const express = require('express')
const mongoose = require('mongoose')

const app = express()


app.get('/', (req, res) => {
    res.send('it works')
})









PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is up and running on ${PORT}`)
})