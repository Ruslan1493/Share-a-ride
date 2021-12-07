import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt} from '@fortawesome/free-solid-svg-icons'
import style from './Login.module.scss'

class Login extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={style.loginWrapper}>
                <FontAwesomeIcon icon={faSignInAlt} className={style.iconSign} /><h1>Login</h1>
                <form className={style.loginForm} method='POST' onSubmit={(e) => this.props.loginUser(e, false)}>
                    <div className={style.inputWrapper}>
                        <span>Username</span>
                        <input type='text' name='username' />
                    </div>
                    <div className={style.inputWrapper}>
                        <span>Password</span>
                        <input type='password' name='password' />
                    </div>
                    <button>Login</button>
                </form>
            </div>
        )
    }
}

export default Login