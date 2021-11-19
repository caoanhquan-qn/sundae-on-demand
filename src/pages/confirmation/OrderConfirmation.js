import React, { useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import AlertBanner from "../common/AlertBanner";
import { useOrderDetails } from "../../contexts/OrderDetails";

function OrderConfirmation({ setOrderPhase }) {
  const [, , resetOrder] = useOrderDetails();

  const [orderNumber, setOrderNumber] = useState(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((res) => setOrderNumber(res.data.orderNumber))
      .catch((err) => {
        // TODO:
        setErr(true);
      });
  }, []);
  if (err) {
    return (
      <div style={{ textAlign: "center", margin: "20px" }}>
        <AlertBanner />
        <Form>
          <Button
            variant="light"
            type="submit"
            onClick={() => {
              // clear the order details
              resetOrder();
              setOrderPhase(1);
            }}
          >
            Create new order
          </Button>
        </Form>
      </div>
    );
  }
  if (!orderNumber) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank you!</h1>
        <h4>Your order number is {orderNumber}</h4>
        <p>as per our terms and conditions, nothing will happen now</p>
        <Form>
          <Button
            variant="light"
            type="submit"
            onClick={() => {
              // clear the order details
              resetOrder();
              setOrderPhase(1);
            }}
          >
            Create new order
          </Button>
        </Form>
      </div>
    );
  }
}

export default OrderConfirmation;
