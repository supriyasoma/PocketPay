import { render, screen } from "@testing-library/react";
import DropDown from ".";
import AustriaFlag from '/public/images/austria.png';

const menuLisWithFlag = [
  {
    imgSrc: AustriaFlag,
    label: "United Kingdom",
    renderValue:"Austria"
  },
];
const menuListWithoutFlag = [
  {
    label: "United Kingdom",
    renderValue:"UK"
  },
];
const props = {
  defaultValue:"",
  labelId:"demo-simple-select-label",
  id:"demo-simple-select",
  label:"Select your country",
  placeholder:"Select your country"
}
describe("DropDown", () => {
  it("renders properly", () => {
    const onChangeMock = jest.fn();
    render(
      <>
        <DropDown
         {...props}
         menuItems={menuLisWithFlag}
          onChange={onChangeMock}
        />
      </>
    );
    const dropDownElement = screen.getByTestId("dropDown");
    expect(dropDownElement).toBeInTheDocument();
  });

  it("should render withour flag",()=>{
    render(
      <>
        <DropDown
         {...props}
         menuItems={menuListWithoutFlag}
        />
      </>
    );
  });
});
