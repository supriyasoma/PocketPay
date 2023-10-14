import { render,screen } from "@testing-library/react";
import { TypographyComponent } from ".";

const props = {
    variant:"caption",
    children:"Already have an account ? Log in",
    style:{
        fontSize:"14px",
        lineHeight:"21px",
        color:"#77767A"
        
    },
    id:"test-typography",
    title:"login caption"
};

describe('TypographyComponent', () => {
    it('shoudl render TypographyComponent', () => {
      render(<TypographyComponent {...props}> </TypographyComponent>);
      const typography = screen.getByTitle("login caption");
      expect(typography).toBeInTheDocument();
    });
  });