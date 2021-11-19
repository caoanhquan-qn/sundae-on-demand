import { render, screen } from "../../../test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when toppings chage", async () => {
  render(<Options optionType="toppings" />);

  // default toppings subtotal $0.00
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // check hot fudge topping and check the subtotal
  const hotFudgeTopping = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  userEvent.click(hotFudgeTopping);
  expect(hotFudgeTopping).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // check Mochi topping checkbox and subtotal $3.00
  const mochiTopping = await screen.findByRole("checkbox", { name: "Mochi" });

  userEvent.click(mochiTopping);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // click Mochi topping checkbox again and subtotal $1.50

  userEvent.click(mochiTopping);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

// black box testing
describe("update grand total when scoops and toppings change", () => {
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    const grandTotal = screen.getByText(/grand total/i);
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    const grandTotal = screen.getByText(/grand total/i);

    userEvent.click(cherriesCheckbox);
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    const grandTotal = screen.getByText(/grand total/i);

    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    userEvent.click(cherriesCheckbox);

    // remove one scoop and one topping
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "1");
    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("2.00");
  });
});
