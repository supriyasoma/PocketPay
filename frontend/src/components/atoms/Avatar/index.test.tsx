import { render , screen } from "@testing-library/react";
import { AvatarComponent } from ".";

const props = {
    name:"ABC",
    letters:"A",
    style:{
        bgcolor:"#ff5722"
    }
}
describe("AvatarComponent",()=>{
    it("should render AvatarComponent",()=>{
        render(
            <AvatarComponent {...props} />
        );
        const avatar = screen.getByText("A");
        expect(avatar).toBeInTheDocument();
    });
});