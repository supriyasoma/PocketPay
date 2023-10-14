import { ConfirmTradingAddress } from ".";
import { StoryFn, Meta } from "@storybook/react";
const meta: Meta = {
  title: "Organisms/ConfirmTradingAddress",
  component: ConfirmTradingAddress,
  parameters: {
    layout: "centered",
    visualViewport: "PocketPay"
  }
};
export default meta;

const Template: StoryFn<{}> = (args) => <ConfirmTradingAddress {...args} />;
export const Default = Template.bind({});
