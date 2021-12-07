import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import Notifications, { notify } from 'react-notify-toast'
// import Calendar from '../Calendar/Custom-calendar'
import style from './Create-trip.module.scss'
import { DateErrorHandler } from '../Error-handler/Error-handler'
import { createFormErrorHandler } from '../Error-handler/Error-handler' 
import SecondPage from './SecondPage'
import FirstPage from './FirstPage'

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
        // this.saveDate = this.saveDate.bind(this)
        this.createFirstPageTripFunc = this.createFirstPageTripFunc.bind(this)
        this.createTripFunc = this.createTripFunc.bind(this)
        this.onChangeValue = this.onChangeValue.bind(this)
        this.hasDateInputError = this.hasDateInputError.bind(this)
        // this.createFormErrorHandler = this.createFormErrorHandler.bind(this)
    }

    componentDidMount() {
        console.log('CREATE FUND PROPS: ', this.props)
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

    createTripFunc(e) {
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
        fetch('http://localhost:4000/api/create-a-ride', {
            method: 'POST',
            body: JSON.stringify({
                cityFrom,
                cityTo,
                date,
                carCapacity,
                numberOfStops,
                creator
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(data => {
                notify.show(data.message, 'success')
                console.log('created ride!')
                console.log(data)
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
                            <SecondPage createTripFunc={this.createTripFunc} />
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