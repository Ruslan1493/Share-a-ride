const express = require('express')
const router = express.Router()
const User = require('../../../database/Model/User')

router.post('/register/confirm', async (req, res) => {
    const { id } = req.body

    await User.findByIdAndUpdate(id, {registered: true})
        .then(async user => {
            if (user === null) {
                res.status(404).send({ message: 'User not found' })
                return
            }
            if (user.registered) {
                res.status(408).send({ message: 'The user session has expired' })
                return
            }
            // const updatedUser = new User({ registered: true, ...user })
            // console.log("user:")
            // console.log(user)
            // console.log("updatedUser:")
            // console.log(updatedUser)
            await user
                .save()
                .then(user => {
                    console.log(user)
                    res.status(200).send(JSON.stringify({
                        data: {
                            message: `${user.username} successfully registered!`,
                            user
                        }
                    }))
                })
                .catch(err => {
                    console.log('Error with user saving: ', err)
                })
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router