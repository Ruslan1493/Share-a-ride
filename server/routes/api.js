const express = require('express')
const path = require('path')
const router = express.Router()
const getAllRides = require('./rides/getAllRides')
const rideDetails = require('./rides/rideDetails')
const createRide = require('./rides/createRide')
const editRide = require('./rides/editRide')
const joinRide = require('./rides/joinRide')
const unsubscribeFromRide = require('./rides/unsubscribeFromRide')

router.get('/all-rides', getAllRides)
router.use('/ride-details', rideDetails)
router.post('/create-a-ride', createRide)
router.use('/edit-ride', editRide)
router.use('/join-a-ride', joinRide)
router.use('/unsubscribe-from-ride', unsubscribeFromRide)

module.exports = router