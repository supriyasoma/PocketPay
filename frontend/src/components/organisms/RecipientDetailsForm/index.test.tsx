import { screen, fireEvent } from '@testing-library/react';
import { RecipientDetailsForm } from '.';
import { render } from '/src/test-setUp';
import { Provider } from 'react-redux';
import store from '/src/store';

describe('RecipientDetailsForm', () => {
  beforeEach(() => {
    render(<Provider store={store}><RecipientDetailsForm /></Provider>);
  });

  test('renders the form components', () => {
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Account number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('First name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('IFSC code')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('I know their bank details')).toBeInTheDocument();
    expect(screen.getByText('Recipient details')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  test('disables the Continue button when form fields are empty', () => {
    const continueButton = screen.getByText('Continue');

    expect(continueButton).toBeDisabled();
  });

  test('enables the Continue button when all form fields are filled correctly', () => {
    const emailInput = screen.getByPlaceholderText('Email');
    const accountNoInput = screen.getByPlaceholderText('Account number');
    const firstNameInput = screen.getByPlaceholderText('First name');
    const lastNameInput = screen.getByPlaceholderText('Last name');
    const ifscCodeInput = screen.getByPlaceholderText('IFSC code');
    const accountTypeSelect = screen.getByTestId('select');
    const checkbox = screen.getByRole('checkbox');
    const continueButton = screen.getByText('Continue');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(accountNoInput, { target: { value: '1234567890' } });
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(ifscCodeInput, { target: { value: 'ABC123' } });
    fireEvent.click(checkbox);

    const selectAccountText = screen.getByLabelText(
        "Account Type"
      ) as HTMLSelectElement; 
      fireEvent.keyDown(selectAccountText, { key: "ArrowDown" });
      fireEvent.click(screen.getByText("Savings"));
    expect(continueButton).toBeEnabled();
    fireEvent.click(continueButton)
  });

  test('displays error messages for invalid form fields', () => {
    const emailInput = screen.getByPlaceholderText('Email');
    const accountNoInput = screen.getByPlaceholderText('Account number');
    const ifscCodeInput = screen.getByPlaceholderText('IFSC code');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(accountNoInput, { target: { value: 'abc' } });
    fireEvent.change(ifscCodeInput, { target: { value: 'AB' } });

    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    expect(screen.getByText('AccountNumber must contain only numbers')).toBeInTheDocument();
    expect(screen.getByText('IFSC code must be above 3 characters')).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(accountNoInput, { target: { value: '' } });
    fireEvent.change(accountNoInput, { target: { value: '12345' } });
    fireEvent.change(ifscCodeInput, { target: { value: '' } });
  });


});
