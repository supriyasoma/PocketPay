import { Meta, StoryFn } from "@storybook/react";
import { TradingAddress, TradingAddressprops } from ".";
import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import theme from "../../../theme/theme";

export default {
  title: "Molecules/TradingAddress",
  component: TradingAddress,
} as Meta;

const Template: StoryFn<TradingAddressprops> = (args) => (
  <TradingAddress {...args} />
);

const ButtonStyle: SxProps<Theme> = {
  background: `${theme.palette.primaryColor[500]}`,
  color: `${theme.palette.structuralColor.white}`,
  width: "135px",
  height: "56px",
  borderRadius: "56px",
  textTransform: "none",
  marginTop: "25%",
};
const TypoStyle: SxProps<Theme> = {
  color: `${theme.palette.textColor.medemp}`,
};
export const Addtrading = Template.bind({});
Addtrading.args = {
  buttonlabel: "Add",
  inputlabel: "Trading Address 2",
  typovariant: "body1",
  headingofcard: "Add trading address",
  showinputfield: true,
  sxButtonProps: ButtonStyle,
};
export const rating = Template.bind({});
rating.args = {
  buttonlabel: "Ok",
  typovariant: "body1",
  headingofcard: "We’ll apply this rate if we receive your money today.",
  showinputfield: false,
  sxTypoProps: TypoStyle,
  sxButtonProps: ButtonStyle,
};
