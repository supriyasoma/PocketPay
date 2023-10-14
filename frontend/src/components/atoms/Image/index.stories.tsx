import { Meta, StoryFn } from "@storybook/react";
import Image from "./index";
import PocketPay from "../../../../public/assets/images/BrandIcons/Brand.svg";
import Sharelink from "../../../../public/assets/images/Illustrations/Share link.svg";
import Security from "../../../../public/assets/images/Illustrations/security illustration.svg";
export default {
  title: "Atoms/Image",
  component: Image,
  argTypes: {
    onClick: {
      action: "clicked",
    },
  },
} as Meta<typeof Image>;

const Template: StoryFn<typeof Image> = (args) => <Image {...args} />;
export const PocketPayimage = Template.bind({});
PocketPayimage.args = {
  src: PocketPay,
  alt: "image",
  width: "103px",
  height: "22px",
};
export const SecurityImage = Template.bind({});
SecurityImage.args = {
  src: Security,
  alt: "image",
  width: "184px",
  height: "60px",
};
export const Sharelinks = Template.bind({});
Sharelinks.args = {
  src: Sharelink,
  alt: "image",
  width: "175px",
  height: "126px",
};
