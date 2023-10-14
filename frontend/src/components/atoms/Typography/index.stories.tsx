import { TypographyComponent } from ".";
import { Meta, StoryObj } from "@storybook/react";

const meta:Meta<typeof TypographyComponent> = {
    title:"Atoms/Typography",
    component:TypographyComponent
};

export default meta;


type Story = StoryObj<typeof TypographyComponent>;

export const SignInTitle:Story = {
    args:{
        variant:"h1",
        children:"Create your PocketPay account",
        style:{
            fontSize:"24px"
        }
    }
};
export const LoginWith:Story = {
    args:{
        variant:"caption",
        children:"Or, Log in with",
        style:{
            fontSize:"14px",
            lineHeight:"21px",
            color:"#77767A"
            
        }
    }
};

