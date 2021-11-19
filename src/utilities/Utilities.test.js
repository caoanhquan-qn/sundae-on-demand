import { formatCurrency } from ".";

test("format a number as a currency", () => {
  expect(formatCurrency(5)).toBe("$5.00");
});
