import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { LoginSignup, LoginSignupProps } from '.';
const meta:Meta={
    title:'templates/LoginSignup',
    component:LoginSignup
};
export default meta;

const Templete:StoryFn<LoginSignupProps>=(args)=><LoginSignup {...args}/>
export const Default=Templete.bind({});