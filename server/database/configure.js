const mongoose = require('mongoose')
const User = require('./Model/User')

function connectDB() {
    const connectionStr = 'mongodb://localhost/car-proj'
    mongoose.connect(connectionStr,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err) => {
            if (err)
                console.log(`Connection error: ${err}`)
        })

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', () => {
        User.seedAdmin()
        console.log('Connected successfully!')
    })
}
module.exports = connectDB