import { Meta, StoryObj } from "@storybook/react";
import { HeaderComponent } from ".";
import AvatarImage from "/public/assets/images/profile.svg";


const meta: Meta<typeof HeaderComponent> = {
  title: "Organisms/Header",
  component: HeaderComponent,
};

export default meta;

type Story = StoryObj<typeof HeaderComponent>;

export const Default: Story = {
  args: {
    userDetails: {
      firstName: "Ros",
      lastName: "Genner",
      uniqueId: "P44561754",
      profileImage:AvatarImage
    },
  },
  argTypes: {
    handleYourDetailsClick: { action: "details" },
    handleHelpCenterClick: { action: "help" },
    handleSettingsClick: { action: "settings" },
    handleLogoutClick: { action: "logout" },
  },
};
