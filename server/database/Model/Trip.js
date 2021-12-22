const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    cityFrom: { type: mongoose.SchemaTypes.String, required: true },
    cityTo: { type: mongoose.SchemaTypes.String, required: true },
    date: { type: mongoose.SchemaTypes.String, required: true },
    carCapacity: { type: mongoose.SchemaTypes.Number, required: true },
    numberOfStops: { type: mongoose.SchemaTypes.Number, required: true },
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    tripPassed: { type: mongoose.SchemaTypes.Boolean, default: false },
    passengers: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User', default: [] }],
})

const Trip = new mongoose.model('Trip', Schema)

module.exports = Trip