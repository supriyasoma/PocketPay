import { Meta ,StoryFn} from '@storybook/react';
import React from 'react';
import { OwnerDetails, OwnerDetailsProps } from '.';

const meta:Meta={
    title:'organisms/OwnerDetails',
    component:OwnerDetails
};
export default meta;

const Templete : StoryFn<OwnerDetailsProps> =(args)=> <OwnerDetails {...args}/>
export const Director=Templete.bind({});
Director.args={
    mainTitle:"Confirm your business directors",
    subTitle:"Please confirm these details from companies house.if anyone's missing,add them below.",
    nameTitle:"Director",
    buttonLabel:'+ Add another director'
}
export const Shareholder=Templete.bind({});
Shareholder.args={
    mainTitle:"Confirm your business directors",
    subTitle:"Please confirm these details from companies house.if anyone's missing,add them below.",
    nameTitle:"shareholder",
    buttonLabel:'+ Add another director'
}
