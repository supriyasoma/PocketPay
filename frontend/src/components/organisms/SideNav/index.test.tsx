import { fireEvent, render , screen} from "@testing-library/react";
import { SideNavComponent } from ".";
import BrandImg from '/public/assets/images/Logo/Brand.svg';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

const props = {
    brand:{
        height:"22px",
        width:"103px",
        src:BrandImg
    },
    showMenu:1,
    showBalances:1,
    menuList:[
        {   
            name:"Menu 1",
            icon:<HomeOutlinedIcon />,
            navigateTo:"home"
        },

        {
            name:"Menu 2",
            icon:<CreditCardOutlinedIcon />,
            navigateTo:"cards"
        },
        {
            name:"Menu 3",
            icon:<PeopleAltOutlinedIcon />,
            navigateTo:"recipients"
        },

    ]
}

describe("SideNavComponent", () => {
    it("should renders properly", () => {
      render(
        <SideNavComponent {...props}/>
      );
      const sidenav = screen
        .getByTestId("sidenav");
      expect(sidenav).toBeInTheDocument();
    });

    it("invoke menu onclick", () => {
        const mockHandleClick = jest.fn();
    render(<SideNavComponent {...props}/>)
    fireEvent.click(screen.getByText(/Menu 1/i));
    });
});