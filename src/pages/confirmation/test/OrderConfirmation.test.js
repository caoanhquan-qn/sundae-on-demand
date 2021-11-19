import { rest } from "msw";
import { render, screen, waitFor } from "../../../test-utils/test-utils";
import { server } from "../../../mocks/server";
import OrderConfirmation from "../OrderConfirmation";

test("show alert for error when submitting order", async () => {
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (req, res, ctx) => {
      res.apply(ctx.status(500));
    })
  );
  render(<OrderConfirmation />);
  await waitFor(async () => {
    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();
  });
});
