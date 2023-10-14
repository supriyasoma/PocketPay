import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Header, HeaderProps } from '.';

const meta:Meta={
    title:'Molecules/BasicHeader',
    component:Header
};
export default meta;

const Templete:StoryFn<HeaderProps>=(args)=><Header {...args}/>
export const Default=Templete.bind({});
Default.args={
        steps:[
            {
                label:"Your business",
                completed:true,
                active:false
            },{
                label:"Business activity",
                completed:true,
                active:true

            },
            {
                label:"Your detailst",
                completed:false,
                active:false
            }
           
        ]
    
}