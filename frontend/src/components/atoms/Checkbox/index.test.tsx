import { fireEvent, render , screen } from "@testing-library/react";
import { CheckBoxComponent } from ".";

const props:any = {
    color:"primary",
    size:"small",
    onChange:(event:Event)=>{
        console.log(event);
    }
}

describe("CheckboxComponent",()=>{
    it("should render CheckboxComponent",()=>{
        render(<CheckBoxComponent {...props} />);
        const checkBox = screen.getByRole("checkbox");
        expect(checkBox).toBeInTheDocument();
        expect(checkBox).toBeValid();
        fireEvent.change(checkBox);
    })
});