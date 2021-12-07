const express = require('express')
const router = express.Router()
let Trip = require('../../database/Model/Trip')

router.patch('/:id', (req, res) => {
    const id = req.params.id
    console.log(req.params.id)
    const body = req.body
    Trip.findByIdAndUpdate(id, body, { new: true })
        .then(trip => {

            console.log(trip)
            res.send(JSON.stringify({
                data: trip,
                message: 'successfully updated'
            }))
        })
        .catch(err => {
            console.log('Update error: ', err)
        })

})

module.exports = router