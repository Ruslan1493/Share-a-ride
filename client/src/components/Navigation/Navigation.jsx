import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from './Navigation.module.scss'

class Navigation extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        console.log('in navigation menu')
        console.log(this.props.user)
    }
    render() {
        return (
            <nav className={style.navigation}>
                <Link to='/' className={style.link}>Home</Link>
                {/* <Link to='/about' className={style.link}>About</Link> */}
                <Link to='/app/create-a-ride' className={style.link}>Create a ride</Link>
                {
                    !this.props.user
                        ?
                        (
                            <span>
                                <Link to='/user/login' className={style.link}>Login</Link>
                                <Link to='/user/register' className={style.link}>Register</Link>
                            </span>
                        )
                        :
                        <span>
                            <Link to='/user/profile' className={style.link}>Profile</Link>
                            <span className={style.logout} onClick={(e) => this.props.logout(e)}>Logout</span>
                            <span className={style.welcome}> Welcome, {this.props.user}</span>
                        </span>
                }
            </nav>
        )
    }
}

export default Navigation