// Server setup
const express = require('express')
const app = express()
const path = require('path')
const api = require('./server/routes/api')
let bodyParser = require('body-parser')

// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mongoose-expense', { useNewUrlParser: true })

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api);

const port = 2000
app.listen(port, function () {
    console.log(`Running on port ${port} :)`)
})
