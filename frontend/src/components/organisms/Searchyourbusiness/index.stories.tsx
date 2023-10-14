import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import SearchBusiness from ".";
export default {
  title: "Organisms/SearchBusiness",
  component: SearchBusiness,
} as Meta;

export const Template: StoryFn<{}> = (args) => (
  <SearchBusiness {...args} />
);

