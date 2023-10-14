import { Meta, StoryFn } from "@storybook/react";
import { SearchBar } from ".";
import { searchBarData } from "../../../utils/constants";

export default {
  title: "Molecules/SearchBar",
} as Meta<typeof SearchBar>;

const Template: StoryFn<typeof SearchBar> = (args) => (
  <SearchBar {...args}></SearchBar>
);

export const searchBarWithFooter = Template.bind({});
searchBarWithFooter.args = {
  data: searchBarData,
  showFooter: true,
  placeholderTextField: "searchBarWithFooter",
};

export const searchBarWithoutFooter = Template.bind({});
searchBarWithoutFooter.args = {
  data: searchBarData,
  showFooter: false,
  placeholderTextField: "searchBarWithoutFooter",
};
