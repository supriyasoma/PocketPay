
import { action } from '@storybook/addon-actions';
import SBI from "/public/assets/images/Bank/sbi.svg";
import HDFC from "/public/assets/images/Bank/hdfc.svg";
import { StoryFn} from '@storybook/react';
import { ChooseyourBank,ChoosebankProps } from '.';
import { Bank } from '/src/models/bank';
export default {
  title: 'Organisms/ChooseyourBank',
  component: ChooseyourBank,
};

const bankData:Bank[] = [
    {
      id: 1,
      logoSrc: SBI,
      bankName: "State Bank of India"
    },
    {
      id: 2,
      logoSrc: HDFC,
      bankName: "HDFC"
    },
  ];

const actions = {
  oncancel: action('Cancel Clicked'),
};

const Template: StoryFn<ChoosebankProps> = (args: ChoosebankProps) => <ChooseyourBank {...args} />;

export const Default = Template.bind({});
Default.args = {
  bankData: bankData,
  ...actions,
};
