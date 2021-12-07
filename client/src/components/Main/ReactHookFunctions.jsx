import React from 'react'
import { useJwt } from 'react-jwt'
import cookie from 'react-cookies'
import jsonwebtoken from 'jsonwebtoken'

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
    return(props) => {
        const { decodedToken, isExpired } = useJwt(userCookie)
        return <Component decodedToken={decodedToken} {...props}/>
    }
}

// export default GetDecodedCookie