import { Meta, StoryObj } from "@storybook/react";
import { PayFromYourBankComponent } from ".";

import LLoydImage from '/public/assets/images/Bank/sbi.svg';

const meta:Meta<typeof PayFromYourBankComponent> = {
    title:"Organisms/PayfromYourBank",
    component:PayFromYourBankComponent
};

export default meta;

type Story = StoryObj<typeof PayFromYourBankComponent>;

export const Default:Story = {
    args:{
        bankName:"Lloyds",
        amount:75.38,
        currency:"GBP",
        bankLogo:LLoydImage
    },
    argTypes:{
        handleContinueClick:{action:"continue to pay"}
    }
}