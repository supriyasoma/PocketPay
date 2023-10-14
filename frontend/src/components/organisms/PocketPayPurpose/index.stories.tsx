import { Meta,StoryFn} from '@storybook/react';
import PocketPayPurpose from '.';

export default {
  title: 'Organisms/PocketPayPurpose',
  component: PocketPayPurpose,
} as Meta;

const Template: StoryFn = () => <PocketPayPurpose />;

export const Default = Template.bind({});
