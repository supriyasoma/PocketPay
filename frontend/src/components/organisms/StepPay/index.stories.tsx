import { Meta, StoryObj } from "@storybook/react";
import { StepPay } from ".";

const meta: Meta<typeof StepPay> = {
  title: "Organisms/StepPay",
  component: StepPay,
};

export default meta;

type Story = StoryObj<typeof StepPay>;

export const Default: Story = {
  args: {
    title: "Choose your transfer type",
    data: {
      transferDetails: {
        fromCurrency: "114.68 EUR",
        toCurrency: "100 GBP",
        recipientDatails: {
          firstName: "Mario",
          lastName: "Gabriel",
          email: "mario.gabriel@gmail.com",
          accountNumber: "21363738391910",
          accountType: "Checking",
        },
      },
    },
  },
  argTypes: {
    handleCancelClick: { action: "cancelPay" },
    handleContinueClick: { action: "continuePay" },
  },
};
