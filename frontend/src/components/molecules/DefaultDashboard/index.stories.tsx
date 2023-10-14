import { Meta, StoryObj } from "@storybook/react";
import { DefaultDashboard } from ".";
import DashboardImg from '/public/assets/images/Illustrations/default_dash.svg';


const meta:Meta<typeof DefaultDashboard> = {
    title:"Molecules/DefaultDashboard",
    component:DefaultDashboard
};

export default meta;

type Story = StoryObj<typeof DefaultDashboard>;

export const Default:Story = {
    args:{
        labelText:"This is where you’ll see your activity and transactions. Choose how you’d like to get started.",
        imgSrc:DashboardImg,
        imageProps:{
            width:'178',
            height:'183'
        }
    }
}