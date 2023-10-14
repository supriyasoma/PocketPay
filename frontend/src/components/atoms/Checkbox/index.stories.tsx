import { CheckBoxComponent } from ".";
import {Meta,StoryObj} from '@storybook/react';
const meta:Meta<typeof CheckBoxComponent> = {
title : "Atoms/Checkbox",
component:CheckBoxComponent
};

export default meta;

type Story = StoryObj<typeof CheckBoxComponent>;

export const Default:Story = {
    args:{
        color:"secondary"
    }
}