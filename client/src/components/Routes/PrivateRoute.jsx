import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const PrivateRoute = ({ component: Component, isLoggedIn, userId, ...rest }) => {
    // console.log('isLoggedIn')
    // console.log(isLoggedIn)
    // console.log('isUserId')
    // console.log(userId)
    return (
        <Route
            {...rest}
            render={props => (
                isLoggedIn ? <Component {...props} userId={userId} /> : <Redirect to='/user/login' />)
            }
        />
    )
}

export default PrivateRoute