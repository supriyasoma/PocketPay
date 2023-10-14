import React from "react";
import { render, fireEvent, getByTestId , screen} from "@testing-library/react";
import { PaymentOverallStatus, PaymentOverallStatusProps } from ".";
import { PaymentTracker } from "/src/models/payment-tracker";
import { STATUS_CANCEL } from "/src/utils/constants";
const steps = [
    {
      trackTime: "Today at 6:43 pm",
      status: "You set up your transfer",
      completed: false,
      active:true
    },
  ];

  const labelStyles = {
    fontSize: "14px",
    lineHeight: "21px",
  };
describe("PaymentOverallStatus", () => {
  const defaultProps: PaymentOverallStatusProps = {
    username: "John Doe",
    status: "Sending",
    uservalue: "500 GBP",
    convertednewvalue: "400 EUR",
    onClickShare: jest.fn(),
    onClickCancel: jest.fn(),
    accountname: "John Doe",
    accountnumber: "1234567890",
    labelStyles,
    steps:steps
  };

 

  test("renders PaymentOverallStatus component without errors", () => {
    render(<PaymentOverallStatus {...defaultProps} />);
  });

  test("displays the correct status", () => {
    const { getByText } = render(<PaymentOverallStatus {...defaultProps} />);
    const statusElement = getByText("Sending");
    expect(statusElement).toBeInTheDocument();
  });

  test("calls onClickCancel function when cancel button is clicked", () => {
    const { getByText } = render(<PaymentOverallStatus {...defaultProps} />);
    const cancelButton = getByText("Cancel the transfer");
    fireEvent.click(cancelButton);
    expect(defaultProps.onClickCancel).toHaveBeenCalledTimes(1);
  });

  test("payment status tab change",()=>{
     render(<PaymentOverallStatus {...defaultProps} />);
    const expandBtn = screen.getByTestId("exapand-btn");
    fireEvent.click(expandBtn);
  });
  test("payment status cancell",()=>{
    render(<PaymentOverallStatus status={STATUS_CANCEL} {...defaultProps} />);
 });
});
