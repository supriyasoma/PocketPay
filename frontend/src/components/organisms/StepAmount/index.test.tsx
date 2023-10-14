import { screen , render, fireEvent} from "@testing-library/react";
import { StepAmount } from ".";


jest.mock('/src/services', () => ({
  getCurrenciesAPI: jest.fn().mockImplementation((from) => {
    if (from == "gbp") {
      return Promise.resolve({
        data: {
          "date": "2023-07-20",
          "gbp": {
            "gbp": 1,
            "inr": 106.302956,
            "eur": 1.154313,
        },
      }});
    }
    if (from == "eur") {
      return Promise.resolve({
        data: {
          "date": "2023-07-20",
          "eur": {
            "eur": 1,
            "inr": 106.302956,
            "gbp": 1.154313,
        },
      }});
    }
    if (from == "inr") {
      return Promise.resolve({
        data: {
          "date": "2023-07-20",
          "inr": {
            "inr": 1,
            "eur": 106.302956,
            "gbp": 1.154313,
        },
      }});
    }
  }),
}));

const props = {
    title:"How much would you like to transfer?",
    handleContinueBtnClick:()=>{console.log("continue btn click!");}
};


describe("StepAmount", () => {
    it("should renders properly", () => {
      render(
        <StepAmount {...props}/>
      );
      const stepAmount = screen
        .getByTestId("step-amount");
      expect(stepAmount).toBeInTheDocument();

      const sendInput = screen.getByLabelText("You send");
      expect(sendInput).toBeInTheDocument();
      fireEvent.change(sendInput,{target:{value:100}});

      const continueBtn = screen.getByText("Continue");
      expect(continueBtn).toBeEnabled();
      fireEvent.click(continueBtn)

    });

    it("invoke modal open",()=>{
      render(
        <StepAmount {...props}/>
      );

      const modalBtn = screen.getByTestId("grow-rate-icon-btn");
      fireEvent.click(modalBtn);
      const modalCloseBtn = screen.getByTestId("modal-close-btn");
      fireEvent.click(modalCloseBtn);
    });

    it("should invoke currency from change event", () => {
      render(
        <StepAmount {...props}/>
      );
      const fromCurrency = screen.getByPlaceholderText("currency from");
      fireEvent.change(fromCurrency,{target:{value:"inr"}});
    });

    it("should invoke currency to change event", () => {
      render(
        <StepAmount {...props}/>
      );
    const toCurrency = screen.getByPlaceholderText("currency to");
    fireEvent.change(toCurrency,{target:{value:"gbp"}});
      });

});