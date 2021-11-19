import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  render(<App />);
  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  const cherriesTopping = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2");

  userEvent.click(cherriesTopping);
  // find and click order button
  const orderBtn = screen.getByRole("button", { name: /order sundae/i });
  userEvent.click(orderBtn);
  // check summary information based on order
  const scoopsSummary = screen.getByRole("heading", { name: /scoops/i });
  const toppingsSummary = screen.getByRole("heading", { name: /toppings/i });
  const total = screen.getByRole("heading", { name: /total/i });

  expect(scoopsSummary).toHaveTextContent("$4.00");
  expect(toppingsSummary).toHaveTextContent("$1.50");
  expect(total).toHaveTextContent("$5.50");

  // accept terms and conditons and click button to confirm order
  const termsConditionsCheckbox = screen.getByRole("checkbox");
  const confirmBtn = screen.getByRole("button", { name: /confirm order/i });
  userEvent.click(termsConditionsCheckbox);
  expect(termsConditionsCheckbox).toBeChecked();
  userEvent.click(confirmBtn);

  // loading spinner appears
  const loadingSpinner = screen.queryByText(/loading/i);
  expect(loadingSpinner).toBeInTheDocument();

  // confirm order number on confirmation page
  const orderNumberHeading = await screen.findByText(/order number/i);
  expect(orderNumberHeading).toBeInTheDocument();

  // loading spinner disappears
  expect(loadingSpinner).not.toBeInTheDocument();

  // click new order button on confirmation page
  const newOrderBtn = screen.getByRole("button", { name: "Create new order" });
  userEvent.click(newOrderBtn);

  // check that scoops and toppings subtotals have been reseted
  const scoopsSubtotal = await screen.findByText(/scoops total/i);
  const toppingsSubtotal = await screen.findByText(/toppings total/i);

  expect(scoopsSubtotal).toHaveTextContent("$0.00");
  expect(toppingsSubtotal).toHaveTextContent("$0.00");
});
