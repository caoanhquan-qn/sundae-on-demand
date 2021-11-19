import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

function OrderSummary({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  const ItemsSummary = (optionType) => {
    const title =
      optionType[0].toUpperCase() + optionType.slice(1).toUpperCase();
    let items = [];
    for (let [key, value] of orderDetails[optionType]) {
      items.push(`${value} ${key}`);
    }
    return (
      <div style={{ margin: "20px 0" }}>
        <h2>
          {title}: {formatCurrency(orderDetails.totals[optionType])}
        </h2>
        <ul>
          {items.map((el, i) => (
            <li key={i}>{el}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1 style={{ margin: "20px 0" }}>Order Summary</h1>
      {ItemsSummary("scoops")}
      {orderDetails.totals["toppings"] > 0 && ItemsSummary("toppings")}
      <h2 style={{ margin: "20px 0" }}>
        Total {formatCurrency(orderDetails.totals.grandTotal)}
      </h2>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}
export default OrderSummary;
