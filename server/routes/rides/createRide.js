const express = require('express')
const router = express.Router()
const Trip = require('../../database/Model/Trip')

router.post('/create-a-ride', async (req, res) => {
    const body = req.body
    console.log(body)
    const {
        cityFrom,
        cityTo,
        date,
        carCapacity,
        numberOfStops,
        creator} = req.body

    await Trip.create({
        cityFrom,
        cityTo,
        date,
        carCapacity,
        numberOfStops,
        creator
    })
        .then(data => {
            res.status(200).send(JSON.stringify({ message: 'ride successfully created', data }))
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router