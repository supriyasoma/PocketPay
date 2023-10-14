import { Meta, StoryObj } from "@storybook/react";
import  MobileNumberInput  from ".";
const meta:Meta<typeof MobileNumberInput> = {
    title:"Molecules/MobileNumberInput",
    component:MobileNumberInput
};

export default meta;

type Story = StoryObj<typeof MobileNumberInput>;

export const Default:Story = {
    args:{
        label:"Mobile number",
        defaultCountry:"in",
        style:{width:"516px",height:"72px"},
    },
    argTypes:{ 
        onChange:{action:"changed"}
    }
    
}

