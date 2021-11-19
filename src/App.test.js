import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// "happy path" test
test("optionally show 'Toppings' on summary page", async () => {
  render(<App />);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await screen.findByRole("checkbox", { name: "Cherries" });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "3");

  const orderBtn = screen.getByRole("button", { name: /order sundae/i });
  userEvent.click(orderBtn);

  const toppingsHeading = screen.queryByRole("heading", { name: /toppings/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});
