const express = require('express')
const router = express.Router()
let Trip = require('../../database/Model/Trip')

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { userId } = req.body

    let trip = await Trip.findById(id)
    console.log(trip.passengers)
    if (trip.passengers.includes(userId)) {
        res.status(400).send(JSON.stringify({
            error: true,
            data: trip,
            message: 'you are alreay signed for that trip'
        }))
        return
    }
    trip.passengers.push(userId)
    await trip.save()
    res.status(200).send(JSON.stringify({
        error: false,
        data: trip,
        message: 'successfully signed'
    }))
})

module.exports = router