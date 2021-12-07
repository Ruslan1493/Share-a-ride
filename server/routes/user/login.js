const express = require('express')
const router = express.Router()
const User = require('../../database/Model/User')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  await check('username')
    .isLength({ min: 1 })
    .withMessage("Message is required")
    .trim()
    .run(req)

  await check('password')
    .isLength({ min: 4 })
    .withMessage("Password should be atleast 4 characters long!")
    .run(req)

  const validationResults = validationResult(req)
  if (validationResults.isEmpty()) {
    await User.findOne({ username })
      .then(user => {
        console.log()
        if(!user){
          // the error message shoulg be the same as the invalid data as the user is not registered
          res.status(401).send(JSON.stringify({ errors: 'The entered user data is invalid, please register' }))
          return
        }
        const compare = bcrypt.compare(password, user.password)
        compare
          .then(equalPasswords => {
            console.log('pass: ', password)
            console.log('user.pass: ', user.pass)
            if (equalPasswords) {
              console.log('geerated pass: ', equalPasswords)
              res.status(200).send(JSON.stringify({
                data: {
                  message: `Welcome, ${user.username}`,
                  username: user.username,
                  email: user.email,
                  id: user._id
                }
              }))
              console.log(`Logging... the user was found: ${user}`)

            } else {
              res.status(401).send(JSON.stringify({ errors: 'The entered user data is invalid' }))
            }
          })
          .catch(err => {
            console.error(`The user doesnt exist: ${err}`)
          })
      })
      .catch(err => {
        console.error(`DB find User error: ${err}`)
      })
  } else {
    res.status(400).send(JSON.stringify({ errors: validationResults.array() }))
  }
})

module.exports = router