import { render, screen, fireEvent } from "@testing-library/react";
import SearchBusiness from ".";
import { Provider } from "react-redux";
import store from "/src/store";

describe("SearchBusiness component", () => {
  it("renders initial form correctly", () => {
    render(
      <Provider store={store}>
      <SearchBusiness
        handleconfirm={jest.fn()}
      />
      </Provider>
    );
  });

  it("renders properly with save option", () => {
    const handleConfirm = jest.fn();
    render(
      <Provider store={store}>
      <SearchBusiness
        handleconfirm={handleConfirm}
      />
      </Provider>
    );
    const link = screen.getByText("Edit");
    fireEvent.click(link);
    const businessNameInput = screen.getByLabelText("Business name");
    const registrationNumberInput = screen.getByLabelText(
      "Registration number"
    );
    const registeredAddressInput = screen.getByLabelText("Registered address");
    fireEvent.change(businessNameInput, {
      target: { value: "New Business Name" },
    });
    fireEvent.change(registrationNumberInput, {
      target: { value: "9876543210" },
    });
    fireEvent.change(registeredAddressInput, {
      target: { value: "New Sample Address" },
    });
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    expect(screen.getByText("New Business Name")).toBeInTheDocument();
    expect(screen.getByText("New Sample Address")).toBeInTheDocument();
    const linkone = screen.getByText("Edit");
    fireEvent.click(linkone);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(screen.queryByLabelText("Business name")).not.toBeInTheDocument();
  });
  it("displays error messages for empty fields", () => {
    render(<Provider store={store}><SearchBusiness handleconfirm={jest.fn()} /></Provider>);
    const link = screen.getByText("Edit");
    fireEvent.click(link);
    const businessNameInput = screen.getByLabelText("Business name");
    fireEvent.change(businessNameInput, {
      target: { value:"" },
    });
   
  });
});
