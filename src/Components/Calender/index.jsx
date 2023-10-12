import React from 'react'
import CalenderHeader from '../CalenderHeader'
import CalenderMiddle from '../CalenderMiddle'
import useCalender from '../../Hooks/CalenderHooks/UserCalenderHook'
import CalenderTable from './CalenderTable'

const Calender = () => {
    const {
        selectedDate, setSelectedDate,
        timezone, setTimezone,
        timeSlots,
        handleDateChange,
        handleTimezoneChange,
        handlePreviousWeek,
        handleNextWeek,
        handleCheckboxChange,
        isCheckboxSelected
    } = useCalender()
    return (
        <>
            <CalenderHeader selectedDate={selectedDate} handleDateChange={handleDateChange} handlePreviousWeek={handlePreviousWeek} handleNextWeek={handleNextWeek} />
            <CalenderMiddle handleTimezoneChange={handleTimezoneChange} timezone={timezone} />
            <CalenderTable selectedDate={selectedDate} timeSlots={timeSlots} handleCheckboxChange={handleCheckboxChange}
                isCheckboxSelected={isCheckboxSelected} />
        </>
    )
}

export default Calender