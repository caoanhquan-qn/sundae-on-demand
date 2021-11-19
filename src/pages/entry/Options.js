import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((error) => {
        // TODO:
        setErr(true);
      });
  }, [optionType]);
  if (err) {
    return (
      <>
        <h2>{title}</h2>
        <AlertBanner />
      </>
    );
  }
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
        updateItemCount={(itemName, newItemCount) =>
          updateItemCount(itemName, newItemCount, optionType)
        }
      />
    );
  });
  return (
    <div style={{ margin: "10px 0" }}>
      <h2>{title}</h2>
      <p>{`${formatCurrency(pricePerItem[optionType])} each`}</p>
      <p>{`${title} total: ${formatCurrency(
        orderDetails.totals[optionType]
      )}`}</p>
      <Row>{optionItems}</Row>
    </div>
  );
}

export default Options;
