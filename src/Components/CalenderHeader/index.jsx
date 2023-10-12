import React from 'react'
import DatePicker from 'react-datepicker'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import "react-datepicker/dist/react-datepicker.css";


const CalenderHeader = ({
  selectedDate, handleDateChange, handlePreviousWeek, handleNextWeek
}) => {

  return (
    <>

      <Container>

        <Row className=" mt-3">
          <Col>
            <Button variant="outline-primary" onClick={handlePreviousWeek}>Previous</Button>{' '}
          </Col>

          <Col ><DatePicker
            selected={selectedDate.toDate()}
            onChange={handleDateChange}
            className="custom-datepicker" /></Col>
          <Col className="text-right"><Button variant="outline-primary" onClick={handleNextWeek}>Next</Button>{' '}
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default CalenderHeader