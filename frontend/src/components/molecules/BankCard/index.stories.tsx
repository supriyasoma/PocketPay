import { Meta, StoryFn } from "@storybook/react";
import BankCard from ".";
import SBI from "/public/assets/images/Bank/sbi.svg";
import HDFC from "/public/assets/images/Bank/hdfc.svg";
import RightArrow from "/public/assets/images/Muiicons/chevron-right.svg";

export default {
  title: "Molecules/BankCard",
} as Meta<typeof BankCard>;

const Template: StoryFn<typeof BankCard> = (args) => (
  <BankCard {...args}></BankCard>
);

export const sbiBankCard = Template.bind({});
sbiBankCard.args = {
  bankIcon: SBI,
  bankName: "State Bank of India",
  trailingIcon: RightArrow,
};

export const hdfcBankCard = Template.bind({});
hdfcBankCard.args = {
  bankIcon: HDFC,
  bankName: "HDFC",
  trailingIcon: RightArrow,
};
