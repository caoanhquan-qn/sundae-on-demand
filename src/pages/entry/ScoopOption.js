import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

function ScoopOption({ name, imagePath, updateItemCount }) {
  const [validated, setValidated] = useState(true);
  const handleScoopsInput = (event) => {
    const currentTargetValue = event.target.value;
    if (
      currentTargetValue < 0 ||
      currentTargetValue > 10 ||
      !Number.isInteger(+currentTargetValue) ||
      !currentTargetValue
    ) {
      setValidated(false);
    } else {
      setValidated(true);
      updateItemCount(name, event.target.value);
    }
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        width={"75%"}
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            className={validated ? "" : "is-invalid"}
            type="number"
            defaultValue={0}
            onChange={handleScoopsInput}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
export default ScoopOption;
