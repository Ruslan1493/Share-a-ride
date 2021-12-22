import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Notifications, { notify } from 'react-notify-toast'
import Theme from '../Theme/Theme'
import { createToken, checkUserData } from './ReactHookFunctions'
import { getHook } from './ReactHookFunctions'
import cookie from 'react-cookies'
import CreateTrip from '../CreateTrip/Create-trip'
import PrivateRoute from '../Routes/PrivateRoute'
import Login from '../User/Login/Login'
import Register from '../User/Register/Register'
import Profile from '../User/Profile'
import style from './Main.module.scss'
import ConfirmRegister from '../User/Confirm Register/ConfirmRegister'
import SecondPage from '../CreateTrip/SecondPage'
import Details from '../Details/Details';
import { getAllRides, signinUser } from '../../services/api'

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
        const userCookie = cookie.load('user_data')
        getAllRides()
            .then(res => {
                let rides = res.data
                rides = rides.filter(ride => !ride.tripPassed)
                this.setState({ ...this.state, rides })
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
        state.userId = props.userId
        return state.userId
    }

    loginUser(e, isRegister) {
        checkUserData(e, isRegister)

        signinUser(e, isRegister)
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
                    notify.show(userData.data.message, 'success')
                    const token = createToken(userData)
                    cookie.save('user_data', token)
                    this.props.signInUser(userData.data.username, userData.data.id)
                    this.setState({ userId: userData.data.id })
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
                    <PrivateRoute component={CreateTrip} userId={this.state.userId} isLoggedIn={this.state.userId} path='/app/create-a-ride' />
                    <Route path='/app/details/:id' render={() => <Details userId={this.state.userId} user={this.props.user} updateRides={this.updateRides} />} />
                    <Route path='/user/login' render={() => <Login loginUser={this.loginUser} formErrors={this.state.formErrors} />} />
                    <Route path='/user/register' exact render={() => <Register loginUser={this.loginUser} formErrors={this.state.formErrors} />} />
                    <PrivateRoute component={Profile} isLoggedIn={this.state.userId} userId={this.state.userId} path='/user/profile' />
                </Switch>
            </div>
        )
    }
}

// importing withRouter to be able to use history and redirect
// using getHook to be able to decode the cookie
export default withRouter(getHook(Main))