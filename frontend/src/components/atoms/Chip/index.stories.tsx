
import { Meta, StoryFn } from "@storybook/react";
import BasicChip from "./index";

export default {
    title: "Atoms/Chip",
    component: BasicChip,
    
} as Meta<typeof BasicChip>;

const Templeat: StoryFn<typeof BasicChip> = (args) => <BasicChip {...args} />;


export const NewChip = Templeat.bind({});
NewChip.args = {
    label: "New",
    variant: "filled",
    size: "medium",
   
};



