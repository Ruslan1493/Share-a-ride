import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import style from './App.module.scss'
import Navigation from './components/Navigation/Navigation'
import Main from './components/Main/Main'
import cookie from 'react-cookies'
import jwt from 'jsonwebtoken'
import { getUserInfo } from './services/api'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      userId: null,
      styleNav: style.AppHeader
    }

    this.signInUser = this.signInUser.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    if (!this.state.user && cookie.load('user_data')) {
      const cookieToken = jwt.decode(cookie.load('user_data'))
      console.log('cookieToken', cookieToken)
      if (cookieToken) {
        fetch('http://localhost:4000/user/' + cookieToken.data.id)
          .then(user => user.json())
          .then(user => {
            console.log('USER FETCT APP')
            console.log(user)
            this.setState({
              user: user.data.username,
              userId: user.data.id
            })
          })
          .catch(err => {
            console.log('Error getting user from DB ', err.message)
          })
      }
    }
    console.log('App mounted, userID: ', this.state.userId)
  }

  static getDerivedStateFromProps(props, state) {
    console.log('APP getDerivedStateFromProps')
    console.log(props)
    console.log(state)
    // state.userId = props.userId

    return null
}

  onScroll(e) {
    const element = e.target
    console.log(element.scrollHeight)
    console.log(element.scrollTop)
    console.log(element.clientHeight)
    if (element.scrollHeight - element.scrollTop <= element.clientHeight) {
      // do something at end of scroll
      console.log('yes')
      this.setState({
        ...this.state,
        styleNav: style.navChange
      })
    }
  }

  signInUser(username, userId) {
    this.setState({
      ...this.state,
      user: username,
      userId
    })
  }

  logout(e) {
    e.preventDefault()
    cookie.remove('user_data')
    this.setState({
      user: '',
      userId: null
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className={style.App} onScroll={(e) => this.onScroll(e)}>
          <header className={this.state.styleNav} >
            <Navigation user={this.state.user} logout={this.logout} />
          </header>
          <Main signInUser={this.signInUser} userId={this.state.userId}  user={this.state.user} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
