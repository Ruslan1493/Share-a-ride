import React, { Component } from 'react'
import style from './Register.module.scss'

class Register extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={style.loginWrapper}>
                <h1>Register</h1>
                <form className={style.loginForm} method='POST' onSubmit={(e) => this.props.loginUser(e, true)}>
                    <div className={style.inputWrapper}>
                        { console.log(this.props.formErrors) }
                        {
                            this.props.formErrors.length > 0
                                ?
                                <span className={style.formError}>{this.props.formErrors}</span>
                                :
                                null
                        }
                        <span>Username</span>
                        <input type='text' name='username' />
                    </div>
                    <div className={style.inputWrapper}>
                        <span>Email</span>
                        <input type='email' name='email' />
                    </div>
                    <div className={style.inputWrapper}>
                        <span>Password</span>
                        <input type='password' name='password' />
                    </div>
                    <div className={style.inputWrapper}>
                        <span>Repeat password</span>
                        <input type='password' name='repeatPass' />
                    </div>
                    <button>Register</button>
                </form>
            </div>
        )
    }
}

export default Register