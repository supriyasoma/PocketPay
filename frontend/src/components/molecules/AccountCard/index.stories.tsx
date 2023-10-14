import { Meta, StoryFn } from "@storybook/react";
import AccountCard from ".";
import breifcase from "../../../../public/assets/images/Muiicons/Business.svg";
import person from "../../../../public/assets/images/Muiicons/user.svg";

export default {
  title: "Molecules/BusinessAccount",
  argTypes: {
    onClick: { action: "Clicked" },
  },
} as Meta<typeof AccountCard>;

const Template: StoryFn<typeof AccountCard> = (args) => (
  <AccountCard {...args}></AccountCard>
);

export const businessAccount = Template.bind({});

businessAccount.args = {
  srcIcon: breifcase,
  title: "Business account",
  subtitle: "Do business or freelance work internationally.",
};

export const personalAccount = Template.bind({});

personalAccount.args = {
  srcIcon: person,
  title: "Personal account",
  subtitle: "Send, spend and receive around the world for less.",
};
