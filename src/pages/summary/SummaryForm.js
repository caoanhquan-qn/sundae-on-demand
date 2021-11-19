import React, { useState } from "react";
import { FormCheck, Button, Popover, OverlayTrigger } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function SummaryForm({ setOrderPhase }) {
  const [checked, setChecked] = useState(false);

  const handleCheckBox = () => {
    setChecked(!checked);
  };
  const popover = (
    <Popover id="terms-conditions-popover">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkBoxLabel = checked ? (
    <span>
      I agree to <span style={{ color: "blue" }}>Terms and Conditions</span>
    </span>
  ) : (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <Form.Group>
        <FormCheck
          style={{ margin: "10px 0" }}
          type="checkbox"
          checked={checked}
          data-testid="condition-checkbox"
          onChange={handleCheckBox}
          label={checkBoxLabel}
        />
      </Form.Group>
      <Button
        variant="light"
        data-testid="confirm-order-button"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          setOrderPhase(3);
        }}
        disabled={!checked}
      >
        Confirm order
      </Button>
    </Form>
  );
}

export default SummaryForm;
