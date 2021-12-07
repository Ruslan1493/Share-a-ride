const express = require('express')
const userRouter = require('./user')
const apiRouter = require('./api')

module.exports = (app) => {
    app.use('/user', userRouter)
    app.use('/api', apiRouter)
}