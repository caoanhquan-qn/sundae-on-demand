import React from "react";
import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

const AllTheProviders = ({ children }) => {
  return <OrderDetailsProvider>{children}</OrderDetailsProvider>;
};

const customRender = (ui) => {
  return render(ui, { wrapper: AllTheProviders });
};

export * from "@testing-library/react";
export { customRender as render };
