import { fireEvent, render , screen} from "@testing-library/react";
import { PayFromYourBankComponent } from ".";

describe("PayFromYourBankComponent", () => {
    it("should renders properly", () => {
      render(
        <PayFromYourBankComponent />
      );
      const payFromBank = screen.getByTestId("pay-from-bank-org");
      expect(payFromBank).toBeInTheDocument();
    });

    it("invoke handleContinueClick", () => {
        render(
          <PayFromYourBankComponent />
        );
        const continueBtn = screen.getByText("Continue to pay");
          fireEvent.click(continueBtn);
      });
});