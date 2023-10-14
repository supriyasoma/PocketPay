import { Meta, StoryFn } from "@storybook/react";
import { CvvCard, CvvProps } from ".";

export default {
  title: "Molecules/CvvCard",
  component: CvvCard,
} as Meta;
const Template: StoryFn<CvvProps> = (args) => <CvvCard {...args} />;
export const Checked = Template.bind({});
Checked.args = {
  cardname: "EUR Visa Debit",
  lastdigit: "Last four digit",
  cvvvalue: "9313",
  expiryvalue: "09/25",
  expirydate: "Expiry date",
  checked: true,
};

export const NotChecked = Template.bind({});
NotChecked.args = {
  cardname: "EUR Visa Debit",
  lastdigit: "Last four digit",
  cvvvalue: "9313",
  expiryvalue: "09/25",
  expirydate: "Expiry date",
  checked: false,
};
