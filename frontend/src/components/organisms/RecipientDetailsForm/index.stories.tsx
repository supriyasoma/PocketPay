
import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { RecipientDetailsForm, RecipientDetailsFormProps } from ".";
import { BrowserRouter } from "react-router-dom";


const meta: Meta = {
  title: "organisms/RecipientDetailsForm",
  component: RecipientDetailsForm,
};
export default meta;

const Templete: StoryFn<RecipientDetailsFormProps> = (args) =><BrowserRouter><RecipientDetailsForm {...args} /></BrowserRouter> ;
export const Primary = Templete.bind({});
