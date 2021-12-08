import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Notifications, { notify } from 'react-notify-toast'
import Theme from '../Theme/Theme'
import { createToken } from './ReactHookFunctions'
import { getHook } from './ReactHookFunctions'
import cookie from 'react-cookies'
import CreateTrip from '../CreateTrip/Create-trip'
import PrivateRoute from '../Routes/PrivateRoute'
import Login from '../User/Login/Login'
import Register from '../User/Register/Register'
import User from '../User/User'
import style from './Main.module.scss'
import ConfirmRegister from '../User/Confirm Register/ConfirmRegister'
import SecondPage from '../CreateTrip/SecondPage'
import Details from '../Details/Details';
import { getAllRides } from '../../services/api'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formErrors: [],
            userCookie: null,
            userId: null,
            rides: []
        }
        this.loginUser = this.loginUser.bind(this)
        this.updateRides = this.updateRides.bind(this)
    }

    componentDidMount() {
        console.log('MAIN USER ID _ ', this.state.userId)
        console.log(this.props.userId)
        const userCookie = cookie.load('user_data')
        getAllRides()
            .then(res => {
                let rides = res.data
                this.setState({ ...this.state, rides })

                console.log(this.state.rides)
            })
            .catch(err => {
                console.log('Couldnt get all the rides - ', err)
            })
        this.setState({
            ...this.state,
            formErrors: [],
            userCookie: userCookie
        })



    }

    static getDerivedStateFromProps(props, state) {
        console.log('MAIN getDerivedStateFromProps')
        console.log(props.userId)
        // console.log(state)
        state.userId = props.userId

        return state.userId
    }

    loginUser(e, isRegister) {
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


        console.log('is reg', isRegister)

        fetch(`http://localhost:4000/user/${isRegister ? 'register' : 'login'} `, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: isRegister
                ?
                JSON.stringify({
                    username: e.target.username.value,
                    email: e.target.email.value,
                    password: e.target.password.value,
                    repeatPass: e.target.repeatPass.value
                })
                :
                JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                })
        })
            .then(data => data.json())
            .then(userData => {
                if (userData.errors) {
                    console.log("Error, ", userData.errors)
                    notify.show(userData.errors, 'error')
                    this.setState({
                        formErrors: [userData.errors]
                    })
                } else {
                    this.setState({
                        formErrors: []
                    })
                    console.log(userData)
                    notify.show(userData.data.message, 'success')
                    const token = createToken(userData)
                    cookie.save('user_data', token)
                    this.props.signInUser(userData.data.username, userData.data.id)
                    this.setState({ userId: userData.data.id })
                    console.log('fron end result: ', userData)
                    this.props.history.push('/app/create-a-ride')
                }
            })
            .catch(err => {
                notify.show('Couldnt sign in user', 'error')
                console.log(err)
            })
    }

    updateRides() {
        getAllRides()
            .then(res => {
                let rides = res.data
                this.setState({ ...this.state, rides })

                console.log(this.state.rides)
            })
            .catch(err => {
                notify.show('Couldnt get all the rides', 'error')
                console.log('Couldnt get all the rides - ', err)
            })
    }

    render() {
        return (
            <div className={style.body}>
                <Notifications options={{ top: '50px', transition: 3 }} />
                <Switch>
                    <Route exact path='/' render={() => <Theme rides={this.state.rides} userId={this.state.userId} />} />
                    <Route path='/app/create-a-ride/confirm' render={() => <SecondPage />} />
                    <Route path='/app/details/:id' render={() => <Details userId={this.state.userId} user={this.props.user} updateRides={this.updateRides} />} />
                    <PrivateRoute component={CreateTrip} userId={this.state.userId} isLoggedIn={this.state.userId} path='/app/create-a-ride' />
                    <Route path='/user/login' render={() => <Login loginUser={this.loginUser} formErrors={this.state.formErrors} />} />
                    <Route path='/user/register' exact render={() => <Register loginUser={this.loginUser} formErrors={this.state.formErrors} />} />
                    <Route path='/user/register/confirm_id=:id' render={() => <ConfirmRegister signInUser={this.props.signInUser} />} />
                    <PrivateRoute component={User} isLoggedIn={this.state.userId} path='/user/profile' />
                </Switch>
            </div>
        )
    }
}

// importing withRouter to be able to use history and redirect
// using getHook to be able to decode the cookie
export default withRouter(getHook(Main))