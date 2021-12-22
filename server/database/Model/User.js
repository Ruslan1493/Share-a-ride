const mongoose = require('mongoose')

// user: '',
// rating: 0,
// age: null,
// telephone: null,
// gender: null,
// registered: null,
// numberOfTrips: 0,
// numberOfDrives: 0

const Schema = mongoose.Schema({
    username: mongoose.SchemaTypes.String,
    email: mongoose.SchemaTypes.String,
    password: mongoose.SchemaTypes.String,
    rating: { type: mongoose.SchemaTypes.Decimal128, default: 0 },
    age: { type: mongoose.SchemaTypes.Number, default: null },
    telephone: { type: mongoose.SchemaTypes.String, default: null },
    gender: { type: mongoose.SchemaTypes.String, default: null },
    // registered: { type: mongoose.SchemaTypes.Boolean, default: false },
    numberOfTrips: { type: mongoose.SchemaTypes.Number, default: 0 },
    numberOfDrives: { type: mongoose.SchemaTypes.Number, default: 0 },
    lastModifiedDate: { type: mongoose.SchemaTypes.Date, default: Date.now },
    madeTrips: [{ type: mongoose.SchemaTypes.ObjectId, default: [] }],
})

const User = new mongoose.model('User', Schema)

User.seedAdmin = async () => {
    await User.findOne({ username: 'Admin' })
        .then(async user => {
            if (user === null) {
                await User.create({
                    name: 'Admin'
                })
                    .then(() => {
                        console.log('Admin created!')
                    })
                    .catch(err => {
                        console.log('Something went wrong with the admin creation: ', err)
                    })
            }
        })
        .catch(err => {
            console.log('Something went wrong with the model: ', err)
        })
}

module.exports = User