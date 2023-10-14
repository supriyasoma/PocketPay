import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { LogInComponent, LogInProps } from ".";
import { BrowserRouter } from "react-router-dom";


const meta: Meta = {
  title: "organisms/LogIn",
  component: LogInComponent,
};
export default meta;

const Templete: StoryFn<LogInProps> = (args) => <BrowserRouter><LogInComponent {...args} /></BrowserRouter>;
export const Primary = Templete.bind({});
