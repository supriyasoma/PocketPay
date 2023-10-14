import { render, fireEvent } from "@testing-library/react";
import { SideBarItem } from ".";
import homeIcon from "/public/assets/images/Muiicons/home.svg";
describe("SideBarItem", () => {
  test("renders icon and label, and triggers onClick event", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <SideBarItem srcIcon={homeIcon} title="Test Item" onClick={onClickMock} />
    );

    const labelElement = getByText("Test Item");
    expect(labelElement).toBeInTheDocument();
    fireEvent.click(labelElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
