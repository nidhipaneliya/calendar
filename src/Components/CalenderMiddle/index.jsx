import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CalenderMiddle = ({ handleTimezoneChange, timezone }) => {
    return (
        <>
            <Container>
                <Row className=" mt-3">
                    <Col>
                        <select
                            className="custom-datepicker"
                            value={timezone}
                            onChange={handleTimezoneChange}
                        >
                            <option value="UTC">UTC</option>
                            <option value="Asia/Kolkata">Asia/Kolkata</option>
                        </select>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CalenderMiddle;
