
import { render,screen, fireEvent, getByTestId, findByTestId } from '@testing-library/react';
import { ChooseyourBank, ChoosebankProps } from '.';
import { Bank } from '/src/models/bank';
import { Provider } from 'react-redux';
import store from '/src/store';

const bankData:Bank[] = [
  {
    id: 1,
    logoSrc: 'sbi.svg',
    bankName: 'State Bank of India',
  },
  {
    id: 2,
    logoSrc: 'hdfc.svg',
    bankName: 'HDFC',
  },
];

const actions = {
  oncancel: jest.fn(),
};

const defaultProps: ChoosebankProps = {
  bankData: bankData,
  handleBankCardClick: jest.fn(),
  ...actions,
};

describe('ChooseyourBank', () => {
  test('renders ChooseyourBank component without errors', () => {
    render(<Provider store={store}><ChooseyourBank {...defaultProps} /></Provider>);
  });

  test('displays the bank names', () => {
    const { getByText } = render(<ChooseyourBank {...defaultProps} />);
      const bankNameElement = screen.getByTestId("choose-your-bank-block");
      expect(bankNameElement).toBeInTheDocument();
  });
  

  test('calls handleBankCardClick function when bank card is clicked', () => {
    const handleBankCardClick = jest.fn();
     render(
     <Provider store={store}> <ChooseyourBank
        {...defaultProps}
        handleBankCardClick={handleBankCardClick}
      />
      </Provider>
    );
    const bankCard = screen.getByText('State Bank of India');
    fireEvent.click(bankCard);
    expect(handleBankCardClick).toHaveBeenCalledWith({bankName: "State Bank of India", id: 1, logoSrc: "sbi.svg"});
  });

  test("invoke cancel transfer click",()=>{
    render(
      <Provider store={store}>
      <ChooseyourBank
        {...defaultProps}
      />
      </Provider>
    );
    const cancelBtn = screen.getByTestId('cancel-button');
    fireEvent.click(cancelBtn);
  })

});
