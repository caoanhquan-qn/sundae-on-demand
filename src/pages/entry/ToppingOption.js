import React from "react";
import { Col, Form } from "react-bootstrap";

function ToppingOption({ name, imagePath, updateItemCount }) {
  return (
    <Col xs={12} sm={6} md={4} lg={2} style={{ textAlign: "center" }}>
      <img
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} topping`}
        width={"75%"}
      />
      <Form>
        <Form.Check
          type="checkbox"
          id={`${name}-count`}
          label={name}
          style={{ margin: "10px 0" }}
          inline
          onChange={(e) => {
            updateItemCount(name, e.target.checked ? 1 : 0);
          }}
        ></Form.Check>
      </Form>
    </Col>
  );
}

export default ToppingOption;
