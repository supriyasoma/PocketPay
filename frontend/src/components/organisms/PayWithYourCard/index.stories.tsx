import { Meta, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React from "react";
import { PayWithYourCard, PayWithYourCardProps } from ".";
const meta: Meta = {
  title: "organisms/PayWithYourCard",
  component: PayWithYourCard,
};
export default meta;

const Templete: StoryFn<PayWithYourCardProps> = (args) => (
  <PayWithYourCard {...args} />
);
export const Default = Templete.bind({});
Default.args = {
  transaction:{
    amount:100.00,
    fromCurrency:"GBP",
    convertedAmount:117.14,
    toCurrency:"EUR",
    recipient:{
      firstName:"Mario",
      lastName:"Gabriel",
      accountNumber:"99188171",
      email:"test@test.com",
      accountType:"Checking"
    }
  },
  cvvvalue: "4546",
  expiredvalue: "09/25",
  onClickContinue: action("Continue to Pay"),
  onClickCancel: action("Cancel this Transfer"),
};
