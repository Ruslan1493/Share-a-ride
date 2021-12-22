const express = require('express')
const router = express.Router()
const Trip = require('../../database/Model/Trip')

router.get('/all-rides', async(req, res) => {
   
    Trip.find({})
        .populate('creator')
        .then(trips => {
            trips = trips.filter(async trip => {
                const year = trip.date.split('/')[2]
                const month = Number(trip.date.split('/')[1]) - 1
                const day = trip.date.split('/')[0]
                const tripDate = new Date(year, month, day)

                let currentYear = new Date().getFullYear()
                let currentMonth = new Date().getMonth()
                let currentDay = new Date().getDate()
                let dateNow = new Date(currentYear, currentMonth, currentDay)
                if(dateNow > tripDate){
                    trip.tripPassed = true
                    await trip.save()
                }
                return dateNow > tripDate ? null : trip
            })
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