import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { SignUp, SignUpProps } from ".";
import { BrowserRouter } from "react-router-dom";

const meta: Meta = {
  title: "organisms/SignUp",
  component: SignUp,
};
export default meta;

const Templete: StoryFn<SignUpProps> = (args) => <BrowserRouter> <SignUp {...args} /></BrowserRouter>;
export const Primary = Templete.bind({});
