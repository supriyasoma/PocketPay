import { fireEvent, render, screen } from "@testing-library/react";
import { StepPay } from ".";
import { TRANSACTION_DATA } from "/src/utils/constants";
import { Provider } from "react-redux";
import store from "/src/store";

const props = {
  transaction:TRANSACTION_DATA
}

describe("StepPay", () => {
  it("should renders properly", () => {
    render(<Provider store={store}><StepPay {...props} /></Provider>);
    const stepPay = screen.getByTestId("step-pay");
    expect(stepPay).toBeInTheDocument();
  });

  it("invoke continue to pay click", () => {
    const mockHandler = jest.fn();
    render(<Provider store={store}><StepPay {...props} handleContinueClick={mockHandler} /></Provider>);
    const continueBtn = screen.getByTestId("step-continue-to-pay-btn");
    expect(continueBtn).toBeInTheDocument();
    fireEvent.click(continueBtn);
  });

  it("invoke cancel to pay click", () => {
    const mockHandler = jest.fn();
    render(<Provider store={store}><StepPay {...props} handleCancelClick={mockHandler} /></Provider>);
    const cancelBtn = screen.getByTestId("step-cancel-pay-btn");
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);
  });
});
