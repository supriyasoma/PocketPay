import { Meta, StoryFn } from "@storybook/react";
import { Popper, PopperProps,} from ".";
const meta: Meta = {
  title: "Molecules/Popper",
  component: Popper,
};
export default meta;

const Templete: StoryFn<PopperProps> = (args) => <Popper {...args} />;
export const Primary = Templete.bind({});
Primary.args={
    open:true
}
