import React, { Component, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './Theme.module.scss'

const Theme = (props) => {
    let [rides, setRides] = useState([])
    let [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
        setRides(() => props.rides)
    })

    return (
        <div className={style.themeWrapper}>
            <div className={style.layout}>
                <div className={style.layoutBox}>
                    <Link to='/app/create-a-ride'>Create a ride</Link>
                </div>
            </div>
            <div className={style.rideWrapper}>
                <h2>All Rides</h2>
                {
                    isLoaded ?
                        (rides.length > 0
                            ?
                            <ul className={style.tripWrapper}>
                                {
                                    rides.map(ride => {
                                        return (
                                            //
                                            <Link to={`/app/details/${ride._id}`} className='trip' key={ride._id}>
                                                <p
                                                    className={
                                                        props.userId && ride.creator._id === props.userId ? style.tripCreator : style.trip
                                                    }
                                                    key={ride._id}>
                                                    {props.userId && ride.creator._id === props.userId ? <span className={style.iconUser}></span> : null}
                                                    {ride.cityFrom} to {ride.cityTo} on {ride.date} from {ride.creator.username}
                                                </p>
                                            </Link>
                                        )
                                    })
                                }
                            </ul>
                            :
                            <h2>No rides available</h2>
                        )
                        :
                        'Loading...'
                }
            </div>
        </div >
    )

}

export default Theme