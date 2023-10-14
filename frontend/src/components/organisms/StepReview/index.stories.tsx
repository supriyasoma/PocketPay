import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { PaymentReviews, Paymentprops } from '.';

export default {
  title: 'Organisms/PaymentReviews',
  component: PaymentReviews,
} as Meta;

const Template: StoryFn<Paymentprops> = (args) => <PaymentReviews {...args} />;

export const Default = Template.bind({});
Default.args = {
  values:[
    '100.00',
    '114.74',
    'John Doe',
    'johndoe@example.com',
    '1234567890',
    'Checking',
    '1',
  ],
  currency:"GBP",
  convertedcurrency:"EUR"
};
