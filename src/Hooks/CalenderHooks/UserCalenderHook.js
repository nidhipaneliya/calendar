import React, { useEffect, useState } from 'react'
import moment from 'moment-timezone'

const useCalender = () => {
  const [timezone, setTimezone] = useState('UTC');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().tz('UTC'));

  const timeSlots = generateTimeSlots();

  function generateTimeSlots() {
    const timeSlots = [];
    const startTimeMorning = moment().startOf('day').tz(timezone).hour(8);
    const startTimeEvening = moment().startOf('day').tz(timezone).hour(23); // 1:00 PM

    while (startTimeMorning.isSameOrBefore(startTimeEvening)) {
      timeSlots.push(startTimeMorning.format('hh:mm A')); // 'hh:mm A' for AM/PM format
      startTimeMorning.add(30, 'minutes');
    }

    return timeSlots;
  }

  const handleDateChange = (date) => {
    setSelectedDate(moment(date).tz(timezone));
  };

  const handleTimezoneChange = (e) => {
    const newTimezone = e.target.value;
    setTimezone(newTimezone);

    // When timezone changes, convert the dates and times in selectedCheckboxes
    const updatedSelectedCheckboxes = selectedCheckboxes.map((item) => {
      const convertedDate = moment(item.date).tz(newTimezone).format('YYYY-MM-DD');
      const convertedTime = moment(item.time, 'hh:mm A').tz(newTimezone).format('hh:mm A');
      const checkboxId = `${convertedDate}|${convertedTime}`
      return { date: convertedDate, time: convertedTime, checkboxId: checkboxId };
    });

    setSelectedCheckboxes(updatedSelectedCheckboxes);
  };

  const handlePreviousWeek = () => {
    setSelectedDate(selectedDate.clone().subtract(1, 'week'));
  };

  const handleNextWeek = () => {
    setSelectedDate(selectedDate.clone().add(1, 'week'));
  };


  const handleCheckboxChange = (date, timeSlot) => {
    // Create a unique identifier for the checkbox based on date and timeSlot
    const checkboxId = `${date.format('YYYY-MM-DD')}|${timeSlot}`;

    // Create a copy of the selectedCheckboxes array
    const updatedSelectedCheckboxes = [...selectedCheckboxes];
    console.log('updatedSelectedCheckboxes: ', updatedSelectedCheckboxes);

    // Check if the checkboxId already exists in the array
    const existingIndex = updatedSelectedCheckboxes.findIndex(item => item.checkboxId === checkboxId);

    if (existingIndex !== -1) {
      // If it exists, toggle the selection (remove it from the array)
      updatedSelectedCheckboxes.splice(existingIndex, 1);
    } else {
      // If it doesn't exist, add it to the array
      updatedSelectedCheckboxes.push({ date: date.format('YYYY-MM-DD'), time: timeSlot, checkboxId });
    }

    // Update the state with the modified array
    setSelectedCheckboxes(updatedSelectedCheckboxes);
  };

  const isCheckboxSelected = (date, timeSlot) => {

    const checkboxId = `${date.format('YYYY-MM-DD')}|${timeSlot}`;

    const match = selectedCheckboxes.find(item => {

      const itemDate = item.date;
      const itemTime = item.time;


      // Compare json data'ss date and time with the given date and timeSlot
      return itemDate == date.format('YYYY-MM-DD') && itemTime == timeSlot;
    });


    // Return true if a match is found, otherwise return false

    return match ? true : false;
  };

  const fetchCalenderJsonData = () => {
    fetch('/data.json') // Replace 'data.json' with the correct path to your JSON file
      .then((response) => response.json())
      .then((data) => {
        setSelectedCheckboxes(data)
      })
      .catch((error) => {
        console.error({ error })
      })
  }

  useEffect(() => {

  }, [timezone]);

  useEffect(() => {
    fetchCalenderJsonData()
  }, []);


  return {
    selectedDate,
    setSelectedDate,
    timezone,
    setTimezone,
    timeSlots,
    handleDateChange,
    handleTimezoneChange,
    handlePreviousWeek,
    handleNextWeek,
    handleCheckboxChange,
    isCheckboxSelected
  }
}

export default useCalender