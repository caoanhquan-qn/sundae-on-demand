import { render, screen } from "../../../test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";

test("red input box for invalid scoop count", async () => {
  // invalid scoop count: non-int or out of range
  render(
    <ScoopOption name="Vanilla" imagePath="" updateItemCount={jest.fn()} />
  );

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");

  expect(vanillaInput).toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2.5");

  expect(vanillaInput).toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "11");

  expect(vanillaInput).toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "3");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
