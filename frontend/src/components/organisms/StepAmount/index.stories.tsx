import { Meta, StoryObj } from "@storybook/react";
import { StepAmount } from ".";

const meta:Meta<typeof StepAmount> = {
    title:"Organisms/StepAmount",
    component:StepAmount
};

export default meta;

type Story = StoryObj<typeof StepAmount>;

export const Default:Story = {
    args:{
        title:"How much would you like to transfer?"
    },
    argTypes:{
        handleContinueBtnClick:{action:"continueBtnClick"}
    }
}