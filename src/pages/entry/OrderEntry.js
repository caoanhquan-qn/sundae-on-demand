import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Options from "./Options";
import { formatCurrency } from "../../utilities";

function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();
  const [disabled, setDisabled] = useState(true);
  const scoopsSubtotal = orderDetails.totals["scoops"];

  useEffect(() => {
    if (scoopsSubtotal > 0) {
      setDisabled(false);
    } else if (scoopsSubtotal === 0) {
      setDisabled(true);
    }
  }, [scoopsSubtotal]);
  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>{`Grand total: ${formatCurrency(
        orderDetails.totals["grandTotal"]
      )}`}</h2>
      <Form style={{ margin: "20px 0" }}>
        <Button
          variant="light"
          type="submit"
          disabled={disabled}
          onClick={() => {
            setOrderPhase(2);
          }}
        >
          Order Sundae!
        </Button>
      </Form>
    </div>
  );
}

export default OrderEntry;
