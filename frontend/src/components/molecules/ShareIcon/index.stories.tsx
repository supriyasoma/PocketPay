import { Meta, StoryFn } from "@storybook/react";
import ShareIcon from ".";
import Email from "../../../../public/assets/images/Muiicons/Email.svg";
import Copy from "../../../../public/assets/images/Muiicons/link.svg";

export default {
  title: "Molecules/ShareIcon",
} as Meta<typeof ShareIcon>;

const Template: StoryFn<typeof ShareIcon> = (args) => (
  <ShareIcon {...args}></ShareIcon>
);

export const emailShareIcon = Template.bind({});
emailShareIcon.args = {
  srcIcon: Email,
  title: "Email",
};

export const copyShareIcon = Template.bind({});
copyShareIcon.args = {
  srcIcon: Copy,
  title: "Copy",
};
