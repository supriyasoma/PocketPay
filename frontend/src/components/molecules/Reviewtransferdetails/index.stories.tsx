import { StoryFn, Meta } from '@storybook/react';
import { ReviewTransferDetails, ReviewDetailsProps, TextFieldData } from '.';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Molecules/ReviewTransferDetails',
  component: ReviewTransferDetails,
} as Meta;

const textFieldData: TextFieldData[] = [
  {
    id: '1',
    label: 'Amount',
    disabled: false,
    value: '100.00 GBP',
  },
  {
    id: '2',
    label: 'Fee',
    disabled: true,
    value: '00.00 GBP',
  },
  {
    id: '3',
    label: "Amount we'll convert",
    disabled: true,
    value: '77.74 GBP',
  },
  {
    id: '4',
    label: 'Guarantee rate',
    disabled: true,
    value: '1 GBP = 1.14 EUR',
  },
];

const Template: StoryFn<ReviewDetailsProps> = (args) => <ReviewTransferDetails {...args} />;

export const TransferDetails = Template.bind({});
TransferDetails.args = {
  handleChange: action('Text field changed'),
  textFieldData,
  buttonlabelone: 'Cancel',
  buttonlabeltwo: 'Save',
  heading: 'Transfer Details',
  handleCancel: action('Clicked cancel button'),
  handleSave: action('Clicked save button'),
};
