import React, { Component } from 'react'
import style from './Custom-calendar.module.scss'

Date.prototype.monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
]

Date.prototype.getMonthName = function () {
    return this.monthNames[this.getMonth()]
}

export default class Calendar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentMonthDays: 0,
            numberOfWeeks: 0,
            startDay: 0,
            currentMonthName: '',
            previousMonthDays: 0,
            currentMonthNumber: 0,
            dateYear: 0,
            selectedYear: 0,
            currentMonthPastDays: 0,
            currentDate: -1,
            userDateSelected: 0,
            dateSelectedFromCalendar: 0
        }
    }

    componentDidMount() {
        // console.log('componentDidMount')

        this.getCurrentMonth(0)
    }

    getCurrentMonth(month) {
        let date = new Date()

        let currentMonth = new Date()
        const todaysMonth = currentMonth.getMonth()
        let currentMonthNumber = currentMonth.getMonth()
        let year = this.state.dateYear === 0 ? currentMonth.getFullYear() : this.state.dateYear
        // this.setState({
        //     dateYear: currentMonth.getFullYear()
        // })
        // console.log('current month num1 ', currentMonthNumber)
        // console.log('year ', this.state.dateYear)
        if (month === -1) {
            if (this.state.currentMonthNumber - 1 < date.getMonth() + 1 && this.state.dateYear === currentMonth.getFullYear()) {
                // console.log('current month days ', currentMonth.getDate())
                // date.getMonth() + 1

                currentMonthNumber = currentMonth.getMonth()
                this.setState({
                    // currentMonthNumber: date.getMonth() + 1,
                    currentMonthPastDays: currentMonth.getDate() - 1,
                })
            } else {

                currentMonth = new Date(date.getFullYear(), this.state.currentMonthNumber - 1)
                if (this.state.currentMonthNumber > 0) {
                    currentMonthNumber = this.state.currentMonthNumber - 1
                } else {
                    currentMonth.getMonth()
                    year -= 1
                }
                currentMonthNumber = this.state.currentMonthNumber > 0 ? this.state.currentMonthNumber - 1 : currentMonth.getMonth()
                // this.setState({
                //     currentMonthNumber: this.state.currentMonthNumber - 1
                // })
            }
        } else if (month === 1) {
            // console.log('current months number ---> ', this.state.currentMonthNumber)
            if (this.state.currentMonthNumber === 11) {
                // console.log('change of year')
                currentMonth = new Date(this.state.dateYear + 1, 0)
                // console.log('current year before ch: ', year)
                year += 1
                // console.log('CURRENT YEAR : ', year)
                // this.setState({
                //     dateYear: this.state.dateYear + 1
                // })
                // console.log('current year: ', this.state.dateYear)
                currentMonthNumber = 0
            } else {
                currentMonth = new Date(this.state.dateYear, this.state.currentMonthNumber + 1)
                currentMonthNumber = this.state.currentMonthNumber + 1
                // console.log('month after increase ', currentMonth)
            }
            // this.setState({
            //     currentMonthNumber: this.state.currentMonthNumber + 1
            // })
        }
        // console.log('currentMonth.getDay()', new Date(2021, 4, 1))
        let prevMonthsLastWeekDays = new Date(year, currentMonthNumber, 1).getDay() - 1
        if (prevMonthsLastWeekDays === -1) {
            prevMonthsLastWeekDays = 6
        }
        // console.log(' prevMonthsLastWeekDays ', prevMonthsLastWeekDays)
        // console.log('prev month ', prevMonthsLastWeekDays)
        const numOfDaysOfCurrentAndPrevMonths = this.getNumberOfDays(currentMonth.getMonth() + 1, currentMonth.getFullYear()) + prevMonthsLastWeekDays
        const weekNumber = Math.ceil(numOfDaysOfCurrentAndPrevMonths / 7)

        const monthsDays = this.getNumberOfDays(currentMonth.getMonth() + 1, currentMonth.getFullYear())
        // console.log('getNumberOfDays ', monthsDays)
        const monthName = currentMonth.getMonthName()
        let currentDate = -1
        // console.log('current month num ', currentMonthNumber)
        // console.log('currentMonth.getMonth() ', currentMonth.getMonth())
        // console.log('weeks:  ', weekNumber)
        if (todaysMonth === currentMonthNumber) {
            currentDate = currentMonth.getDate()
        } else {
            currentDate = 0
        }
        // console.log('current date ', currentDate)
        this.setState({
            currentMonthDays: monthsDays,
            previousMonthDays: prevMonthsLastWeekDays,
            currentMonthNumber,
            numberOfWeeks: weekNumber,
            startDay: prevMonthsLastWeekDays,
            currentMonthName: monthName,
            dateYear: year,
            selectedYear: date.getFullYear(),
            currentDate
        })
        // console.log(this.state)
    }

    getPreviousMonth() {
        return this.getCurrentMonth(-1)
    }

    getNextMonth() {
        return this.getCurrentMonth(1)
    }

    getNumberOfDays(month, year) {
        return new Date(year, month, 0).getDate()
    }

    loadMonth(e, monthType) {
        e.preventDefault()
        if (monthType === 'previous') {
            this.getPreviousMonth()
        } else {
            this.getNextMonth()
        }
    }

    //move saveDate to the parent component

    render() {
        return (
            <div className={style.calendar}>
                <h2>Calendar</h2>
                {/* {/* <h2>Days: {this.state.currentMonthDays}</h2> */}
                {/* <h2>Weeks: {this.state.numberOfWeeks}</h2> */}
                <h3>{this.state.dateYear}</h3>
                <div className={style.calendarHeader}>
                    <button className={style.calendarHeaderSpan} onClick={(e) => this.loadMonth(e, 'previous')}>&lt;</button>
                    <h2>{this.state.currentMonthName}</h2>
                    <button className={style.calendarHeaderSpan} onClick={(e) => this.loadMonth(e, 'next')}>&gt;</button>
                </div>
                <div>
                    <ul className={style.row}>
                        <li className={style.col}>M</li>
                        <li className={style.col}>T</li>
                        <li className={style.col}>W</li>
                        <li className={style.col}>T</li>
                        <li className={style.col}>F</li>
                        <li className={style.col}>S</li>
                        <li className={style.col}>S</li>
                    </ul>
                </div>
                <GetCalendar
                    weekNumber={this.state.numberOfWeeks}
                    currentMonthDays={this.state.currentMonthDays}
                    startDay={this.state.startDay}
                    currentMonthPastDays={this.state.currentMonthPastDays}
                    currentDate={this.state.currentDate}
                    saveDate={this.props.saveDate}
                    currentYear={this.state.dateYear}
                    selectedYear={this.state.selectedYear}
                    currentMonthNumber={this.state.currentMonthNumber}
                    state={this.state}
                    className='calendar-display'
                ></GetCalendar>
            </div>
        )
    }
}


