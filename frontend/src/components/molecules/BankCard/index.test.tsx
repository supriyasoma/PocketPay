import { render, screen } from "@testing-library/react";
import BankCard from ".";
import SBI from "../../../../public/assets/images/Bank/sbi.svg";
import RightArrow from "../../../../public/assets/images/Muiicons/chevron-right.svg";

describe("BankCard", () => {
  it("renders properly", () => {
    render(
      <BankCard
        bankIcon={SBI}
        bankName="State Bank of India"
        trailingIcon={RightArrow}
      />
    );
    const bankCard = screen.getByTestId("bankCard");
    expect(bankCard).toBeInTheDocument();
  });
});
