import { Meta, StoryObj } from "@storybook/react";
import { HorizontalStepper } from ".";

const meta:Meta<typeof HorizontalStepper> = {
    title:"Molecules/HorizontalStepper",
    component:HorizontalStepper
};

export default meta;

type Story = StoryObj<typeof HorizontalStepper>;

export const Horizontal:Story = {
    args:{
        steps:[
            {
                label:"Amount",
                completed:true,
                active:false
            },{
                label:"You",
                completed:true,
                active:false

            },
            {
                label:"Recipient",
                completed:true,
                active:false
            },
            {
                label:"Verification",
                completed:false,
                active:true
            },
            {
                label:"Review",
                completed:false,
                active:false
            },
            {
                label:"Pay",
                completed:false,
                active:false
            }
           
        ]
    }
}