import { render, screen } from "@testing-library/react";
import ConfirmPurchase, {
  TypographyComponentStyleHighEmp,
  TypographyComponentStyleMedEmp,
} from ".";

describe("ConfirmPurchase", () => {
  test("render properly", () => {
    render(
      <ConfirmPurchase
        line1={[
          ["GBP 100.00", TypographyComponentStyleHighEmp],
          [
            " to PocketPay using visa card ending ",
            TypographyComponentStyleMedEmp,
          ],
          ["9313", TypographyComponentStyleHighEmp],
        ]}
        lines={[
          "Step 1: Open and confirm the push notification we sent to your mobile.",
          "Step 2: Return to this screen and press the button below to finish your purchase.",
        ]}
        buttonLabel="Complete"
      />
    );
    const confirmPurchaseElement = screen.getByTestId("confirmPurchase");
    expect(confirmPurchaseElement).toBeInTheDocument();
  });
});
