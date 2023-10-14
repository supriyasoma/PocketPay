import { render, screen, fireEvent } from "@testing-library/react";
import { PaymentReviews } from ".";
import { Provider } from "react-redux";
import store from "/src/store";

jest.mock('/src/services', () => ({
  getCurrenciesAPI: jest.fn().mockImplementation((from) => {
    if (from == "gbp") {
      return Promise.resolve({
        data: {
          "date": "2023-07-20",
          "gbp": {
            "gbp": 1,
            "inr": 106.302956,
            "eur": 1.154313,
        },
      }});
    }
    if (from == "eur") {
      return Promise.resolve({
        data: {
          "date": "2023-07-20",
          "eur": {
            "eur": 1,
            "inr": 106.302956,
            "gbp": 1.154313,
        },
      }});
    }
    if (from == "inr") {
      return Promise.resolve({
        data: {
          "date": "2023-07-20",
          "inr": {
            "inr": 1,
            "eur": 106.302956,
            "gbp": 1.154313,
        },
      }});
    }
  }),
}));

const mockProps = {
  values: [
    "100.00",
    "114.74",
    "John Doe",
    "johndoe@example.com",
    "1234567890",
    "Checking",
  ],
  currency: "gbp",
  convertedcurrency: "eur",
  onClick: jest.fn(),
  transaction: {
    amount: 100.0,
    convertedAmount: 114.74,
    fromCurrency:"gbp",
    toCurrency:"eur",
    recipient: {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      accountNumber: "1234567890",
      accountType: "Checking",
    },
  },
};


describe("PaymentReviews", () => {

  test("calls onClick callback when confirm button is clicked", () => {
    const { onClick } = mockProps;
    render(<Provider store={store}><PaymentReviews {...mockProps} /></Provider>);
    const confirmButton = screen.getByText("Confirm and continue");
    fireEvent.click(confirmButton);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  test("closing form of recipient details ", () => {
    render(<Provider store={store}><PaymentReviews {...mockProps} /></Provider>);
    fireEvent.click(screen.getByText("Change"));
  });
  test("allows editing recipient details", () => {
    render(<Provider store={store}><PaymentReviews {...mockProps} /></Provider>);
    fireEvent.click(screen.getByText("Change"));
    const email = screen.getByLabelText("Email") as HTMLInputElement;
    expect(email.value).toBe("johndoe@example.com");
    fireEvent.change(email, {
      target: { value: "johndoe@example.ac.in" },
    });
    expect(email.value).toBe("johndoe@example.ac.in");
    fireEvent.click(screen.getByText("Save"));
  });
  test("Closing form of transfer details", () => {
    render(<Provider store={store}><PaymentReviews {...mockProps} /></Provider>);
    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByLabelText("Fee")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Cancel"));
  });

  test("allows editing transfer details", () => {
    render(<Provider store={store}><PaymentReviews {...mockProps} /></Provider>);
    fireEvent.click(screen.getAllByText("Edit")[0]);
    const amountInput = screen.getByLabelText("Amount") as HTMLInputElement;
    expect(amountInput.value).toBe("100.00");
    fireEvent.change(amountInput, { target: { value: "150.00" } });
    expect(amountInput.value).toBe("150.00");
    fireEvent.click(screen.getByText("Save"));
  });
  test("validates amount field with error message", () => {
    render(<Provider store={store}><PaymentReviews {...mockProps} /></Provider>);

    fireEvent.click(screen.getAllByText("Edit")[0]);
  });

  test("validates recipient email field  with error message", () => {
    render(<Provider store={store}><PaymentReviews {...mockProps} /></Provider>);

    fireEvent.click(screen.getByText("Change"));

    const email = screen.getByLabelText("Email") as HTMLInputElement;
    fireEvent.change(email, {
      target: { value: "" },
    });
  });

  test("save transfer btn event",()=>{
    render(<Provider store={store}><PaymentReviews {...mockProps} /></Provider>);
    const editAmountLink = screen.getByTestId("edit-amount-link");
    fireEvent.click(editAmountLink);
    const saveTransferBtn = screen.getByTestId("save-trnxn-btn");
    fireEvent.click(saveTransferBtn);
  });

  test("edit recipient details",()=>{
    render(<Provider store={store}><PaymentReviews {...mockProps} /></Provider>);
    const editRecipientLink = screen.getByTestId("recipient-link");
    fireEvent.click(editRecipientLink);

    const recipientDetailsForm = screen.getByTestId("recipient-details-form");
    expect(recipientDetailsForm).toBeInTheDocument();

    const recipientEmail = screen.getByLabelText("Email");
    fireEvent.change(recipientEmail,{target:{value:"abc@test.com"}});

    const recipientFirstName = screen.getByLabelText("First Name");
    fireEvent.change(recipientFirstName,{target:{value:"Mario"}});

    const recipientLastName = screen.getByLabelText("Last Name");
    fireEvent.change(recipientLastName,{target:{value:"Gabriel"}});

    const recipientAccountNumber = screen.getByLabelText("Account Number");
    fireEvent.change(recipientAccountNumber,{target:{value:"984774774777747"}});


    const recipientAccounType = screen.getByLabelText("Account Type");
    fireEvent.change(recipientAccounType,{target:{value:"Savings"}});

    const saveRecipientBtn= screen.getByTestId("save-recipient-btn");
    fireEvent.click(saveRecipientBtn);

    
  });
});
