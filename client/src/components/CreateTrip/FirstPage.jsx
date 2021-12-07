import React, { useState } from 'react'
import style from '../CreateTrip/Create-trip.module.scss'
import Calendar from '../Calendar/Custom-calendar'
import { DateErrorHandler } from '../Error-handler/Error-handler'

function FirstPage(props) {

    console.log("FirstPage")
    console.log()
    let [cityFromValue, setCityFromValue] = useState('')
    let [cityToValue, setCityToValue] = useState('')
    let [dateSelected, setDateSelected] = useState('')
    let [errorMessage, seterrorMessage] = useState('')
    let [errorhandler, seterrorhandler] = useState(new DateErrorHandler())

    let saveDate = (e, value) => {
        e.preventDefault()

        const selectedDate = e.target.innerText + '/' + value.selectedDate
        const currentDateNow = new Date()
        const currentDateDay = currentDateNow.getDate()
        const currentDateMonth = currentDateNow.getMonth() + 1
        const currentDateYear = currentDateNow.getFullYear()
        const currentDate = currentDateDay + '/' + currentDateMonth + '/' + currentDateYear
        // console.log(selectedDate)
        // console.log(currentDate)
        // console.log(currentDateMonth)
        // console.log(currentDateYear)
        // if(currentDate > selectedDate){
        //     return 'error'
        // }
        //use date format
        //https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date

        console.log('curre date  ', currentDate)
        const { hasError, errorMessage } = errorhandler.checkDate(currentDate, selectedDate)
        setDateSelected(selectedDate)
        seterrorMessage(errorMessage)
        props.hasDateInputError(hasError, errorMessage)
    }

    return (
        <form onSubmit={(e) => props.createFirstPageTripFunc(e, cityFromValue, cityToValue, dateSelected)}>
            <label className={style.label}>
                <span>From where are you riding</span>
                <input type='text' name='cityFrom' defaultValue='' onChange={e => setCityFromValue(e.target.value)} />
            </label>
            <label className={style.label}>
                <span>Ride destination (city)</span>
                <input type='text' name='cityTo' defaultValue='' onChange={e => setCityToValue(e.target.value)} />
            </label>
            <label className={style.label}>
                <span>Date of the trip</span>
                <input
                    type='text'
                    name='date'
                    value={
                        errorMessage !== ''
                            ?
                            errorMessage
                            :
                            dateSelected}
                    onChange={e => setDateSelected(e.target.value)}
                />
                <Calendar saveDate={saveDate} />
            </label>
            <button type="submit">Next</button>
        </form>
    )
}

export default FirstPage