import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { ShareTrackLinkProps, ShareTractLink } from ".";


const meta: Meta = {
  title: "organisms/ShareTrackLink",
  component: ShareTractLink,
};
export default meta;

const Templete: StoryFn<ShareTrackLinkProps> = (args) => <ShareTractLink{...args} />;
export const Primary = Templete.bind({});
Primary.args={
    open:true,
}

