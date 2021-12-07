const express = require('express')
const bodyParser = require('body-parser')
const PORT = 4000
const app = express()
const cors = require('cors')
const routes = require('./routes/index')
const db = require('./database/configure')
const User = require('./database/Model/User')
require('dotenv').config()

app.use(cors())
app.set('Access-Control-Allow-Origin', '*')
app.set('Access-Control-Allow-Methods', 'POST')
app.set('Access-Control-Allow-Methods', 'GET')
app.set('Access-Control-Allow-Headers', 'Content-Type')
app.set('Access-Control-Allow-Credentials', true)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(async(req,res, next) => {
//    await User.find({registered: false})
//    .select('lastModifiedDate')
//    .then(users => {
//     //    console.log(users)
        
//    })
//     //{ "lastModifiedDate": 1 }, { expireAfterSeconds: 10600 } 
//     next()
// })

routes(app)

app.listen(PORT, () => {
    db()
    console.log(`The app is running on port: ${PORT}`)
})
