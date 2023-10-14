import { fireEvent, render,screen } from "@testing-library/react";
import { HeaderComponent } from ".";
import ProfileImage from '/public/asstes/images/profile.svg';

const props = {
    userDetails: {
        firstName: "Ros",
        lastName: "Genner",
        uniqueId: "P44561754",
      }
};

describe("HeaderComponent", () => {
    it("should renders properly with avatar image", () => {
      const withProfileProps = {
        userDetails: {
            firstName: "Ros",
            lastName: "Genner",
            uniqueId: "P44561754",
            profileImage:ProfileImage
          }
    };
      render(
        <HeaderComponent {...withProfileProps}/>
      );
      const header = screen
        .getByTestId("header");
      expect(header).toBeInTheDocument();
    });
    it("should renders properly without avatar image", () => {
  
      render(
        <HeaderComponent {...props}/>
      );
      const header = screen
        .getByTestId("header");
      expect(header).toBeInTheDocument();
    });

    it("should renders properly", () => {
      render(
        <HeaderComponent {...props}/>
      );
      const header = screen
        .getByTestId("header");
      expect(header).toBeInTheDocument();
    });

    it("shoud invoke popup open",()=>{
      render(
        <HeaderComponent {...props}/>
      );
      const btn = screen.getByTestId("popver-btn");
      fireEvent.click(btn);
    });

});