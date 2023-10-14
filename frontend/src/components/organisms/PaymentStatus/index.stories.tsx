import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { PaymentOverallStatus, PaymentOverallStatusProps } from ".";

export default {
  title: "Organisms/PaymentOverallStatus",
  component: PaymentOverallStatus,
} as Meta;

const steps = [
  {
    trackTime: "Today at 6:43 pm",
    trackInfo: "You set up your transfer",
    completed: true,
  },
  {
    trackTime: "Today at 6:44 pm",
    trackInfo: "We received your GBP",
    completed: true,
  },
  {
    trackTime: "Today at 6:50 pm",
    trackInfo: "Your money's being processed",
    completed: true,
  },
  {
    trackTime: "Tomorrow at 12:00 am",
    trackInfo: "We pay out your EUR",
    completed: false,
  },
  {
    trackTime: "Tomorrow at 6:00 am",
    trackInfo: "George Max receives your EUR",
    completed: false,
  },
];
const labelStyles = {
  fontSize: "14px",
  lineHeight: "21px",
};

const Template: StoryFn<PaymentOverallStatusProps> = (args) => (
  <PaymentOverallStatus {...args} />
);

export const Default = Template.bind({});
Default.args = {
  username: "John Doe",
  status: "Sending",
  uservalue: "500 GBP",
  convertednewvalue: "400 EUP",
  onClickShare: () => console.log("Share clicked"),
  onClickCancel: () => console.log("Cancel clicked"),
  accountname: "John Doe",
  accountnumber: "1234567890",
  steps,
  labelStyles,
};
