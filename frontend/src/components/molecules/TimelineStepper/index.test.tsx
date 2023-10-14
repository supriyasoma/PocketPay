import { render , screen } from "@testing-library/react";
import { TimelineStepperComponent } from ".";

const props = {
    steps:[
        {
          trackTime:"Today at 7:43 pm",
          status:"You set up your transfer",
          completed:1
        },
        {
          trackTime:"Today at 7:44 pm",
          status:"We recieved your GBP",
          completed:1
        },
        {
          trackTime:"Today at 7:50 pm",
          status:"Your money’s being processed",
          completed:0
        },
        {
          trackTime:"Tomorrow at 01:00 am",
          status:"We pay out your EUR",
          completed:0
        }
        , {
          trackTime:"Tomorrow at 7:00 am",
          status:"George max recieves your EUR",
          completed:0
        }
      ]
};

describe("TimelineStepper", () => {
    it("should renders properly", () => {
      render(
        <TimelineStepperComponent {...props}/>
      );
  
      const stepper = screen
        .getByTestId("timeline-stepper");
      expect(stepper).toBeInTheDocument();
    });

});