import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { CancelTransferModalProps ,CancelTransferModal} from ".";

const meta: Meta = {
  title: "organisms/CancelTransfer",
  component:CancelTransferModal,
};
export default meta;

const Templete: StoryFn<CancelTransferModalProps> = (args) => <CancelTransferModal{...args} />;
export const Default = Templete.bind({});
Default.args={
    open:true
}

