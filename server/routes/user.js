const express = require('express')
const router = express.Router()
const register = require('./user/register/register')
const confirmRegister = require('./user/register/confirmRegister')
const login = require('./user/login')
const getUser = require('./user/getUser')

router.post('/register/confirm', confirmRegister)
router.post('/register', register)
router.post('/login', login)
router.get('/:id', getUser)

module.exports = router


// router.post('/:loggingParams', (req, res) => {
//     if(req.params.loggingParams === 'register'){
//         console.log('Logging...')
//         console.log(req.params.loggingParams)

//     }else if(req.params.loggingParams === 'login'){
//         console.log('Logging...')
//         console.log(req.params.loggingParams)
//     }else{
//         res.send(JSON.stringify('Soory not found!'))
//     }
//     // const { username, password, email } = req.body
//     // console.log('recieved')
//     // console.log(username)
//     // console.log(password)
//     // res.send(JSON.stringify('Logged!'))
// })



// module.exports = router