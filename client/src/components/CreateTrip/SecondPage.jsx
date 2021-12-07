import React from 'react'
import style from '../CreateTrip/Create-trip.module.scss'

function SecondPage(props) {


    return (
        <form onSubmit={(e) => props.createTripFunc(e)}>
            <label className={style.label}>
                <span>Car capacity or passengers</span>
                <select type='text' name='carCapacity'>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="5">7</option>
                    <option value="5">8</option>
                    <option value="more">More than 5</option>
                </select>
            </label>
            <label className={style.label}>
                <span>Number of stops during the trip</span>
                <select type='text' name='numberOfStops'>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="more">More than 5</option>
                </select>
            </label>
            <button type="submit">Next</button>
        </form>
    )
}

export default SecondPage