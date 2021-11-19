import { render, screen } from "../../../test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(4);

  // confirm alt text of images
  const altText = scoopImages.map((image) => image.alt);
  expect(altText).toEqual([
    "Mint chip scoop",
    "Vanilla scoop",
    "Chocolate scoop",
    "Salted caramel scoop",
  ]);
});

test("displays image for each topping option from server", async () => {
  render(<Options optionType="toppings" />);

  // find images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(6);

  // confirm alt text of images
  const altText = toppingImages.map((img) => img.alt);
  expect(altText).toEqual([
    "M&Ms topping",
    "Hot fudge topping",
    "Peanut butter cups topping",
    "Gummi bears topping",
    "Mochi topping",
    "Cherries topping",
  ]);
});

test("no scoops subtotal update on invalid input", async () => {
  render(<Options optionType="scoops" />);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });

  // scoops total is $0.00 by default
  expect(scoopsSubtotal).toHaveTextContent("$0.00");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");

  expect(scoopsSubtotal).toHaveTextContent("$0.00");
});
