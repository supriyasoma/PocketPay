import { TimelineStepperComponent } from ".";
import { Meta, StoryObj } from "@storybook/react";

const meta:Meta<typeof TimelineStepperComponent> = {
    title:"Molecules/Stepper",
    component:TimelineStepperComponent
};

export default meta;

type Story = StoryObj<typeof TimelineStepperComponent>;
export const Default:Story = {
    args:{
        steps:[
            {
              trackTime:"Today at 6:43 pm",
              trackInfo:"You set up your transfer",
              completed:true
            },
            {
              trackTime:"Today at 6:44 pm",
              trackInfo:"We recieved your GBP",
              completed:true
            },
            {
              trackTime:"Today at 6:50 pm",
              trackInfo:"Your money’s being processed",
              completed:true
            },
            {
              trackTime:"Tomorrow at 12:00 am",
              trackInfo:"We pay out your EUR",
              completed:false
            }
            , {
              trackTime:"Tomorrow at 6:00 am",
              trackInfo:"George max recieves your EUR",
              completed:false
            }
          ],
          labelStyles:{
            fontSize:"14px",
            lineHeight:"21px"
          }
    }
}