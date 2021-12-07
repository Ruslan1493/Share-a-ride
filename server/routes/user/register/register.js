const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator')
const User = require('../../../database/Model/User')
const nodemailer = require('nodemailer')
// const text = require('./email.html')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
  // username
  // email
  // password
  // repeatPass
  const { username, password, email } = req.body

  await check('username')
    .isLength({ min: 3 })
    .withMessage("Message is required")
    .trim()
    .run(req)

  console.log(req.body)

  await check('email')
    .isEmail()
    .withMessage("Invalid email entered!")
    .run(req)

  await check('password')
    .isLength({ min: 4 })
    .withMessage("Password should be atleast 4 characters long!")
    .run(req)

  await check('repeatPass')
    .isLength({ min: 4 })
    .withMessage("Password should be atleast 4 characters long!")
    .custom((val, { req }) => val === req.body.password)
    .withMessage("Passwords should match!")
    .run(req)

  const validationResults = validationResult(req)
  if (validationResults.isEmpty()) {

    const userData = await User.findOne({ username: username })
    if (userData) {
      res.status(400).send(JSON.stringify({ errors: 'The user already exists' }))
      return
    }

    const saltRounds = 10

    const salt = await bcrypt.genSalt(saltRounds)
    bcrypt.hash(password, salt)
      .then(async hashedPass => {

        const user = await User.create({
          username: req.body.username,
          email: req.body.email,
          password: hashedPass,
          registered: false,
        })
        // console.log(process.env.EMAIL)
        // console.log(process.env.WORD)

        //Transporter function for emails
        //   let transporter = nodemailer.createTransport({
        //     service: "gmail",
        //     auth: {
        //       user: process.env.EMAIL,
        //       pass: process.env.WORD,
        //     },
        //   })

        //   const mailOptions = {
        //     from: process.env.EMAIL, // sender address
        //     to: email, // This can also contain an array of emails
        //     subject: 'Thanks for registering on Car App!',
        //     // text: 'Hello world ?', // plaintext body
        //     html: `
        // <div 
        //     style="background-color: teal;
        //     color: white;
        //     width: 30%; 
        //     height: 100%;
        //     margin: 10px auto;
        //     text-align: center;
        //     border-radius: 5px;
        //     padding: 10px;
        //     padding-bottom: 30px;">
        //   <h1>Car App</h1>
        //   <p>Please click on the link below to finish your registration</p>
        //   <a href="http://localhost:3000/user/register/confirm_id=${user._id}" 
        //     style="display: inline;
        //     background-color: yellow;
        //     color: black;
        //     width: 100%;
        //     height: 100%;
        //     font-family: Sans-serif;
        //     text-transform: uppercase;
        //     text-decoration: none;
        //     padding: 10px;">Register</a>
        // </div>

        // `
        //     //
        //     //localhost:3000/user/register/${user._id}
        //   };
        //   transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //       return console.log(error);
        //     }
        //     // console.log('Message sent: ' + info.response);
        //   });
        res.send(JSON.stringify({
          data: {
            message: `${user.username} successfully registered!`,
            user
          }
        }))
      })
      .catch(hashPasswordErr => {
        console.log(hashPasswordErr)
      })
  } else {
    res.status(400).send(JSON.stringify({ errors: validationResults.array() }))
  }
})

module.exports = router