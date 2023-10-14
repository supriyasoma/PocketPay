import { render , screen} from "@testing-library/react";
import { StepRecipient } from ".";

const props = {
    title:"Test title"
}

describe("StepRecipient", () => {
    it("should renders properly", () => {
      render(
        <StepRecipient {...props}/>
      );
      const stepAmount = screen
        .getByTestId("step-recipient-container");
      expect(stepAmount).toBeInTheDocument();
      });
});