import { Meta, StoryObj } from "@storybook/react";
import { SideNavComponent } from ".";
import LogoImg from '/public/assets/images/Logo/Brand.svg';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';


const meta:Meta<typeof SideNavComponent> = {
    title:"Organisms/SideNav",
    component:SideNavComponent
};

export default meta;

type Story = StoryObj<typeof SideNavComponent>;

export const Default:Story = {
    args:{
        brand:{
            height:"22px",
            width:"103px",
            src:LogoImg
        },
        showMenu:1,
        showBalances:1,
        menuList:[
            {   
                name:"Home",
                icon:<HomeOutlinedIcon />,
                navigateTo:"home"
            },

            {
                name:"Cards",
                icon:<CreditCardOutlinedIcon />,
                navigateTo:"cards"
            },
            {
                name:"Recipients",
                icon:<PeopleAltOutlinedIcon />,
                navigateTo:"recipients"
            },
            {
                name:"Team",
                icon:<WorkspacesOutlinedIcon />,
                navigateTo:"team"
            },
            {
                name:"Account",
                icon:<PersonOutlineOutlinedIcon />,
                navigateTo:"account"
            },
            {
                name:"Invite & earn 150 GBP",
                icon:<CardGiftcardOutlinedIcon />,
                navigateTo:"invite"
            },

        ]
    }
}