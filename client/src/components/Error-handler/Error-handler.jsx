import { notify } from 'react-notify-toast'

export class DateErrorHandler {
    checkDate(selectedDate) {
        // const [ day, month, year ] = currentDate.split('/')
        let errorObject = {
            hasError: false,
            errorMessage: ''
        }
        const currentDateNow = new Date()
        const currentDateDay = currentDateNow.getDate()
        const currentDateMonth = currentDateNow.getMonth() + 1
        const currentDateYear = currentDateNow.getFullYear()
        const currentDate = currentDateDay + '/' + currentDateMonth + '/' + currentDateYear
        const day = Number(currentDate.split('/')[0])
        const month = Number(currentDate.split('/')[1])
        const year = Number(currentDate.split('/')[2])
        // const [ selectedDay, selectedMonth, selectedYear ] = selectedDate.split('/')
        const selectedDay = Number(selectedDate.split('/')[0])
        const selectedMonth = Number(selectedDate.split('/')[1])
        const selectedYear = Number(selectedDate.split('/')[2])
        // console.log('curre date ', day + ' ' + month + ' ' + year)
        // console.log('sel date ', selectedDay + ' ' + selectedMonth + ' ' + selectedYear)
        if (selectedYear < year ||
            (selectedYear <= year && selectedMonth < month) ||
            (selectedYear === year && selectedMonth === month && selectedDay < day)) {
            errorObject.hasError = true
            errorObject.errorMessage = 'You cannot select past dates'
            console.log('Error handler:')
            console.log(errorObject)
            console.log(selectedYear+'/'+selectedMonth+'/'+selectedDay)
 
            console.log(year+'/'+month+'/'+day)

            return errorObject
        }

        return errorObject
    }
}

export function createFormErrorHandler(state, notify, cityFrom, cityTo, date) {

    if (cityFrom !== '' && cityTo !== '' && date !== '') {
        // this.props.history.push('/app/create-a-ride/confirm')
        state.setState({
            isFirstPage: false,
            cityFrom,
            cityTo,
            date
        })
        console.log('first page over:')
        console.log(state.state)
    }
    else {
        notify.show('Please fill all of the fields', 'error')
    }
}

export function editFormErrorHandler({ cityFrom, cityTo, date, carCapacity, numberOfStops }) {
    // console.log(cityFrom.substr(0,1))
    // console.log(cityFrom[0].toUpperCase())
    if (cityFrom === '' || cityFrom.length < 3 || cityFrom.match('[0-9]+') || cityFrom.substr(0, 1) !== cityFrom[0].toUpperCase()
        || cityTo === '' || cityTo.length < 3 || cityTo.match('[0-9]+') || cityTo.substr(0, 1) !== cityTo[0].toUpperCase()) {
        notify.show('Please enter correct city name', 'error')
        return true
    }
    if (date === '' || date.length !== 10 || !date.match('(^[0-9]{2}/[0-9]{2}/[0-9]{4}$)')) {
        console.log('IN DATE ERROR handler')
        console.log(date)
        console.log(!date.match('(^[0-9]{2}/[0-9]{2}/[0-9]{4}$)'))
        notify.show('Please enter correct date in the format "dd/mm/yyyy"', 'error')
        return true
    }
    if (carCapacity === '' || isNaN(carCapacity)) {
        notify.show('Please enter correct passengers capacity', 'error')
        return true
    }
    if (Number(carCapacity) > 8 || Number(carCapacity) < 0) {
        notify.show('Passengers capacity should be maximum of 8', 'error')
        return true
    }
    if (numberOfStops === '' || isNaN(numberOfStops)) {
        notify.show('Please enter correct number of stops', 'error')
        return true
    }
    if (Number(numberOfStops) > 10 || Number(numberOfStops) < 0) {
        notify.show('Number of stops should be between 0 and 10', 'error')
        return true
    }
}