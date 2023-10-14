import React from 'react';
import { fireEvent,screen } from '@testing-library/react';
import { LogInComponent } from '.';
import { render } from '../../../test-setUp';
import { useAuth0 } from '@auth0/auth0-react';
import '@testing-library/jest-dom';
const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|12345678901234',
};
jest.mock('@auth0/auth0-react');
jest.mock('/src/services', () => ({
  login: jest.fn().mockImplementation((data) => {
    if(data?.email == "user@test.com"){
      return Promise.resolve({
        data: true,
        status:200
      });
    }
    else if(data?.email == "user12@test.com"){
      return Promise.resolve({
        data: true,
        status:404
      });
    }
    else {
      return Promise.reject();
    }
      
  })
}));
describe('Login component', () => {
  beforeEach(() => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
  });

  it('should call onClick handler when social icon is clicked', () => {
    const { getAllByAltText } = render(<LogInComponent />);
    const socialIcons = getAllByAltText(/Icon/);
    
    socialIcons.forEach((icon) => {
      fireEvent.click(icon);
    });
  });
  it("render button click correct",()=>{
    render(<LogInComponent/>);
    const signUpButton = screen.getByRole('button', { name: /Log in/i });
      fireEvent.click(signUpButton);  
  })
  it('shows error messages for invalid email and password', () => {
    render(<LogInComponent />);
    const emailField = screen.getByPlaceholderText('Enter your email address');
    fireEvent.change(emailField, { target: { value: 'invalidemail' } });
    fireEvent.blur(emailField);

    fireEvent.change(emailField, { target: { value: 'test@test.com' } });
    fireEvent.blur(emailField);

    fireEvent.change(emailField, { target: { value: '' } });
    fireEvent.blur(emailField);
    fireEvent.focus(emailField);

    const passwordField = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(passwordField, { target: { value: 'pass' } });
    fireEvent.blur(passwordField);

    fireEvent.change(passwordField, { target: { value: '12345678' } });
    fireEvent.blur(passwordField);

    fireEvent.change(passwordField, { target: { value: 'Jasdfghv' } });
    fireEvent.blur(passwordField);

    fireEvent.change(passwordField, { target: { value: 'jflkjsdkej' } });
    fireEvent.blur(passwordField);

    fireEvent.change(passwordField, { target: { value: '' } });
    fireEvent.blur(passwordField);
    fireEvent.focus(passwordField);
    fireEvent.change(passwordField, { target: { value: 'Jagadeesh12' } });
    fireEvent.blur(passwordField);
  });
  test('should show password', () => {
    render(<LogInComponent />);
    const showPasswordButton = screen.getByAltText('eye is loading');
    fireEvent.click(showPasswordButton);
    const passwordInput = screen.getByPlaceholderText(
      'Enter your password',
    ) as HTMLInputElement;
    expect(passwordInput.type).toBe('text');
  });

  test("login success",()=>{
    render(<LogInComponent />);
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });

    const passwordField = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(passwordField, { target: { value: 'password' } });

    const signUpButton = screen.getByRole('button', { name: /Log in/i });
    expect(signUpButton).toBeEnabled();
    fireEvent.click(signUpButton);

  })

  test("login fail",()=>{
    render(<LogInComponent />);
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    fireEvent.change(emailInput, { target: { value: 'user12@test.com' } });

    const passwordField = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(passwordField, { target: { value: 'password' } });

    const signUpButton = screen.getByRole('button', { name: /Log in/i });
    expect(signUpButton).toBeEnabled();
    fireEvent.click(signUpButton);

  })

  test("login error",()=>{
    render(<LogInComponent />);
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    fireEvent.change(emailInput, { target: { value: 'abc@test.com' } });

    const passwordField = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(passwordField, { target: { value: 'password' } });

    const signUpButton = screen.getByRole('button', { name: /Log in/i });
    expect(signUpButton).toBeEnabled();
    fireEvent.click(signUpButton);

  })
});
