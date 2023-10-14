import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";

import { TypographyComponent } from "/src/components/atoms/Typography";
import AccountCard from "/src/components/molecules/AccountCard";
import { AccountSetupTemplate } from "/src/components/templates/AccountSetup";
import theme from "/src/theme/theme";
import breifcase from "/public/assets/images/Muiicons/Business.svg";
import person from "/public/assets/images/Muiicons/user.svg";
import "./index.css";
import { LoginSignup } from "/src/components/templates/loginSignUP";
import { Header } from "/src/components/molecules/header";
import { Store } from "/src/store/types";
import {  activeStepAccount, setUserDetails } from "/src/store/actions";

export const SelectAccountTypePage = () => {
  const navigate = useNavigate();

  const setupSteps = useSelector((state:Store)=>state.accountSteps);
  const [active,setActive] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {user } = useAuth0();

  useEffect(()=>{
    if(!active){
         dispatch(activeStepAccount(2));
         setActive(true);
    }
    if(user){
      dispatch(setUserDetails({email:user?.email,profileImage:user.profile}));
    }
});

  const handleAccountTypeSelect = (type:string) => {
    dispatch(setUserDetails({accountType:type}));
    navigate("/selectUserCountry");
  };

  const personalAccountProps = {
    srcIcon: person,
    title: "Personal account",
    subtitle: "Send, spend and receive around the world for less.",
    onClick: ()=>handleAccountTypeSelect("personal"),
  };

  const businessAccountProps = {
    srcIcon: breifcase,
    title: "Business account",
    subtitle: "Do business or freelance work internationally.",
    type:"personal",
    onClick:()=> handleAccountTypeSelect("business"),
  };
  const handleArrowClick = () => {
    navigate("/");
  };

  const templateProps = {
    content: (
      <div
        className="select-account-type-page"
        data-testid="select-account-type-page"
      >
        <div className="select-account-type-title">
          <TypographyComponent
            className="select-account-title-text"
            sx={{
              ...theme.typography.heading1,
              color: `${theme.palette.textColor.highemp}`,
            }}
          >
            What kind of account would you like to open today?
          </TypographyComponent>
          <TypographyComponent
            sx={{
              ...theme.typography.caption1,
              color: `${theme.palette.textColor.medemp}`,
            }}
          >
            You can add another account later on, too.
          </TypographyComponent>
        </div>

        <div className="select-account-content">
          <AccountCard {...personalAccountProps} />
          <AccountCard {...businessAccountProps} />
        </div>
      </div>
    ),
  };
  return (
    <LoginSignup
      head={
        <Header
          arrow={true}
          onClick={handleArrowClick}
          steps={setupSteps ? setupSteps:[]}
        />
      }
      children={<AccountSetupTemplate {...templateProps} />}
    />
  );
};
