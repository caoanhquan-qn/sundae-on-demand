import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { render, screen, waitFor } from "../../../test-utils/test-utils";
import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";

describe("grand total", () => {
  test("grand total starts at $0.00", async () => {
    render(<OrderEntry />);
    await screen.findByRole("heading", {
      name: "Scoops",
    });
    await screen.findByRole("heading", {
      name: "Toppings",
    });
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total/i,
    });

    expect(grandTotal).toHaveTextContent("0.00");
  });
  test("grand total should be same size as titles", async () => {
    render(<OrderEntry />);

    const scoopsHeading = await screen.findByRole("heading", {
      name: "Scoops",
    });
    const toppingsHeading = await screen.findByRole("heading", {
      name: "Toppings",
    });
    const grandTotalHeading = screen.getByRole("heading", {
      name: /Grand total/i,
    });

    expect(scoopsHeading).toContainHTML("<h2>Scoops</h2>");
    expect(toppingsHeading).toContainHTML("<h2>Toppings</h2>");
    expect(grandTotalHeading).toContainHTML("<h2>Grand total: $0.00</h2>");
  });
});

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
      res(ctx.status(500));
    }),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
      res(ctx.status(500));
    })
  );
  render(<OrderEntry />);
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("disable order button if no scoops are ordered", async () => {
  render(<OrderEntry />);
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  const orderBtn = screen.getByRole("button", { name: /order sundae/i });

  // order button is disabled by default
  expect(orderBtn).toBeDisabled();

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  expect(orderBtn).toBeEnabled();

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "0");

  expect(orderBtn).toBeDisabled();
});
