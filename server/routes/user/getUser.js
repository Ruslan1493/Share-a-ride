const express = require('express')
const router = express.Router()
const User = require('../../database/Model/User')

router.get('/:id', async (req, res) => {
    const id = req.params.id
    await User.findById(id)
        .then(user => {
            res.status(200).send(JSON.stringify({
                data: {
                    message: `Welcome, ${user.username}`,
                    username: user.username,
                    email: user.email,
                    id: user._id
                }
            }))
        })
        .catch(err => {
            res.status(400).send(JSON.stringify({ errors: 'User not found' }))
        })
})

module.exports = router