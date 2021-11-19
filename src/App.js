import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

function App() {
  const [orderPhase, setOrderPhase] = useState(1);
  return (
    <Container>
      <OrderDetailsProvider>
        {orderPhase === 1 && <OrderEntry setOrderPhase={setOrderPhase} />}
        {orderPhase === 2 && <OrderSummary setOrderPhase={setOrderPhase} />}
        {orderPhase === 3 && (
          <OrderConfirmation setOrderPhase={setOrderPhase} />
        )}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
