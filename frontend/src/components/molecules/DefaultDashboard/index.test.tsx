import { render,screen } from "@testing-library/react";
import { DefaultDashboard } from ".";
import { DASHBOARD_DEFAULT_MESSAGE } from "/src/utils/constants";
import DashboardImg from '/public/assets/images/Illustrations/default_dash.svg';


const props = {
    labelText:DASHBOARD_DEFAULT_MESSAGE,
    imgSrc:DashboardImg,
    imageProps:{
        width:'178',
        height:'183'
    }
}
describe("DefaultDashboard",()=>{
    it("should render properly",()=>{
        render(<DefaultDashboard {...props}/>);
        const content = screen.getByTestId("default-dashboard");
        expect(content).toBeInTheDocument();
    });
});