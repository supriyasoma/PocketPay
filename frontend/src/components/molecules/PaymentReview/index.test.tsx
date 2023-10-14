import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { PaymentReviews } from ".";

describe("PaymentReviews", () => {
  test("handles button clicks correctly", () => {
    const onClickOneMock = jest.fn();
    const onClickTwoMock = jest.fn();

    const { getByText } = render(
      <PaymentReviews
        onClickone={onClickOneMock}
        onClicktwo={onClickTwoMock}
      />
    );
    fireEvent.click(getByText("Continue to pay"));
    fireEvent.click(getByText("Cancel this transfer"));
    expect(onClickOneMock).toHaveBeenCalled();
    expect(onClickTwoMock).toHaveBeenCalled();
  });
});
