import { render, fireEvent } from "@testing-library/react";
import { TradingAddress, TradingAddressprops } from ".";

describe("TradingAddress", () => {
  const defaultProps: TradingAddressprops = {
    buttonlabel: "Add",
    inputlabel: "Trading Address 2",
    typovariant: "body1",
    headingofcard: "Add trading address",
    showinputfield: true,
    onChange: jest.fn(),
    onClick: jest.fn(),
  };

  it("should render correctly with default props", () => {
    const { getByText, getByLabelText } = render(
      <TradingAddress {...defaultProps} />
    );
    expect(getByText(defaultProps.buttonlabel)).toBeInTheDocument();
    expect(getByText(defaultProps.headingofcard)).toBeInTheDocument();
    expect(getByLabelText(defaultProps.inputlabel)).toBeInTheDocument();
  });

  it("should trigger onChange when input value changes", () => {
    const { getByLabelText } = render(<TradingAddress {...defaultProps} />);
    const inputElement = getByLabelText(
      defaultProps.inputlabel
    ) as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: "Test address" } });

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it("should trigger onClick when button is clicked", () => {
    const { getByText } = render(<TradingAddress {...defaultProps} />);
    const buttonElement = getByText(
      defaultProps.buttonlabel
    ) as HTMLButtonElement;

    fireEvent.click(buttonElement);

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });
});
