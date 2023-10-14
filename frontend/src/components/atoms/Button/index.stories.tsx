import { Meta,StoryFn } from '@storybook/react';
import React from 'react';
import { CustomButton } from '.';
import theme from '../../../theme/theme';
export default {
  title: 'Atoms/Button',
  Component: CustomButton,
} as Meta<typeof CustomButton>;

const Template: StoryFn<typeof CustomButton> = (args) => (
  <CustomButton {...args} />
);

export const button = Template.bind({});
button.args = {
  label: 'Send Money',
  style: {
    background: '#7633FF',
    color: '#FFFFFF',
    width: '159px',
    height: '56px',
    borderRadius:'56px'
  }
   
}

export const Cancel = Template.bind({});
Cancel.args = {
  label: 'Cancel the transfer',
  style: {
    background: `${theme.palette.structuralColor.white}`,
    color: `${theme.palette.primaryColor[500]}`,
    width: '216px',
    height: '56px',
    borderRadius:'56px'
  }  
}
export const SignUp = Template.bind({});
SignUp.args = {
  label: 'Sign Up',
  style: {
    background: `${theme.palette.primaryColor[500]}`,
    color: `${theme.palette.structuralColor.white}`,
    width: '516px',
    height: '56px',
    borderRadius:'56px'
  }
   
}

