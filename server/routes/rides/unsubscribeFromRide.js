const express = require('express')
const router = express.Router()
let Trip = require('../../database/Model/Trip')

router.patch('/:id', async(req, res) => {
    const id = req.params.id
    const { userId } = req.body

    let trip = await Trip.findById(id)
    if (!trip.passengers.includes(userId)) {
        res.status(400).send(JSON.stringify({
            error: true,
            data: trip,
            message: 'you are alreay unsigned from that trip'
        }))
        return
    }
    console.log(trip.passengers.indexOf(userId))
    let userIndex = trip.passengers.indexOf(userId)
    trip.passengers.splice(userIndex, 1)
    console.log(trip.passengers)
    await trip.save()
    res.status(200).send(JSON.stringify({
        error: false,
        data: trip,
        message: 'successfully unsigned'
    }))
})

module.exports = router