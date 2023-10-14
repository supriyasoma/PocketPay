import { render , screen} from "@testing-library/react";
import { AccountSetupTemplate } from ".";

describe("AccountSetupTemplate", () => {
    it("shoud render properly", () => {
      
        render(<AccountSetupTemplate />);
        const template = screen.getByTestId("account-setup-template-grid");
        expect(template).toBeInTheDocument();
    });

});