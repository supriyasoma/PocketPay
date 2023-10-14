import { render , screen} from "@testing-library/react";
import { TypographyComponent } from "../Typography";
import { TextFieldComponent } from ".";

const props = {
    type:"text",
    placeholder:"Enter code here",
    size:"large",
    id:"text-input",
    required:true
};

describe('TextFieldComponent', () => {
    it('renders TextFieldComponent', () => {
      render(<TextFieldComponent {...props}> </TextFieldComponent>);
      const input = screen.getByPlaceholderText('Enter code here');
      expect(input).toBeInTheDocument();
      expect(input).toBeRequired();
    });
  });