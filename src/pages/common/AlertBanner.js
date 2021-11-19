import React from "react";
import { Alert } from "react-bootstrap";

function AlertBanner({ variant, message }) {
  const alertMessage =
    message || "An unexpected error occurred. Please try again later.";
  const alertVariant = variant || "danger";
  return (
    <Alert
      variant={alertVariant}
      style={{ backgroundColor: "red", color: "white" }}
    >
      {alertMessage}
    </Alert>
  );
}

export default AlertBanner;
