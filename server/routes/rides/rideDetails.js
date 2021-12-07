const express = require('express')
const router = express.Router()
const Trip = require('../../database/Model/Trip')

router.get('/:id', (req, res) => {
    const id = req.params.id
    Trip.findById(id)
        .populate('creator')
        .populate('passengers')
        .then(trip => {
            res.status(200).send(JSON.stringify({
                message: 'Successfully got the ride',
                data: trip
            }))
        })
        .catch(err => {
            console.log('Error with getting the trip', err)
        })
})

module.exports = router