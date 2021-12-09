import React, { useEffect, useState } from "react"
import { notify } from "react-notify-toast";
import { Redirect, useParams } from "react-router";
import { withRouter } from 'react-router-dom'
import { getDetailedRide, editRideInfo } from '../../services/api'
import { editFormErrorHandler } from "../Error-handler/Error-handler";
import style from './Details.module.scss'

const Details = (props) => {
    const id = useParams().id
    let [ride, setRide] = useState({})
    let [edit, setEdit] = useState(false)
    let [isCreator, setisOwner] = useState(false)
    let [creator, setCreator] = useState('')
    let [passengers, setPassengers] = useState([])
    let [editModeOn, setEditMode] = useState(false)
    let [profileValues, setProfilevalues] = useState({
        cityTo: '',
        cityFrom: '',
        date: '',
        carCapacity: '',
        numberOfStops: '',
    })
    let [inputValues, setInputvalues] = useState({
        cityTo: '',
        cityFrom: '',
        date: '',
        carCapacity: '',
        numberOfStops: '',
    })



    useEffect(() => {
        getDetailedRide(id)
            .then(res => {
                setCreator(res.data.creator)

                setRide(res.data)
                setPassengers(res.data.passengers)
                console.log('user ID: ', props.userId)
                console.log('res.data.creator._id: ', res.data.creator._id)
                setProfilevalues({
                    cityTo: res.data.cityTo,
                    cityFrom: res.data.cityFrom,
                    date: res.data.date,
                    carCapacity: res.data.carCapacity,
                    numberOfStops: res.data.numberOfStops,
                })
                if (props.userId === res.data.creator._id) {
                    setisOwner(true)
                }
            })
    }, [props.userId])

    useEffect((state) => {
        console.log('   use effect 2 ', state)
        console.log(inputValues)
    }, [inputValues])

    useEffect(() => {
        console.log('   passengers ')
        console.log(passengers)
    }, [passengers])

    function editDetailsHandler(e) {
        e.preventDefault()
        setInputvalues({
            cityTo: ride.cityTo,
            cityFrom: ride.cityFrom,
            date: ride.date,
            carCapacity: ride.carCapacity,
            numberOfStops: ride.numberOfStops,
        })
        setEditMode(true)
    }

    function onChangeHandler(e) {
        e.preventDefault()
        let valueName = e.target.name
        let newValue = e.target.value
        setInputvalues(state => {
            return { ...state, [valueName]: newValue }
        })
    }

    async function editSubmitHandler(e) {
        e.preventDefault()
        if (editFormErrorHandler(inputValues)) {
            return
        } else {
            await editRideInfo(inputValues, id)
                .then(res => {

                    setInputvalues({
                        cityTo: res.data.cityTo,
                        cityFrom: res.data.cityFrom,
                        date: res.data.date,
                        carCapacity: res.data.carCapacity,
                        numberOfStops: res.data.numberOfStops,
                    })
                    setProfilevalues({
                        cityTo: res.data.cityTo,
                        cityFrom: res.data.cityFrom,
                        date: res.data.date,
                        carCapacity: res.data.carCapacity,
                        numberOfStops: res.data.numberOfStops,
                    })

                    notify.show(res.message, 'success')
                    props.updateRides()
                    props.history.push('/')
                    console.log(res)
                })
        }
    }

    function joinARide(e) {
        e.preventDefault()
        const userId = props.userId
        fetch(`http://localhost:4000/api/join-a-ride/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        })
            .then(data => data.json())
            .then(res => {
                notify.show(res.message, res.error ? 'error' : 'success')
                let passengersCopy = passengers.reduce((newArray, passenger) => {
                    newArray.push(passenger);
                    return newArray;
                }, []);

                passengersCopy.push({
                    username: props.user,
                    _id: props.userId
                })

                setPassengers([...passengersCopy])

            })
            .catch(err => {
                console.log('Server error with ride update: ', err)
                notify.show('Server error with ride update: ', 'error')
            })
    }

    function unsubscribeFromRide(e) {
        e.preventDefault()
        const userId = props.userId
        fetch(`http://localhost:4000/api/unsubscribe-from-ride/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        })
            .then(data => data.json())
            .then(res => {
                console.log(res)
                notify.show(res.message, res.error ? 'error' : 'success')
                let passengersCopy = passengers.reduce((newArray, passenger) => {
                    if (passenger._id !== props.userId) {
                        newArray.push(passenger);
                    }
                    return newArray;
                }, []);

                setPassengers([...passengersCopy])
                console.log(passengers)
            })
            .catch(err => {
                console.log('Server error with ride update: ', err)
                notify.show('Server error with ride update: ', 'error')
            })
    }


    return (
        <div className={style.detailsPageWrapper}>
            <h2>Details</h2>
            <ul className={style.detailsListWrapper}>
                <li className={style.detailsElement}>Driver: {creator.username}</li>
                <li className={style.detailsElement}>Traveling from: {profileValues.cityFrom}</li>
                <li className={style.detailsElement}>Traveling to: {profileValues.cityTo}</li>
                <li className={style.detailsElement}>Date of the travel: {profileValues.date}</li>
                <li className={style.detailsElement}>Seats in the car for passengers: {profileValues.carCapacity}</li>
                <li className={style.detailsElement}>Number of stops: {profileValues.numberOfStops}</li>
                <li className={style.detailsElement}>Passengers: {passengers && passengers.length > 0 ? passengers.map(p => p.username).join(', ') : 'No passengers yet'}</li>
                {isCreator
                    ? <button onClick={editDetailsHandler}>Edit</button>
                    :
                    props.userId
                        ?
                        passengers.map(p => p._id).includes(props.userId)
                            ? <button className={style.buttonDetails} onClick={unsubscribeFromRide}>Unsubscribe from the ride</button>
                            : <button className={style.buttonDetails} onClick={joinARide}>Join a ride</button>
                        : null
                }
                {editModeOn
                    ?
                    <form method='POST' onSubmit={editSubmitHandler}>
                        <ul className={style.detailsListWrapper}>
                            <li className={style.detailsElement}>Traveling from:
                                <input value={inputValues.cityFrom} name='cityFrom' onChange={onChangeHandler} />
                            </li>
                            <li className={style.detailsElement}>Traveling to:
                                <input value={inputValues.cityTo} name='cityTo' onChange={onChangeHandler} />
                            </li>
                            <li className={style.detailsElement}>Date of the travel:
                                <input value={inputValues.date} name='date' onChange={onChangeHandler} />
                            </li>
                            <li className={style.detailsElement}>Seats in the car for passengers:
                                <input value={inputValues.carCapacity} name='carCapacity' onChange={onChangeHandler} />
                            </li>
                            <li className={style.detailsElement}>Number of stops:
                                <input value={inputValues.numberOfStops} name='numberOfStops' onChange={onChangeHandler} />
                            </li>
                        </ul>
                        <button>Edit</button>
                    </form>
                    :
                    null
                }
            </ul>
        </div>
    )

}

export default withRouter(Details)