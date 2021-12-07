const express = require('express')
const router = express.Router()
let Trip = require('../../database/Model/Trip')

router.patch('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    res.status(200).send(JSON.stringify(body))
    // Trip.findByIdAndUpdate(id, body, { new: true })
    //     .then(trip => {
    //         res.status(200).send({
    //             data: trip,
    //             message: 'successfully updated'
    //         })
    //     })
    //     .catch(err => {
    //         console.log('Update error: ', err)
    //     })
})

module.exports = router