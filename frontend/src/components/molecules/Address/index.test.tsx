import { fireEvent, render, screen } from "@testing-library/react";
import { AddressCard, Addressprops } from ".";

describe("AddressCard", () => {
  const defaultProps: Addressprops = {
    address:
      "#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054",
  };

  it("renders properly with the expected label and address", () => {
    render(<AddressCard {...defaultProps} />);

    const addressElement = screen.getByText(
      "#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054"
    );
    expect(addressElement).toBeInTheDocument();
  });

  it("renders the radio button as unchecked when checked is false", () => {
    render(<AddressCard {...defaultProps} />);

    const radioButton = screen.getByRole("radio");

    expect(radioButton).not.toBeChecked();
    fireEvent.click(radioButton);
    expect(radioButton).toBeChecked();
  });
});
