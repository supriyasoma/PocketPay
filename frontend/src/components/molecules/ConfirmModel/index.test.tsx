import { render, screen } from "@testing-library/react";
import { Popper } from ".";

test("Popper renders correctly when open is true", () => {
  render(<Popper open={true} />);
  const modalPopper = screen.getByRole("presentation");
  expect(modalPopper).toBeInTheDocument();
});

test("Popper renders correctly when open is false", () => {
  render(<Popper open={false} />);
  const modalPopper = screen.queryByRole("presentation");
  expect(modalPopper).not.toBeInTheDocument();
});

test("Clicking on the Yes button calls the onCancel callback", () => {
  const onCancelMock = jest.fn();
  render(<Popper open={true} onCancel={onCancelMock} />);
  const yesButton = screen.getByTestId("confirm-button");
  yesButton.click();
  expect(onCancelMock).toHaveBeenCalledTimes(1);
});

test("Clicking on the No button calls the onClose callback", () => {
  const onCloseMock = jest.fn();
  render(<Popper open={true} onClose={onCloseMock} />);
  const noButton = screen.getByTestId("cancel-button");
  noButton.click();
  expect(onCloseMock).toHaveBeenCalledTimes(1);
});
