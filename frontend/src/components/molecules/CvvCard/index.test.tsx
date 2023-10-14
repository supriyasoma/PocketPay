import { render, fireEvent } from "@testing-library/react";
import { CvvCard, CvvProps } from ".";
import { CVVcardconst } from "../../../utils/constants";
describe("CvvCard", () => {
  const defaultProps: CvvProps = {
    onChange: jest.fn(),
    onClick: jest.fn(),
    name: "cvvCard",
    variant: "contained",
    checked: true,
    cardname: "EUR Visa Debit",
    lastdigit: "Last four digit",
    cvvvalue: "9313",
    expiryvalue: "09/25",
    expirydate: "Expiry date",
  };
  it("should render the correct label and text values", () => {
    const { getByText } = render(<CvvCard {...defaultProps} />);
    const cardnameLabel = getByText("EUR Visa Debit");
    expect(cardnameLabel).toBeInTheDocument();
  });

  it("should call onClick event when checkbox is clicked", () => {
    const { getByTestId } = render(<CvvCard {...defaultProps} />);
    const checkbox = getByTestId("cvvcheckbox");
    fireEvent.click(checkbox);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it("should update input field value when changed", () => {
    const { getByPlaceholderText } = render(<CvvCard {...defaultProps} />);
    const inputField = getByPlaceholderText(CVVcardconst.placeholdername) as HTMLInputElement;
    fireEvent.change(inputField, { target: { value: "123" } });
    expect(inputField.value).toBe("123");
  });
});
