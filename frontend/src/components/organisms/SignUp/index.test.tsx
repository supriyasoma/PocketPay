import React from "react";
import "@testing-library/jest-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import { fireEvent, screen } from "@testing-library/react";

import { SignUp } from ".";
import { render } from "/src/test-setUp";
import store from "/src/store";
jest.mock("/src/services", () => ({
  getMyData: jest.fn().mockImplementation((url) => {
    if (url.includes("user?email=user1@gmail.com")) {
      return Promise.resolve({
        data: [
          {
            id: 1,
            email: "user1@gmail.com",
            password: "123456789",
            firstName: "jagadeesh",
            lastName: "palla",
            dob: "23/11/2000",
          },
        ],
      });
    } else {
      return Promise.resolve({ data: [] });
    }
  }),
  post: jest.fn().mockResolvedValue({}),
}));

const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234",
};
jest.mock("@auth0/auth0-react");

describe("SignUp component", () => {
  beforeEach(() => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
  });

  it("should call onClick handler when social icon is clicked", () => {
    const { getAllByAltText } = render(<Provider store={store}><SignUp /></Provider>);
    const socialIcons = getAllByAltText(/Icon/);

    socialIcons.forEach((icon) => {
      fireEvent.click(icon);
    });
  });
  it("shows error messages for invalid email and password", () => {
    render(<Provider store={store}><SignUp /></Provider>);
    const emailField = screen.getByPlaceholderText("Enter your email address");
    fireEvent.change(emailField, { target: { value: "invalidemail" } });
    fireEvent.blur(emailField);

    fireEvent.change(emailField, { target: { value: "" } });
    fireEvent.blur(emailField);
    fireEvent.focus(emailField);

    fireEvent.change(emailField, { target: { value: "user1@gmail.com" } });
    fireEvent.blur(emailField);

    const signUpButton = screen.getByText("Sign up");
    expect(signUpButton).toBeEnabled();
    fireEvent.click(signUpButton);
  });

  it("sign up should be successfull", () => {
    render(<Provider store={store}><SignUp /></Provider>);
    const emailField = screen.getByPlaceholderText("Enter your email address");
    fireEvent.change(emailField, { target: { value: "user1123@gmail.com" } });
    fireEvent.blur(emailField);

    const signUpButton = screen.getByText("Sign up");
    expect(signUpButton).toBeEnabled();
    fireEvent.click(signUpButton);
  });

  it("should navigate to login page on login link click",()=>{
    render(<Provider store={store}><SignUp /></Provider>);
    const link = screen.getByTestId("login-link");
    fireEvent.click(link);
  });

});
