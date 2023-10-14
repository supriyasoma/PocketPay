import { Meta, StoryFn } from "@storybook/react";
import { PayeeDetailsCard } from ".";
import { PayeeDetails } from "/src/models/payee-details";



const meta: Meta = {
  title: "organisms/PayeeDetailsCard",
  component: PayeeDetailsCard,
};
export default meta;

const Templete: StoryFn<PayeeDetails> = (args) => <PayeeDetailsCard {...args} />;
export const Primary = Templete.bind({});

Primary.args={
  values:[
    "Mario Gabriel",
    "#356778810",
    "100.00 GBP",
    "24-14-70",
    "729019188810",
    `Pocketpay 56 Shoreditch High Street London E16JJ United Kingdom`
  ],
  currency:"GBP"
}
