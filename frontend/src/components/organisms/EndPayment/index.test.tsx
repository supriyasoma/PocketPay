import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { PayeeDetailsCard } from '.';
import { END_TITLE } from '../../../utils/constants';

describe('PayeeDetailsCard', () => {
  beforeEach(() => {
    render(<PayeeDetailsCard  />);
  });

  it('displays the correct title', () => {
    const titleElement = screen.getByText(END_TITLE);
    expect(titleElement).toBeInTheDocument();
  });
  it("render button click correct",()=>{
    render(<PayeeDetailsCard  />);
    const buttonContinue = screen.getAllByRole('button', { name: /Continue/i })[0];
      fireEvent.click(buttonContinue);

      const buttonCancel = screen.getAllByRole('button', { name: /Cancel the transfer/i })[0];
      fireEvent.click(buttonCancel);
  })
});
