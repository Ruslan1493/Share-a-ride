import React, { useState } from 'react'
import style from '../CreateTrip/Create-trip.module.scss'
import Calendar from '../Calendar/Custom-calendar'
import { DateErrorHandler } from '../Error-handler/Error-handler'
import { useEffect } from 'react'

function FirstPage(props) {

    let [cityFromValue, setCityFromValue] = useState('')
    let [cityToValue, setCityToValue] = useState('')
    let [dateSelected, setDateSelected] = useState('')
    let [errorMessage, seterrorMessage] = useState('')
    let [errorhandler, seterrorhandler] = useState(new DateErrorHandler())

    useEffect(()=>{

    }, [dateSelected])

    let saveDate = (e, value) => {
        e.preventDefault()

        const selectedDate = e.target.innerText + '/' + value.selectedDate
       
   
        const { hasError, errorMessage } = errorhandler.checkDate(selectedDate)
        console.log('IN SAVE DATE')
        setDateSelected(selectedDate)
        console.log('SELECTED DATE: ', selectedDate)
        console.log('Has error in save date: ', hasError)
        seterrorMessage(errorMessage)
        if(hasError){
            // props.hasDateInputError(hasError, errorMessage)
        }
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