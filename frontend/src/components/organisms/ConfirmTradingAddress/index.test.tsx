import { render, fireEvent, screen, getByText } from "@testing-library/react";
import { ConfirmTradingAddress } from ".";
import { CONFIRM_TRADING } from "../../../utils/constants";
import { Provider } from "react-redux";
import store from "/src/store";
import { Business } from "/src/models/business";

const business:Business={
tradingAddress:[{id:1,address:"test address"}]
}

describe("ConfirmTradingAddress", () => {
  beforeEach(() => {
    render(<Provider store={store}><ConfirmTradingAddress business={business} /></Provider>);
  });

  test("renders correctly", () => {
    const title = screen.getByText(CONFIRM_TRADING.title);
    expect(title).toBeInTheDocument();
  });

  test("selects edit link", () => {
    const radioButton = screen.getByRole("radio");
    fireEvent.click(radioButton);
    expect(radioButton).toBeChecked();
    const linkone = screen.getByText("Edit");
    fireEvent.click(linkone);
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
  });

  test("selects edit link", () => {
    const radioButton = screen.getByRole("radio");
    fireEvent.click(radioButton);
    expect(radioButton).toBeChecked();
    const linkone = screen.getByText("Edit");
    fireEvent.click(linkone);
    const inputElement = screen.getByLabelText(/Trading address 1/i);
    fireEvent.change(inputElement, {
      target: { value: CONFIRM_TRADING.title }
    });
    const saveButton = screen.getByText("Cancel");
    fireEvent.click(saveButton);
  });

  test('displays modal when "Add Address" button is clicked', () => {
    const addButton = screen.getByText(CONFIRM_TRADING.buttonsContent[0]);
    fireEvent.click(addButton);
    const addAddress = screen.getByText(CONFIRM_TRADING.modal.btn);
    expect(addAddress).toBeInTheDocument();
    const inputElement = screen.getByLabelText(/Trading address/i);
    fireEvent.change(inputElement, {
      target: { value: CONFIRM_TRADING.title },
    });
    fireEvent.click(addAddress);
  });

  test("selects an address", () => {
    const address = screen.getByTestId("confirmPurchase");
    expect(address).toBeInTheDocument();
    fireEvent.click(address);
    
  });
  test('displays modal when "Add Address" button is clicked', () => {
    const addButton = screen.getByText(CONFIRM_TRADING.buttonsContent[0]);
    fireEvent.click(addButton);
    const addAddress = screen.getByText(CONFIRM_TRADING.modal.btn);
    expect(addAddress).toBeInTheDocument();
    const inputElement = screen.getByLabelText(/Trading address/i);
    expect(addAddress).toBeDisabled();
    fireEvent.change(inputElement, {
      target: { value:"  "},
    });
    expect(screen.getByText("Field is required"));
   
    fireEvent.click(addAddress);
  });

});

