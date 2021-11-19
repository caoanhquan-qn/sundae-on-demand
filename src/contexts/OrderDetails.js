import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants";
const OrderDetails = createContext();

// create custom hook to check whether we're inside a provider

export function useOrderDetails() {
  const context = useContext(OrderDetails);
  if (!context) {
    throw new Error(
      `useOrderDetails must be used within a OrderDetailsProvider`
    );
  }
  return context;
}

function calculateSubtotal(optionType, optionCounts) {
  let totalAmount = 0;
  for (let value of optionCounts[optionType].values()) {
    totalAmount += parseInt(value);
  }
  return totalAmount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  const resetOrder = () => {
    setOptionCounts({
      scoops: new Map(),
      toppings: new Map(),
    });
  };
  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);

    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingsSubtotal,
      grandTotal: scoopsSubtotal + toppingsSubtotal,
    });
  }, [optionCounts]);
  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };

      // update option count for this item with the new value
      const optionCountsMap = newOptionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));
      newOptionCounts[optionType] = optionCountsMap;
      setOptionCounts(newOptionCounts);
    }
    // getter: object containing option counts for scoops and toppings, subtotal and total
    // setter: update option counts for scoops and toppings
    return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
  }, [optionCounts, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
}
