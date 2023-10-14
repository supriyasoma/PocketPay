import { types } from "@babel/core";
import {Meta,StoryObj} from '@storybook/react';
import { AvatarComponent } from ".";
import AvatarImg from '/public/images/avatar.jpg';

const meta:Meta<typeof AvatarComponent> = {
    title:"Atoms/Avatar",
    component:AvatarComponent
};

export default meta;

type Story = StoryObj<typeof AvatarComponent>;

export const AvatarImage:Story = {
    args:{
        src:AvatarImg,
        name:"Test User"
    }
}

export const AvatarLetters:Story = {
    args:{
        name:"Test User",
        letters:"TU",
        style:{
            bgcolor:"#ff5722"

        }
    }
}