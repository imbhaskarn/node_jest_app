require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const api = require('./routes/api')

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
//database connection
console.log(process.env.MONGO_DB_URI)
mongoose.connect(process.env.MONGO_DB_URI || 'mongodb://localhost:27017/myapp', (err, data) => {
    if (!err) {
        return console.log('connected to database!')
    }
    console.log(err)
})

app.use('/api', api)
app.listen(process.env.PORT || 4000, () => {
    console.log("server running...")
})