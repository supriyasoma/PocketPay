import { Meta, StoryFn } from "@storybook/react";
import ConfirmPurchase, {
  TypographyComponentStyleHighEmp,
  TypographyComponentStyleMedEmp,
} from ".";
import LLyodBank from "../../../../public/assets/images/Bank/Lloyds bank.svg";
import VISA from "../../../../public/assets/images/BrandIcons/visa.svg";

export default {
  title: "Molecules/ConfirmPurchase",
} as Meta<typeof ConfirmPurchase>;

const Template: StoryFn<typeof ConfirmPurchase> = (args) => (
  <ConfirmPurchase {...args}></ConfirmPurchase>
);

export const confirmPurchase = Template.bind({});

confirmPurchase.args = {
  srcBank: LLyodBank,
  srcCardType: VISA,
  title: "Confirm Your Purchase",
  line1: [
    ["GBP 100.00", TypographyComponentStyleHighEmp],
    [" to PocketPay using visa card ending ", TypographyComponentStyleMedEmp],
    ["9313", TypographyComponentStyleHighEmp],
  ],
  lines: [
    "Step 1: Open and confirm the push notification we sent to your mobile.",
    "Step 2: Return to this screen and press the button below to finish your purchase.",
  ],
  buttonLabel: "Complete",
};
