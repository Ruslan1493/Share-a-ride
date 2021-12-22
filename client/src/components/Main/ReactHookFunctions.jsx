import React from 'react'
import { useJwt } from 'react-jwt'
import cookie from 'react-cookies'
import jsonwebtoken from 'jsonwebtoken'
// import { createToken } from './ReactHookFunctions'
import Notifications, { notify } from 'react-notify-toast'

export const createToken = (userCookie) => {
    const secret = '123'
    const token = jsonwebtoken.sign(userCookie, secret)
    return token
}

export const GetDecodedCookie = (userCookie) => {
    const { decodedToken, isExpired } = useJwt(userCookie)
    return decodedToken
}

export const getHook = (Component) => {
    const userCookie = cookie.load('user_data')
    return (props) => {
        const { decodedToken, isExpired } = useJwt(userCookie)
        return <Component decodedToken={decodedToken} {...props} />
    }
}

export const checkUserData = (e, isRegister) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    let repeatPass = ''
    let email = ''
    if (isRegister) {
        repeatPass = e.target.repeatPass.value
        email = e.target.email.value
        if (email.length < 4) {
            notify.show('Email should be valid', 'error')
            return
        }
        if (password !== repeatPass) {
            notify.show('Both passwords should match', 'error')
            return
        }
    }

    if (username.length < 4) {
        notify.show('Username should be atleast 4 symbols long', 'error')
        return
    }

    if (password.length < 4) {
        notify.show('Password is less than 4', 'error')
        return
    }
}

// export default GetDecodedCookie