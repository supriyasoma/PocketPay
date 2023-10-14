import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { AddressCard,Addressprops } from '.';

export default {
  component: AddressCard,
  title: 'Molecules/AddressCard',
} as Meta;

const Template: StoryFn<Addressprops> = (args) => <AddressCard {...args} />;

export const DeSelected = Template.bind({});
DeSelected.args = {
  label: 'Address 1',
  address: '#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054',
  checked: false,
};

export const Selected = Template.bind({});
Selected.args = {
  label: 'Address 2',
  address: '#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054',
  checked: true,
};

