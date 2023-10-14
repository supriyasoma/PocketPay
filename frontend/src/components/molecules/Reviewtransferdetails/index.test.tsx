import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { ReviewTransferDetails, TextFieldData } from ".";

describe("ReviewTransferDetails", () => {
  let textFieldData: TextFieldData[];
  let handleChange: jest.Mock;
  let handleCancel: jest.Mock;
  let handleSave: jest.Mock;

  beforeEach(() => {
    textFieldData = [
      {
        id: "1",
        label: "Amount",
        disabled: false,
        value: "100.00 GBP",
      },
      {
        id: "2",
        label: "Fee",
        disabled: true,
        value: "00.00 GBP",
      },
      {
        id: "3",
        label: "Amount we'll convert",
        disabled: true,
        value: "77.74 GBP",
      },
      {
        id: "4",
        label: "Guarantee rate",
        disabled: true,
        value: "1 GBP = 1.14 EUR",
      },
    ];

    handleChange = jest.fn();
    handleSave = jest.fn();
  });

  test("renders the component with provided props", () => {
    render(
      <ReviewTransferDetails
        handleChange={handleChange}
        textFieldData={textFieldData}
        buttonlabelone="Cancel"
        buttonlabeltwo="Save"
        heading="Transfer Details"
        handleCancel={handleCancel}
        handleSave={handleSave}
      />
    );
    expect(screen.getByText("Transfer Details")).toBeInTheDocument();

    textFieldData.forEach((field) => {
      expect(screen.getByLabelText(field.label)).toHaveValue(field.value);
    });

    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  test("calls the handleChange function when a text field is changed", () => {
    render(
      <ReviewTransferDetails
        handleChange={handleChange}
        textFieldData={textFieldData}
        buttonlabelone="Cancel"
        buttonlabeltwo="Save"
        heading="Transfer Details"
        handleCancel={handleCancel}
        handleSave={handleSave}
      />
    );

    const amountField = screen.getByLabelText("Amount");
    fireEvent.change(amountField, { target: { value: "200.00 GBP" } });
    expect(handleChange).toHaveBeenCalledWith("1");
  });

  test("calls the handleSave function when the save button is clicked", () => {
    render(
      <ReviewTransferDetails
        handleChange={handleChange}
        textFieldData={textFieldData}
        buttonlabelone="Cancel"
        buttonlabeltwo="Save"
        heading="Transfer Details"
        handleCancel={handleCancel}
        handleSave={handleSave}
      />
    );

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    expect(handleSave).toHaveBeenCalled();
  });
});
