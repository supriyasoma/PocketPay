import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

import { LoginSignup } from "/src/components/templates/loginSignUP";
import { Header } from "/src/components/molecules/header";
import { TypographyComponent } from "/src/components/atoms/Typography";
import { SearchBar } from "/src/components/molecules/SearchBar";
import theme from "/src/theme/theme";
import SearchBusiness from "/src/components/organisms/Searchyourbusiness";
import { ConfirmTradingAddress } from "/src/components/organisms/ConfirmTradingAddress";
import Image from "/src/components/atoms/Image";
import Back from "/public/assets/images/Muiicons/Back button.svg";
import { activeStepBusiness } from "/src/store/actions";
import { Store } from "/src/store/types";
import { Business } from "/src/models/business";
import { getBusinessList, getMyData } from "/src/services";
const Wrapper = styled(Box)({
  ".search": {
    width: "27.77vw",
    paddingLeft: "31.11vw",
    paddingTop: "91px",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  },
  ".title": {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  ".mainTitle": {
    ...theme.typography.heading1,
    color: theme.palette.textColor.highemp,
  },
  ".subTitle": {
    ...theme.typography.body3,
    color: theme.palette.textColor.medemp,
  },
  ".details": {
    paddingLeft: "31.11vw",
    paddingTop: "51px",
  },
  ".confirmDiv": {
   
  },
});
const ImageDiv = styled(Box)({
  cursor: "pointer",
  paddingTop: "40px",
  paddingLeft: "20vw",
});

export const YourBusiness = () => {

  const [select, setSelect] = useState(1);
  const navigate = useNavigate();
  const businessSteps = useSelector((state: Store) => state.businessSteps);
  const userDetails = useSelector((state: Store) => state.user);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [businessList,setBusinessList] = useState<Business[]>([]);

  useEffect(() => {
    if (!active) {
      dispatch(activeStepBusiness(1));
      setActive(true);
    }
    if(businessList.length == 0){
      getBusinessList().then(res=>{
        console.log(res);
        if(res.data){
          res.data.map((obj:Business) => {obj.label = obj.name});
          setBusinessList(res.data);
        }
      });
    }
  });

  const handleChange = () => {
    setSelect(select + 1);
  };

  const handleConfirm = () => {
    setSelect(select + 1);
  };

  const handleArrowClick = () => {
    setSelect(select-1);
  };
  return (
    <Box>
      <LoginSignup
        head={
          <Header
            steps={businessSteps ? businessSteps:[]}
          />
        }
      >
        <Wrapper>
          {select === 1 && (
            <Box className="search">
              <Box className="title">
                <TypographyComponent className="mainTitle">
                  Search for your business
                </TypographyComponent>
                <TypographyComponent className="subTitle">
                  Sole trader,freelancer or not registered with Companies house?
                </TypographyComponent>
              </Box>
              <SearchBar
                data={businessList ? businessList:[]}
                showFooter={true}
                placeholderTextField="Select your business"
                onChange={handleChange}
              />
            </Box>
          )}
          {select === 2 && (
            <Box>
              <Box>
                <ImageDiv>
                  <Image
                    src={Back}
                    alt="back button"
                    onClick={handleArrowClick}
                  />
                </ImageDiv>
              </Box>
              <Box className="details">
                <SearchBusiness handleconfirm={handleConfirm} />
              </Box>
            </Box>
          )}
          {select === 3 && (
            <Box className="confirmDiv">
               <Box>
                <ImageDiv>
                  <Image
                    src={Back}
                    alt="back button"
                    onClick={handleArrowClick}
                  />
                </ImageDiv>
              </Box>
              <Box className="details">
              <ConfirmTradingAddress
                handleClick={() => navigate("/businessActivity")}
                business={userDetails?.business}
              />
              </Box>
            
            </Box>
          )}
        </Wrapper>
      </LoginSignup>
    </Box>
  );
};