function GetCalendar(props) {
    let days = [props.currentMonthDays]
    const startDay = props.startDay
    // console.log('currentyear ', props.currentYear)
    // console.log('seleceted year ', props.selectedYear)
    return (
        <div className={style.calendarDates}>
            {
                days.map((day, i) => {
                    let counter = 1
                    let arr = []
                    let resultArr = []
                    // console.log(props)
                    for (let i = 0; i < props.weekNumber; i++) {
                        arr = []
                        for (let j = 1; j <= 7; j++) {
                            if (i == 0 && startDay >= j) {
                                arr.push(<div className={style.col} key={counter + '' + j}> </div>)
                                continue
                            }
                            if (counter > props.currentMonthDays) {
                                break
                            }
                            arr.push(<div className={`
                                    ${counter < props.currentDate ? style.inactive : null}
                                    ${style.col} 
                                    ${style.colHover} 
                                    ${(props.currentDate === counter && props.selectedYear === props.currentYear) ? style.active : null

                                }`
                            }
                                key={counter}
                                onClick={(e) => {
                                    // this.setState({
                                    //     dateSelectedFromCalendar: e.target.innerText
                                    // })
                                    props.saveDate(e,
                                    {
                                        currentDate: props.currentDate + '/' + (props.currentMonthNumber + 1) + '/' + props.currentYear,
                                        selectedDate: props.state.currentMonthNumber + 1 + '/' + props.state.dateYear,
                                    })
                                }
                                }
                            >{counter}</div>)
                            counter++
                        }
                        resultArr.push(<div className={style.row} key={counter}>{arr}</div>)
                    }
                    // console.log()
                    return resultArr
                })
            }
        </div >
    )

}