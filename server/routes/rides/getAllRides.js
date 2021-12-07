const express = require('express')
const router = express.Router()
const Trip = require('../../database/Model/Trip')

router.get('/all-rides', (req, res) => {
   
    Trip.find({})
        .populate('creator')
        .then(trips => {
            res.status(200).send(JSON.stringify({
                message: 'Successfully got all the rides',
                data: trips
            }))
        })
        .catch(err => {
            console.log('Error with getting all of the trips', err)
        })
})

module.exports = router