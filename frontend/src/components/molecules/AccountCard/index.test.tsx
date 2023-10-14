import { fireEvent, render, screen } from "@testing-library/react";
import AccountCard from ".";

describe("AccountCard", () => {
  it("should render properly", () => {
    render(<AccountCard />);
    const accountCard = screen.getByTestId("accountCard");
    expect(accountCard).toBeInTheDocument();
  });
  it("should work with onClick properly", () => {
    const onClickMock = jest.fn();
    render(<AccountCard onClick={onClickMock} />);
    const accountCard = screen.getByTestId("accountCard");
    fireEvent.click(accountCard);
    expect(onClickMock).toBeCalledTimes(1);
  });
});
