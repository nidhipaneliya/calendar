import React, { useEffect, useMemo, useState } from "react";
import moment from "moment-timezone";

/**
 * This hook contain all functionality which is needs in Calender component
 * @returns
 */
const useCalender = () => {
  const [timezone, setTimezone] = useState("UTC");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().tz("UTC"));

  /**
   * Generate all time slot which is display on screen
   * Memoize this function to not update at every time rendering
   */
  const timeSlots = useMemo(() => {
    const timeSlots = [];
    const startTimeMorning = moment().startOf("day").tz(timezone).hour(8);
    const startTimeEvening = moment().startOf("day").tz(timezone).hour(23);

    while (startTimeMorning.isSameOrBefore(startTimeEvening)) {
      timeSlots.push(startTimeMorning.format("hh:mm A"));
      startTimeMorning.add(30, "minutes");
    }

    return timeSlots;
  }, []);

  const handleTimezoneChange = (e) => {
    const newTimezone = e.target.value;
    setTimezone(newTimezone);

    // When timezone changes, convert the dates and times in selectedCheckboxes
    const updatedSelectedCheckboxes = selectedCheckboxes.map((item) => {
      const dateInSelectedTimezone = moment
        .tz(item.date + " " + item.time, "YYYY-MM-DD hh:mm A", timezone)
        .tz(newTimezone);
      const convertedDate = dateInSelectedTimezone.format("YYYY-MM-DD");
      const convertedTime = dateInSelectedTimezone.format("hh:mm A");
      const checkboxId = `${convertedDate}|${convertedTime}`;
      return { date: convertedDate, time: convertedTime, checkboxId };
    });

    setSelectedCheckboxes(updatedSelectedCheckboxes);
  };

  const handleDateChange = (date) => {
    setSelectedDate(moment(date).tz(timezone));
  };

  const handlePreviousWeek = () => {
    setSelectedDate(selectedDate.clone().subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setSelectedDate(selectedDate.clone().add(1, "week"));
  };

  const handleCheckboxChange = (date, timeSlot) => {
    const checkboxId = `${date.format("YYYY-MM-DD")} ${timeSlot}`;

    const updatedSelectedCheckboxes = [...selectedCheckboxes];
    const existingIndex = updatedSelectedCheckboxes.findIndex(
      (item) => item.checkboxId === checkboxId
    );

    //select and unselect checkbox
    if (existingIndex !== -1) {
      updatedSelectedCheckboxes.splice(existingIndex, 1);
    } else {
      updatedSelectedCheckboxes.push({
        date: date.format("YYYY-MM-DD"),
        time: timeSlot,
        checkboxId,
      });
    }

    setSelectedCheckboxes(updatedSelectedCheckboxes);
  };

  const isCheckboxSelected = (date, timeSlot) => {
    const match = selectedCheckboxes.find((item) => {
      const itemDate = item.date;
      const itemTime = item.time;

      // Compare json data's date and time with the given date and time
      return itemDate == date.format("YYYY-MM-DD") && itemTime == timeSlot;
    });

    return match ? true : false;
  };

  const fetchCalenderJsonData = () => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setSelectedCheckboxes(data);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  useEffect(() => {
    fetchCalenderJsonData();
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
    isCheckboxSelected,
  };
};

export default useCalender;
