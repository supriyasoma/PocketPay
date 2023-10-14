import { render, fireEvent,screen } from "@testing-library/react";
import { CancelTransferModal } from ".";
import {
  EXISTING_ACCOUNT,
} from "../../../utils/constants";
describe("CancelTransferModal", () => {
  it("should render the modal when open prop is true", () => {
    const { getByTestId } = render(
      <CancelTransferModal handleOpen={jest.fn()} open={true} />
    );
    const modal = getByTestId("cancelModel");
    expect(modal).toBeInTheDocument();
  });

  it("should close the modal when open prop is false", () => {
    const { queryByTestId } = render(
      <CancelTransferModal handleOpen={jest.fn()} open={false} />
    );
    const modal = queryByTestId("cancel-modal");
    expect(modal).not.toBeInTheDocument();
  });

  it("should show dropdowns when 'Existing Account' is clicked", () => {
    const { getByText, getByTestId } = render(
      <CancelTransferModal handleOpen={jest.fn()} open={true} />
    );
    const existingAccountCard = getByText("An existing account");
    fireEvent.click(existingAccountCard);
  });
   it("should call handleOpen when button is clicked", () => {
    const handleOpenMock = jest.fn();
    render(
      <CancelTransferModal handleOpen={handleOpenMock} open={true} />
    );
    const existingAccountCards = screen.getByText(EXISTING_ACCOUNT);
    fireEvent.click(existingAccountCards);
    
    const selectAccountText = screen.getByText(
      "Select an option"
    ) as HTMLSelectElement; 
    fireEvent.keyDown(selectAccountText, { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Ending in 4656"));
    const signUpButton = screen.getByText("Cancel transfer");
      fireEvent.click(signUpButton);
  });
});