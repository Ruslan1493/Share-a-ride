const express = require('express')
const router = express.Router()
const Trip = require('../../database/Model/Trip')

router.get('/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    Trip.find({ $or: [{ creator: id }, { passengers: { $in: [id] } }] })
        .populate('creator')
        .then(data => {
            console.log(data)
            res.status(200).send(JSON.stringify({
                message: 'Rides successfully loaded',
                data
            }))
        })
        .catch(err => {
            console.log('Error with getting users trips', err)
        })
})

module.exports = router