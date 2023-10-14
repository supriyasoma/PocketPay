import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, SelectChangeEvent } from "@mui/material";

import DropDown from "/src/components/molecules/DropDown";
import { TypographyComponent } from "/src/components/atoms/Typography";
import { AccountSetupTemplate } from "/src/components/templates/AccountSetup";
import theme from "/src/theme/theme";
import { CustomButton } from "/src/components/atoms/Button";
import { LoginSignup } from "/src/components/templates/loginSignUP";
import { Header } from "/src/components/molecules/header";
import { Store } from "/src/store/types";
import {Country} from '/src/models/country';
import { getMyData } from "/src/services";
import { activeStepAccount,setUserDetails } from "/src/store/actions";

interface SelectUserCountryPageProps {
  title?: string;
}

const submitBtnStyles: React.CSSProperties = {
  marginLeft:"31.9vw",
  marginTop:"25.4vw",
  padding: "16px 30px",
  borderRadius: "56px",
  boxShadow: "none",
};

export const SelectUserCountryPage = (props: SelectUserCountryPageProps) => {
  
  const [disableContinue, setDisableContinue] = useState(true);
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [menuList, setMenuList] = useState<any[]>([]);
  const navigate = useNavigate();
  const setupSteps = useSelector((state:Store)=>state.accountSteps);
  const userDetails = useSelector((state:Store)=>state.user);
  const [active,setActive] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!active){
      dispatch(activeStepAccount(3));
      setActive(true);
    }
    if(countryList.length == 0){
    getMyData("countries").then(res=>{
      if(res?.data){
      setCountryList(res.data);
      let list:any[] = [];
      res.data.forEach((country:Country)=>{
        let obj = {
          imgSrc: country.flagSrc,
        label: country.name,
        value: country.id,
        renderValue: country.name,
        };
        list.push(obj);
      });
      setMenuList(list);
      }
    });
  }
  });

  const handleCountryChange = (e: SelectChangeEvent) => {
    setCountry(e.target.value);
    dispatch(setUserDetails({countryId:parseInt(e.target.value)}));
    if(e.target.value !=""){ setDisableContinue(false); }
  };

  const handleContinueClick = () => {
    navigate("/twoFactorPage");
  };
  const handleArrowClick = () => {
    navigate("/selectAccountType");
  };

  const dropdownProps = {
    label: "Select your country",
    placeholder: "Select your country",
    sx: { width: "516px", height: "72px", marginTop: "25px" },
    IconComponent: ExpandMoreIcon,
    menuItems: menuList,
    
    onChange: handleCountryChange,
  };

  const templateProps = {
    content: (
      <div>
        <div className="select-country-title">
          <TypographyComponent
            className="select-country-title-text"
            sx={{
              ...theme.typography.heading1,
              color: `${theme.palette.textColor.highemp}`,
            }}
          >
            Your country of registration
          </TypographyComponent>
        </div>

        <div className="select-country-dropdown">
          <DropDown {...dropdownProps} data-testid="dropDownSelect" />
        </div>
        <Box>
        <CustomButton
        label="Continue"
        onClick={handleContinueClick}
        sx={submitBtnStyles}
        style={{
          backgroundColor: disableContinue
            ? `${theme.palette.primaryColor[100]}`
            : `${theme.palette.primaryColor[500]}`,
          
        }}
        variant="contained"
        disabled={disableContinue}
      />
      </Box>
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
