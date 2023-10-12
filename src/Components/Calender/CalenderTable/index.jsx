import React from "react";
import Container from "react-bootstrap/Container";
import "react-datepicker/dist/react-datepicker.css";

const CalenderTable = ({
  timeSlots,
  selectedDate,
  handleCheckboxChange,
  isCheckboxSelected,
}) => {

  const renderAllTimeSlots = () => {
    const headers = [];

    for (let i = 0; i < 7; i++) {
      const day = selectedDate.clone().startOf("week").add(i, "days");

      if (day.day() >= 1 && day.day() <= 5) {
        // Check if the day is Monday (1) to Friday (5)
        headers.push(
          <div
            key={i}
            className="d-flex flex-row border border-secondary-subtle"
          >
            <div className="w-10 p-4">{day.format("ddd, MM/DD")}</div>
            <div className="w-90 d-flex flex-row flex-wrap">
              {renderTimeSlots(day)}
            </div>
          </div>
        );
      }
    }

    return headers;
  };

  const renderTimeSlots = (date) => {
    return timeSlots.map((timeSlot, index) => (
      <td key={index}>
        <td className="p-1">
          <input
            type="checkbox"
            checked={isCheckboxSelected(date, timeSlot)}
            onChange={() => handleCheckboxChange(date, timeSlot)}
          />{" "}
          {timeSlot}
        </td>
      </td>
    ));
  };

  return (
    <>
      <Container>
        <div className="mt-3">{renderAllTimeSlots()}</div>
      </Container>
    </>
  );
};

export default CalenderTable;
