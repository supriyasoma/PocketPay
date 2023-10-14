import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Link, Stack, SxProps, styled } from "@mui/material";

import { BUSINESS_NAME, CANCEL, REGISTERED_ADDRESS, REGISTRATION_NUMBER, SAVE, SearchBusinessOrganism } from "/src/utils/constants";
import { TypographyComponent } from "/src/components/atoms/Typography";
import theme from "/src/theme/theme";
import { TextFieldComponent } from "/src/components/atoms/TextField";
import { CustomButton } from "/src/components/atoms/Button";
import { Store } from "/src/store/types";
import { Business } from "/src/models/business";
import { setUserDetails } from "/src/store/actions";
export interface SearchBusinessProps {
  handleconfirm?: () => void;
}
export interface FormValuesType {
  businessName: string;
  regNo: string;
  regAddr: string;
  [key: string]: string;
}
const InnerWrapper = styled(Box)(`
  width:38vw;
  min-width:390px;
  max-width:516px;
  & .form{
    margin-top:15px;
  }
  & span{
    display:block;
  }
  & .input{
    margin-top:32px;
  }
  & .content-title{
    margin-bottom:12px;
  }
  & .form-head{
    display:flex;
    justify-content:space-between;
    margin-bottom:20px;
  }

`);
const SearchBusiness = ({ handleconfirm }: SearchBusinessProps) => {
  const [showForm, setShowForm] = useState(false);
  const inputprops = {
    multiline: true,
    maxrows: 4,
  };

  const userDetails = useSelector((state:Store)=>state.user);
  const [businessDetails,setBusinessDetails] = useState<Business>();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!businessDetails){
            setBusinessDetails(userDetails?.business);
    }
  });
  const handleLinkClick = () => {
    setShowForm(true);
  };
  const handleSaveChanges = () => {
    setShowForm(false);
    dispatch(setUserDetails({business:{...businessDetails}})); 
  };
  
  const handleCancelChanges = () => {
    setShowForm(false);
  };
  const handleBusinessNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   setBusinessDetails({...businessDetails,name:e.target.value});
  };
  const handleBusinessRegNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessDetails({...businessDetails,registrationNumber:e.target.value});
   };
   const handleBusinessRegAddrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessDetails({...businessDetails,registrationAddress:e.target.value});
   };
  return (
    <InnerWrapper>
      <InnerWrapper>
        <BusinessDetails minWidth="516px" width="100%">
          <TypographyComponent
            className="heading"
            children={SearchBusinessOrganism.headingtwo}
          />
          <TypographyComponent
            children={SearchBusinessOrganism.subheading}
            className="subheading"
          />
          {!showForm && (
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <TypographyComponent
                  children={SearchBusinessOrganism.titleone}
                  className="subheading"
                />
                <Link className="linkstyle" onClick={handleLinkClick}>
                  {SearchBusinessOrganism.buttonone}
                </Link>
              </Stack>
              <Stack spacing={1}>
                <Box className="content">
                  <TypographyComponent className="third">
                    {BUSINESS_NAME}:
                  </TypographyComponent>
                  <TypographyComponent className="second">
                    {userDetails?.business?.name}
                  </TypographyComponent>
                </Box>
              </Stack>
              <Stack spacing={1}>
                <Box className="content">
                  <TypographyComponent className="third">
                    {REGISTRATION_NUMBER}:
                  </TypographyComponent>
                  <TypographyComponent className="second">
                    {userDetails?.business?.registration}
                  </TypographyComponent>
                </Box>
              </Stack>

              <Stack spacing={1}>
                <Box className="content">
                  <TypographyComponent className="third">
                    {REGISTERED_ADDRESS}:
                  </TypographyComponent>
                  <TypographyComponent className="second">
                    {userDetails?.business?.registrationAddress}
                  </TypographyComponent>
                </Box>
              </Stack>
              <Stack direction="row" justifyContent="flex-end">
                <CustomButton
                  className="confirm"
                  label="Confirm"
                  onClick={handleconfirm}
                />
              </Stack>
            </Stack>
          )}
          {showForm && (
            <EditBusinessDetails>
             <TypographyComponent
                  children={SearchBusinessOrganism.titleone}
                  className="subheading"
                />
              <Stack spacing={15}>
                <TextFieldComponent
                  id={BUSINESS_NAME}
                  label={BUSINESS_NAME}
                  onChange={handleBusinessNameChange}
                  value={businessDetails?.name}
                  inputProps={inputprops}
                  style={TextfieldStyle}
                />

                <TextFieldComponent
                  id={REGISTRATION_NUMBER}
                  label={REGISTRATION_NUMBER}
                  onChange={handleBusinessRegNumChange}
                  value={businessDetails?.registrationNumber}
                  inputProps={inputprops}
                  style={TextfieldStyle}
                />
                 <TextFieldComponent
                  id={REGISTERED_ADDRESS}
                  label={REGISTERED_ADDRESS}
                  onChange={handleBusinessRegAddrChange}
                  value={businessDetails?.registrationAddress}
                  inputProps={inputprops}
                  style={TextfieldStyle}
                />
              </Stack>
              <Stack className="innertwo" direction="row" spacing={3} mt={20}>
                <CustomButton
                  className="cancelbutton"
                  label={CANCEL}
                  onClick={handleCancelChanges}
                />
                <CustomButton
                  className="savebutton"
                  label={SAVE}
                  onClick={handleSaveChanges}
                />
              </Stack>
            </EditBusinessDetails>
          )}
        </BusinessDetails>
      </InnerWrapper>
    </InnerWrapper>
  );
};
const Wrapper = styled(Box)({
  ".title": {
    ...theme.typography.heading1,
    color: theme.palette.textColor.highemp,
    paddingBottom: "1%",
  },
  ".subheading": {
    ...theme.typography.body3,
    color: theme.palette.textColor.medemp,
    paddingBottom: "4%",
  },
});
const BusinessDetails = styled(Box)({
  ".heading": {
    ...theme.typography.heading1,
    color: theme.palette.textColor.highemp,
    paddingBottom: "1%",
  },
  ".subheading": {
    ...theme.typography.body3,
    color: theme.palette.textColor.medemp,
    paddingTop: "2%",
    paddingBottom: "3%",
  },
  ".first": {
    ...theme.typography.caption1,
    color: theme.palette.textColor.lowemp,
    paddingBottom: "2%",
  },
  ".second": {
    ...theme.typography.body2,
    color: theme.palette.textColor.highemp,
    paddingBottom: "5%",
  },
  ".third": {
    ...theme.typography.body2,
    color: theme.palette.textColor.lowemp,
    paddingBottom: "2%",
  },
  ".linkstyle": {
    color: theme.palette.primaryColor[500],
    textDecorationColor: theme.palette.primaryColor[500],
    cursor:'pointer'
  },
  ".confirm": {
    marginTop:"189px",
    marginLeft:"289px",
    background: `${theme.palette.primaryColor[500]}`,
    color: `${theme.palette.structuralColor.white}`,
    width: "135px",
    height: "58px",
    borderRadius: "58px",
    textTransform: "none",
    boxShadow: "0",
    ":hover": {
      backgroundColor: theme.palette.primaryColor[500],
    },
  },
});
const EditBusinessDetails = styled(Box)({
  ".savebutton": {
    background: `${theme.palette.primaryColor[500]}`,
    color: `${theme.palette.structuralColor.white}`,
    width: "135px",
    height: "58px",
    borderRadius: "58px",
    textTransform: "none",
    boxShadow: "0",
    ":hover": {
      backgroundColor: theme.palette.primaryColor[500],
    },
  },
  ".cancelbutton": {
    color: `${theme.palette.primaryColor[500]}`,
    background: `${theme.palette.structuralColor.white}`,
    width: "135px",
    height: "58px",
    borderRadius: "58px",
    textTransform: "none",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  },
  ".innertwo": {
    paddingTop: "5%",
    justifyContent: "flex-end",
  },
});
const TextfieldStyle: SxProps = {
  width: "99%",
  marginTop: 4,
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      borderColor: theme.palette.primaryColor[500],
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primaryColor[500],
  },
  "& .MuiInputBase-input": {
    fontSize: "17px",
    lineHeight: "24px",
  },
};
export default SearchBusiness;
