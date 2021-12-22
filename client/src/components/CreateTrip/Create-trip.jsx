import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import Notifications, { notify } from 'react-notify-toast'
import style from './Create-trip.module.scss'
import { DateErrorHandler } from '../Error-handler/Error-handler'
import { createFormErrorHandler } from '../Error-handler/Error-handler' 
import SecondPage from './SecondPage'
import FirstPage from './FirstPage'
import { createARide } from '../../services/api'

class CreateTrip extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            isFirstPage: true,
            date: '',
            cityFrom: '',
            cityTo: '',
            errorH: new DateErrorHandler(),
            hasError: false,
            errorMessage: '',
            userId: null
        }
        this.createFirstPageTripFunc = this.createFirstPageTripFunc.bind(this)
        this.createSecondPageTripFunc = this.createSecondPageTripFunc.bind(this)
        this.onChangeValue = this.onChangeValue.bind(this)
        this.hasDateInputError = this.hasDateInputError.bind(this)
    }

    componentDidMount() {
        console.log(this.props)
        this.setState({
            userId: this.props.userId
        })
    }

    createFirstPageTripFunc(e, cityFrom, cityTo, date) {
        e.preventDefault();
        console.log('DATE', date)
        if (this.state.hasError) {
            notify.show(this.state.errorMessage, 'error')
        } else {
            const currentUserId = this.props.userId
            if (currentUserId === null) {
                return <Redirect to='/' />
            }
            createFormErrorHandler(this, notify, cityFrom, cityTo, date)
        }
    }

    createSecondPageTripFunc(e) {
        e.preventDefault()

        const carCapacity = e.target.carCapacity.value
        const numberOfStops = e.target.numberOfStops.value
        const creator = this.state.userId
        console.log('ride creation! - ID:', creator)
        const {
            cityFrom,
            cityTo,
            date
        } = this.state
        console.log('DATE:')
        console.log(date)
        createARide(cityFrom, cityTo, date, carCapacity, numberOfStops, creator)
            .then(data => {
                notify.show(data.message, 'success')
                console.log('created ride!')
                console.log(this.props)
                this.props.updateRides()
                this.props.history.push('/')
            })
            .catch(err => {
                console.log('Error with creating the ride ', err)
            })
    }

    hasDateInputError(hasError, errorMessage) {
        if (hasError) {
            this.setState({ hasError, errorMessage })
        }
    }

    onChangeValue(e) {
        e.preventDefault()
        const name = e.target.name
        const val = e.target.value
        this.setState({
            [name]: val
        })
    }

    render() {
        return (
            <section>
                <article>
                    <h1>Create a ride</h1>
                    {
                        !this.state.isFirstPage
                            ?
                            <SecondPage createTripFunc={this.createSecondPageTripFunc} />
                            :
                            <FirstPage
                                createFirstPageTripFunc={this.createFirstPageTripFunc}
                                hasDateInputError={this.hasDateInputError}
                            />
                    }
                </article >
            </section >
        )
    }
}

export default withRouter(CreateTrip)