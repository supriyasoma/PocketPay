// import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { PaymentReviews, PaymentReviewprops } from './index';
export default {
  title: 'Molecules/PaymentReviews',
  component: PaymentReviews,
  argTypes: {
    onClickone: { action: 'clicked continue payment' }, 
    onClicktwo: { action: 'clicked cancel transfer' },
  },
} as Meta;

const Template: StoryFn<PaymentReviewprops> = (args) => <PaymentReviews {...args} />;

export const PaymentReview = Template.bind({});
PaymentReview.args = {
  transfer: 'Transfer details',
  uservalue: '100.00 GBP',
  convertednewvalue: '114.74 EUR',
  fee: 'Fee:',
  conversion: "Amount we'll convert:",
  guranteerate: 'Guranteed rate:',
  feevalue: '00.00 GBP',
  convertedvalue: '77.74 GBP',
  ratevalue: '1 GBP = 1.14 EUR',
  recipient: 'Recipient details',
  username: 'Name:',
  email: 'Email:',
  accountnumber: 'Account number:',
  accounttype: 'Account type:',
  accounttypevalue: 'Checking',
  accountvalue: '2136783910',
  emailvalue: 'mario.gaberiel@gmail.com',
  namevalue: 'Mario Gaberiel',
  labelone: 'Continue to pay',
  labeltwo: 'Cancel the transfer',
  showButtons:true
};
