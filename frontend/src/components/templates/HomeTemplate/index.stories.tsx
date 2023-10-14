import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { HomeTemplate } from ".";
import { SideNavComponent } from "../../organisms/SideNav";
import LogoImg from "/public/assets/images/Logo/Brand.svg";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import { HeaderComponent } from "../../organisms/Header";
import { PaymentOverallStatus } from "../../organisms/PaymentStatus";
import { Box} from "@mui/material";
import { TypographyComponent } from "../../atoms/Typography";
import "./index.css"
const meta: Meta = {
  title: "Templates/HomeTemplate",
  component: HomeTemplate,
};
const brand = {
  height: "22px",
  width: "103px",
  src: LogoImg,
};

const menuList = [
  {
    name: "Home",
    icon: <HomeOutlinedIcon />,
    navigateTo: "home",
  },
  {
    name: "Cards",
    icon: <CreditCardOutlinedIcon />,
    navigateTo: "cards",
  },
  {
    name: "Recipients",
    icon: <PeopleAltOutlinedIcon />,
    navigateTo: "recipients",
  },
  {
    name: "Team",
    icon: <WorkspacesOutlinedIcon />,
    navigateTo: "team",
  },
  {
    name: "Account",
    icon: <PersonOutlineOutlinedIcon />,
    navigateTo: "account",
  },
  {
    name: "Invite & earn 150 GBP",
    icon: <CardGiftcardOutlinedIcon />,
    navigateTo: "invite",
  },
];
const steps = [
  {
    trackTime: "Today at 6:43 pm",
    status: "You set up your transfer",
    completed: 1,
  },
  {
    trackTime: "Today at 6:44 pm",
    status: "We received your GBP",
    completed: 1,
  },
  {
    trackTime: "Today at 6:50 pm",
    status: "Your money's being processed",
    completed: 1,
  },
  {
    trackTime: "Tomorrow at 12:00 am",
    status: "We pay out your EUR",
    completed: 0,
  },
  {
    trackTime: "Tomorrow at 6:00 am",
    status: "George Max receives your EUR",
    completed: 0,
  },
];
const labelStyles = {
  fontSize: "14px",
  lineHeight: "21px",
};
const userDetails = {
  firstName: "John",
  lastName: "Doe",
  uniqueId: "123456",
};

const Template: StoryFn = (args) => <HomeTemplate {...args} />;

export const Default = Template.bind({});
Default.args = {
  sidebar: (
    <div>
      <SideNavComponent
        brand={brand}
        showMenu={1}
        showBalances={1}
        menuList={menuList}
      />
    </div>
  ),
  header: <HeaderComponent userDetails={userDetails} />,
  content: (<Box className="mainclass">
    <div className="typostyle"> <TypographyComponent children="Home"/></div>
    <div className="stepper"> 
        <PaymentOverallStatus
          steps={steps}
          labelStyles={labelStyles}
          username="John Doe"
          status="Sending"
          uservalue="100 GBP"
          convertednewvalue="114.46 EUP"
        />
      </div>
      </Box>
  ),
};

export default meta;
