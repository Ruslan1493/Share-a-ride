import React from 'react'
import { withRouter } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { notify } from 'react-notify-toast'
import { createToken } from '../../Main/ReactHookFunctions'
import cookie from 'react-cookies'

function ConfirmRegister(props) {
    console.log('ConfirmRegister:')
    const { id } = useParams()
    // console.log(id)
    console.log("this.props confirm register:")
    console.log(props)
    fetch('http://localhost:4000/user/register/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id})
    })
    .then(data => data.json())
    .then(userData => {
        notify.show(userData.data.message, 'success')
        const token = createToken(userData)
        cookie.save('user_data', token)
        props.signInUser(userData.data.user)
        console.log(userData.user)
        props.history.push('/app/create-a-ride')
    })
    .catch(err => {
        console.error('something happened duriung conf reg:')
        console.error(err)
    })
    return(
        <span>User successfully created</span>
    )
}

export default withRouter(ConfirmRegister)