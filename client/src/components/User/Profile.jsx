import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Profile = ({ userId }) => {
    let [activeTripsAsCreator, setActiveTripsAsCreator] = useState([])
    let [activeTripsAsPassenger, setActiveTripsAsPassenger] = useState([])
    let [passedTripsAsCreator, setPassedTripsAsCreator] = useState([])
    let [passedTripsAsPassenger, setPassedTripsAsPassenger] = useState([])
    useEffect(() => {
        fetch(`http://localhost:4000/user/profile/${userId}`)
            .then(res => res.json())
            .then(res => {
                console.log("User profile data:")
                console.log(res)
                let trips = res.data
                let tripsActiveAndCreatedByUser = trips.filter(trip => trip.creator._id === userId && !trip.tripPassed)
                let tripsActiveAndNotCreatedByUser = trips.filter(trip => trip.creator._id !== userId && !trip.tripPassed)
                let tripsPassedAndCreatedByUser = trips.filter(trip => trip.creator._id === userId && trip.tripPassed)
                let tripsPassedAndNotCreatedByUser = trips.filter(trip => trip.creator._id !== userId && trip.tripPassed)
                if (tripsActiveAndCreatedByUser.length > 0) {
                    setActiveTripsAsCreator(tripsActiveAndCreatedByUser)
                } 
                if (tripsPassedAndCreatedByUser.length > 0) {
                    setPassedTripsAsCreator(tripsPassedAndCreatedByUser)
                } 
                if (tripsActiveAndNotCreatedByUser.length > 0) {
                    setActiveTripsAsPassenger(tripsActiveAndNotCreatedByUser)
                } 
                if(tripsPassedAndNotCreatedByUser.length > 0) {
                    setPassedTripsAsPassenger(tripsPassedAndNotCreatedByUser)
                }
            })
    }, [])


    return (
        <article>
            <h1>Profile</h1>
            <div>
                <p>Active trips as a driver:</p>
                {
                    activeTripsAsCreator && activeTripsAsCreator.length > 0
                        ?
                        <ul>
                            {
                                activeTripsAsCreator && activeTripsAsCreator.length > 0 ? activeTripsAsCreator.map(trip =>
                                    <li>
                                        <p>Driver: {trip.creator.username}</p>
                                        <p>From: {trip.cityFrom}</p>
                                        <p>To: {trip.cityTo}</p>
                                        <p>Date: {trip.date}</p>
                                    </li>
                                ) : <p>No trips found</p>
                            }
                        </ul>
                        :
                        null
                }
                <p>Active trips as a passenger:</p>
                {
                    activeTripsAsPassenger
                        ?
                        <ul>
                            {
                                activeTripsAsPassenger && activeTripsAsPassenger.length > 0 ? activeTripsAsPassenger.map(trip =>
                                    <li>
                                        <p>Driver: {trip.creator.username}</p>
                                        <p>From: {trip.cityFrom}</p>
                                        <p>To: {trip.cityTo}</p>
                                        <p>Date: {trip.date}</p>
                                    </li>
                                ) : <p>No trips found</p>
                            }
                        </ul>
                        :
                        null
                }
                <p>Passed trips as a driver:</p>
                {
                    passedTripsAsCreator
                        ?
                        <ul>
                            {
                                passedTripsAsCreator && passedTripsAsCreator.length > 0 ? passedTripsAsCreator.map(trip =>
                                    <li>
                                        <p>Driver: {trip.creator.username}</p>
                                        <p>From: {trip.cityFrom}</p>
                                        <p>To: {trip.cityTo}</p>
                                        <p>Date: {trip.date}</p>
                                    </li>
                                ) : <p>No trips found</p>
                            }
                        </ul>
                        :
                        null
                }
                <p>Passed trips as passenger:</p>
                {
                    passedTripsAsPassenger
                        ?
                        <ul>
                            {
                                passedTripsAsPassenger && passedTripsAsPassenger.length > 0 ? passedTripsAsPassenger.map(trip =>
                                    <li>
                                        <p>Driver: {trip.creator.username}</p>
                                        <p>From: {trip.cityFrom}</p>
                                        <p>To: {trip.cityTo}</p>
                                        <p>Date: {trip.date}</p>
                                    </li>
                                ) : <p>No trips found</p>
                            }
                        </ul>
                        :
                        null
                }
            </div>
        </article>
    )
}

export default Profile