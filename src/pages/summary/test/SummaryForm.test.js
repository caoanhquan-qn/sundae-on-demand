import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

describe("summary form", () => {
  test("checkbox is unchecked and button is disabled by default", () => {
    render(<SummaryForm />);
    const conditionCheckBox = screen.getByTestId("condition-checkbox");
    const confirmButton = screen.getByTestId("confirm-order-button");
    expect(conditionCheckBox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
  });

  test("checking checkbox enables button and unchecking checkbox again disables button", () => {
    render(<SummaryForm />);
    const conditionCheckBox = screen.getByTestId("condition-checkbox");
    const confirmButton = screen.getByTestId("confirm-order-button");

    userEvent.click(conditionCheckBox);

    // checking checkbox enables button
    expect(confirmButton).toBeEnabled();

    // unchecking checkbox again disables button
    userEvent.click(conditionCheckBox);
    expect(confirmButton).toBeDisabled();
  });
  test("popover responds to hover", async () => {
    render(<SummaryForm />);

    // popover starts out hidden
    const hiddenPopover = screen.queryByText(
      /No ice cream will actually be delivered/i
    );
    expect(hiddenPopover).not.toBeInTheDocument();

    // popover appears upon mouseover of checkbox label
    const termsConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsConditions);
    const popover = screen.getByText(
      /No ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouse out
    userEvent.unhover(termsConditions);
    const hiddenPopoverAgain = screen.queryByText(
      /No ice cream will actually be delivered/i
    );
    await waitFor(() => {
      expect(hiddenPopoverAgain).not.toBeInTheDocument();
    });
  });
});
