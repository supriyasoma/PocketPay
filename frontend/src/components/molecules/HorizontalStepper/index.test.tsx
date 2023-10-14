
import { render , screen} from "@testing-library/react";
import { HorizontalStepper } from ".";

const props = {
    steps:[
        {
            label:"step1",
            completed:true,
            active:false
        },{
            label:"step2",
            completed:true,
            active:false

        },
        {
            label:"step3",
            completed:true,
            active:false
        },
        {
            label:"step4",
            completed:false,
            active:true
        },
        {
            label:"step5",
            completed:false,
            active:false
        }
    ]
};
describe("HorizontalStepper", () => {
    it("should renders properly", () => {
      render(
        <HorizontalStepper {...props} />
      );
      const stepper = screen
        .getByTestId("horizontal-stepper");
      expect(stepper).toBeInTheDocument();
    });

});