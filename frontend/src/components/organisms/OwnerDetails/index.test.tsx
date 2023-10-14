import { render, screen, fireEvent, act } from '@testing-library/react';
import { OwnerDetails } from '.';
import { Provider } from 'react-redux';
import store from '/src/store';

jest.mock('/src/services', () => ({
  getMyData: jest.fn().mockImplementation((url) => {
    if (url.includes('countries')) {
      return Promise.resolve({
        data: [
          {
            "id": 1,
            "name": "United kingdom",
            "flagSrc": "./assets/images/flags/uk.png"
          },
          {
            "id": 2,
            "name": "India",
            "flagSrc": "./assets/images/flags/india.svg"
          }
        ],
      });
    } 
    return Promise.resolve();
  }),
  postMyData: jest.fn(),
}));

describe('OwnerDetails', () => {
  
    it('renders correctly', async () => {

      render(<Provider store={store}><OwnerDetails mainTitle="Main Title" subTitle="Sub Title" nameTitle="Director" buttonLabel="Add Director" /></Provider>);
     
      expect(screen.getByText('Main Title')).toBeInTheDocument();
    
      expect(screen.getByText('Sub Title')).toBeInTheDocument();

      const firstNameInput = screen.getByPlaceholderText('First name');
      const lastNameInput = screen.getByPlaceholderText('Last name');
      const dob = screen.getByPlaceholderText('Date of birth');

      fireEvent.change(firstNameInput,{target: {value:'jaggu'}});
      fireEvent.change(lastNameInput,{target: {value:'palla'}});
      fireEvent.change(dob,{target: {value:'21/07/2000',property:'dob'}});
      const continuebutton=screen.getByText("Continue");
      expect(continuebutton).toBeDisabled();
      const countryInput = screen.getByLabelText('Country of residence');
      fireEvent.mouseDown(countryInput); // Open the dropdown
      fireEvent.click(continuebutton);
     
    });

    it('renders correctly with shareholder', async () => {
      const setLabelDate = jest.fn();
      render(<Provider store={store}><OwnerDetails mainTitle="Main Title" subTitle="Sub Title" nameTitle="ShareHolder" buttonLabel="Add Director" /></Provider>);
     
      expect(screen.getByText('Main Title')).toBeInTheDocument();
    
      expect(screen.getByText('Sub Title')).toBeInTheDocument();

      const firstNameInput = screen.getByPlaceholderText('First name');
      const lastNameInput = screen.getByPlaceholderText('Last name');
      const dob = screen.getByPlaceholderText('Date of birth');

      fireEvent.change(firstNameInput,{target: {value:'jaggu'}});
      fireEvent.change(lastNameInput,{target: {value:'palla'}});
      fireEvent.change(dob,{target: {value:'21/07/2000',property:'dob'}});
      const selectAccountText = screen.getByLabelText(
        "Country of residence"
      ) as HTMLSelectElement; 
      fireEvent.keyDown(selectAccountText, { key: "ArrowDown" });
      
    });
  
  
  });

