import { act, fireEvent, render, screen } from "@testing-library/react";
import PocketPayPurpose from ".";
import { Provider } from "react-redux";
import store from "/src/store";

describe("PocketPayPu", () => {
  test("render title correctly", () => {
    render(<Provider store={store}><PocketPayPurpose /></Provider>);
    const title = screen.getByText("What’s the purpose for using PocketPay?");
    expect(title).toBeInTheDocument();

    const selectCategoryTextElements = screen.getAllByLabelText(
      "Tell us what you’re using PocketPay for"
    );
    const selectCategoryText =
      selectCategoryTextElements[0] as HTMLSelectElement;
    fireEvent.keyDown(selectCategoryText, { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Paying for goods or services abroad"));
    fireEvent.click(screen.getByText("Continue"));
  });
});
