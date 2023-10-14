import React from "react";
import { StoryFn } from "@storybook/react";
import { SideBarItem } from ".";
import homeIcon from "/public/assets/images/Muiicons/home.svg";
import creditIcon from "/public/assets/images/Muiicons/credit-card.svg";
import theme from "../../../theme/theme";
const Typoone: React.CSSProperties = {
  color: theme.palette.primaryColor[500],
  textAlign: "center",
};
const Typotwo: React.CSSProperties = {
  color: theme.palette.textColor.medemp,
  textAlign: "center",
};
export default {
  title: "Molecules/SideBarItem",
  component: SideBarItem,
  argTypes: {
    onClick: { action: "clicked" },
  },
};

const Template: StoryFn = (args) => <SideBarItem {...args} />;

export const HomeItem = Template.bind({});
HomeItem.args = {
  srcIcon: homeIcon,
  title: "Home",
  sxTypoProps: Typoone,
};

export const CardsItem = Template.bind({});
CardsItem.args = {
  srcIcon: creditIcon,
  title: "Cards",
  sxTypoProps: Typotwo,
};
