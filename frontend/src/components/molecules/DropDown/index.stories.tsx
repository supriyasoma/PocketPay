import { Meta, StoryFn } from "@storybook/react";
import DropDown from ".";
import austriaFlag from "/public/assets/images/austria.png";

export default {
  title: "Molecules/DropDown",
} as Meta<typeof DropDown>;

const Template: StoryFn<typeof DropDown> = (args) => (
  <DropDown {...args}></DropDown>
);

export const selectedDropDown = Template.bind({});
selectedDropDown.args = {
  defaultValue: "",
  labelId: "demo-simple-select-label",
  id: "demo-simple-select",
  sx: { m: 1, minWidth: 400 },
  label: "Select your country",
  placeholder: "Select your country",
  menuItems: [
    {label:"India",value:"india"},
    {label:"USA",value:"usa"},
    {label:"Canada",value:"canada"},
    {label:"UK",value:"Uk"},
  ],
  onChange: () => {
    console.log("DropDown clicked");
  },
};


export const SelectCurrency = Template.bind({});
SelectCurrency.args = {
  defaultValue: "",
  labelId: "demo-simple-select-label",
  id: "demo-simple-select",
  sx: { m: 1, minWidth: 400 },
  label: "Select your country",
  placeholder: "Select your country",
  menuItems: [
    {  imgSrc: austriaFlag,label: "United Kingdom" ,value:"uk",renderValue:"UK",tail:"GBP"},
    { imgSrc: austriaFlag, label: "United States of America" ,tail:"USD",value:"usa",renderValue:"USA"},
    { imgSrc: austriaFlag, label: "Austria" ,tail:"AUD",value:"austria",renderValue:"AUS"},
    { imgSrc: austriaFlag, label: "Greece",tail:"GRD",value:"greece",renderValue:"Greece"},
  ]
};

SelectCurrency.argTypes = {
  onChange:{action:"onChange"}
}