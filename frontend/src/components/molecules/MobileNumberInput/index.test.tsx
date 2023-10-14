import { render,screen } from "@testing-library/react";
import  MobileNumberInput from '.';

const props ={
    label:"Mobile",
    defaultCountry:"us",
    onChange:()=>{}
};

describe("MobileNumberInput", () => {
    it("should renders properly", () => {
      render(<MobileNumberInput {...props}/>);
      const phoneInput = screen.getByTestId("phone-num-input");
      expect(phoneInput).toBeInTheDocument();
    });
  });