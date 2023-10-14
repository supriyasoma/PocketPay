import { fireEvent, render, screen } from "@testing-library/react";
import { SearchBar } from ".";
import { searchBarData } from "../../../utils/constants";
import { Provider } from "react-redux";
import store from "/src/store";
describe("SearchBar", () => {

  it("renders properly with footer", () => {
    render(
      <Provider store={store}>
      <SearchBar
        data={searchBarData}
        showFooter={true}
        placeholderTextField="Search your business"
      />
      </Provider>
    );

    const searchBar = screen.getByTestId("searchBar");
    expect(searchBar).toBeInTheDocument();
  });
  it("renders properly", () => {
    const onChange = jest.fn();
    render(
      <Provider store={store}>
      <SearchBar
        data={searchBarData}
        showFooter={false}
        placeholderTextField="Search your business"
        onChange={onChange}
       
      />
      </Provider>
    );

    const textField = screen
      .getByTestId("textFieldInSearchBar")
      .querySelector("input")!;
    fireEvent.input(textField, { target: { value: "Zentech" } });
    const amazonText = screen.getByText(/Zentech/i);
    fireEvent.click(amazonText);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({"id": 1, "label": "Zentech solutions Pvt Ltd ab", "name": "Zentech solutions Pvt Ltd ab"});
  });
});
