import { Meta, StoryObj } from "@storybook/react";
import { StepRecipient } from ".";
import './index.css';

const meta:Meta<typeof StepRecipient> = {
    title:"Organisms/StepRecipient",
    component:StepRecipient
};
export default meta;

type Story = StoryObj<typeof StepRecipient>;

export const Default:Story = {
    args:{
        title:"Who are you sending money to?",
    },
    argTypes:{
        handleMyBusinessClick:{action:'business'},
        handleSomeoneElseClick:{action:'someone'},
        handleBusinessOrCharityClick:{action:'businessOrCharity'}
    }
    
}