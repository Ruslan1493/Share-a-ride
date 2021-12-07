import React from 'react'
import cookie from 'react-cookies'
import { createToken } from '../Main/ReactHookFunctions'

function Check (props){

const userCookie = cookie.load('user_data')
console.log('check user cookie: ', userCookie)
const data = createToken(userCookie)
cookie.save('user_data', data)
console.log('data ', data)
    return (
        <div></div>
    )
}

export default Check