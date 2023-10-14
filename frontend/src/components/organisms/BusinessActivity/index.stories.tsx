import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { BusinessActivity, BusinessActivityProps } from ".";
import { BrowserRouter } from "react-router-dom";


const meta: Meta = {
  title: "organisms/BusinessActivity",
  component:BusinessActivity,
};
export default meta;

const Templete: StoryFn<BusinessActivityProps> = (args) => <BrowserRouter><BusinessActivity{...args} /> </BrowserRouter>;
export const Default = Templete.bind({});

