import { render, fireEvent, screen } from "@testing-library/react";
import { PayWithYourCard } from ".";
import { CVVcardconst } from "../../../utils/constants";
import { Provider } from "react-redux";
import store from "/src/store";

describe("PayWithYourCard", () => {
  test("renders without error", () => {
    render(<Provider store={store}><PayWithYourCard /></Provider>);
    const text = screen.getByText("Pay with your card");
    expect(text).toBeInTheDocument();
  });
  test("updates CVV value and error on input change", () => {
    render(<Provider store={store}><PayWithYourCard /></Provider>);

    const inputFields = screen.getAllByPlaceholderText(
      CVVcardconst.placeholdername
    );
    const cvvInput = inputFields[0] as HTMLInputElement;
    fireEvent.change(cvvInput, { target: { value: "123" } });
    fireEvent.change(cvvInput, { target: { value: "" } });
    fireEvent.change(cvvInput, { target: { value: "abc" } });
    fireEvent.change(cvvInput, { target: { value: "1" } });

    const button = screen.getByText("Continue to pay");
    fireEvent.click(button);
    const button2 = screen.getByText("Cancel this transfer");
    fireEvent.click(button2);
  });
});
