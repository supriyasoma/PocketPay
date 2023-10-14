import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CountryData } from "react-phone-input-2";
import { useNavigate } from "react-router";
import { Box, Link, SxProps, styled } from "@mui/material";

import { TypographyComponent } from "/src/components/atoms/Typography";
import { AccountSetupTemplate } from "/src/components/templates/AccountSetup";
import theme from "/src/theme/theme";
import { CustomButton } from "/src/components/atoms/Button";
import { LoginSignup } from "/src/components/templates/loginSignUP";
import { Header } from "/src/components/molecules/header";
import {
  TWO_FACTOR_HEADING,
  TWO_FACTOR_NO_CODE_RECEIVED,
  TWO_FACTOR_SUBHEADING,
  TWO_FACTOR_SUBTITLE,
  TWO_FACTOR_TITLE,
} from "/src/utils/constants";
import MobileNumberInput from "/src/components/molecules/MobileNumberInput";
import { TextFieldComponent } from "/src/components/atoms/TextField";
import BankCard from "/src/components/molecules/BankCard";
import RightArrow from "/public/assets/images/Muiicons/chevron-right.svg";
import Image from "/src/components/atoms/Image";
import Back from "/public/assets/images/Muiicons/Back button.svg";
import { Store } from "/src/store/types";
import { activeStepAccount, setUserDetails } from "/src/store/actions";
interface User {
  id: number;
  country: string;
}

const dialCodeToCountryCode: { [dialCode: string]: string } = {
  "91": "in",
  "1": "us",
  "43": "AT",
  "20": "AD",
};

export const TwoFactorPage = () => {
  const [dataArray, setDataArray] = useState<User[]>([]);
  const [phone, setPhone] = useState("");
  const [value, setvalue] = useState("");
  const [countrycode, setCountrycode] = useState("");
  const [code, setCode] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [currentState, setCurrentState] = useState<number>(0);
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [arrowValue, setArrowValue] = useState<number>(0);
  const navigate = useNavigate();
  const setupSteps = useSelector((state: Store) => state.accountSteps);
  const [active, setActive] = useState(false);
  const [disableContinue, setDisableContinue] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!active) {
      dispatch(activeStepAccount(4));
      setActive(true);
    }
  }, []);

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCode(value);
    const isValidCode = /^\d{6}$/.test(value);
    if (value != "") {
      setIsCodeValid(isValidCode);
    } else {
      setIsCodeValid(!isValidCode);
    }
  };

  const setPhoneNum = (
    value: string,
    data: {} | CountryData,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => {
    setPhone(formattedValue);
    setPhoneError("");
    if (event.target.value != "") {
      setDisableContinue(false);
    } else {
      setDisableContinue(true);
    }
  };

  const handleContinue = () => {
    if (!phone) {
      setPhoneError("Phone number cannot be empty");
    } else {
      dispatch(setUserDetails({ phone: phone }));
      setPhoneError("");
      setCurrentState(1);
      setArrowValue(1);
    }
  };

  const handleArrowClick = () => {
    if (arrowValue === 0) {
      navigate("/selectUserCountry");
    }
    if (arrowValue === 1) {
      setArrowValue(0);
      setCurrentState(0);
    }
    if (arrowValue === 2) {
      setArrowValue(1);
      setCurrentState(1);
    }
  };
  const templateProps = {
    content: (
      <>
        {currentState === 0 && arrowValue === 0 && (
          <Wrapper>
            <PhoneNumber>
              <TypographyComponent
                children={TWO_FACTOR_HEADING}
                style={headingstyle}
              />
              <TypographyComponent
                children={TWO_FACTOR_SUBHEADING}
                style={subtitlestyle}
              />
              <div className=".mobileinput">
                <StyledPhoneInput
                  defaultCountry="in"
                  onChange={setPhoneNum}
                  style={{ width: "516px", height: "72px" }}
                />
                {phoneError && (
                  <TypographyComponent
                    style={{ color: "red", fontSize: "16px" }}
                  >
                    {phoneError}
                  </TypographyComponent>
                )}
                <CustomButton
                  label="Continue"
                  variant="contained"
                  sx={continueBtnStyle}
                  style={{
                    backgroundColor: disableContinue
                      ? theme.palette.primaryColor[100]
                      : theme.palette.primaryColor[500],
                  }}
                  disabled={disableContinue}
                  onClick={handleContinue}
                />
              </div>
            </PhoneNumber>
          </Wrapper>
        )}
        {currentState === 1 && arrowValue === 1 && (
          <Wrapper>
            <TypographyComponent
              children={TWO_FACTOR_TITLE}
              style={headingstyle}
            />
            <TypographyComponent
              children={`${TWO_FACTOR_SUBTITLE} ${phone}`}
              style={subtitlestyle}
            />
            <TextFieldComponent
              variant="outlined"
              placeholder="Enter code here"
              style={TextfieldStyle}
              onChange={handleCodeChange}
            />
            {!isCodeValid && (
              <TypographyComponent style={{ color: "red", fontSize: "16px" }}>
                Invalid code. Please enter a valid 6-digit code.
              </TypographyComponent>
            )}
            <EditLink
              onClick={() => {
                setCurrentState(2); setArrowValue(2);
              }}
            >
              {TWO_FACTOR_NO_CODE_RECEIVED}
            </EditLink>
            <PhoneNumber>
              <CustomButton
                className="button"
                label="Submit"
                variant="contained"
                disabled={!isCodeValid}
                onClick={() => navigate("/createPassword")}
              />
            </PhoneNumber>
          </Wrapper>
        )}

        {currentState === 2 && arrowValue === 2 && (
          <Wrapper>
            <TypographyComponent
              children={"Approve another way"}
              style={headingstyle}
            />
            <TypographyComponent
              children={`${TWO_FACTOR_SUBTITLE} ${phone}`}
              style={subtitlestyle}
            />
            <BankCard bankName="Resend code by SMS" trailingIcon={RightArrow} />
            <BankCard
              bankName="Send code by voice call"
              trailingIcon={RightArrow}
            />
            <EditLink
              onClick={() => {
                setCurrentState(0); setArrowValue(0);
              }}
            >
              Use a different phone number
            </EditLink>
          </Wrapper>
        )}
      </>
    ),
  };

  return (
    <LoginSignup
      head={<Header arrow={false} steps={setupSteps ? setupSteps : []} />}
      image={
        <Box>
          <ImageDiv>
            <Image src={Back} alt="back button" onClick={handleArrowClick} />
          </ImageDiv>
        </Box>
      }
      children={<AccountSetupTemplate {...templateProps} />}
    />
  );
};
const Wrapper = styled(Box)(`
    width:38vw;
    min-width:300px;
    max-width:516px; 
`);
const headingstyle: React.CSSProperties = {
  color: theme.palette.textColor.highemp,
  ...theme.typography.heading1,
  paddingTop: "2vw",
};

const ImageDiv = styled(Box)({
  paddingTop: "40px",
  paddingLeft: "20vw",
  cursor: "pointer",
});

const subtitlestyle: React.CSSProperties = {
  color: theme.palette.textColor.medemp,
  ...theme.typography.body3,
  paddingTop: "1vw",
  paddingBottom: "2vw",
};
const PhoneNumber = styled(Box)({
  ".button": {
    marginLeft: "31.5vw",
    marginTop: "450px",
    width: "135px",
    height: "56px",
    borderRadius: "56px",
    backgroundColor: theme.palette.primaryColor[500],
    ":disabled": {
      backgroundColor: theme.palette.primaryColor[100],
      color: theme.palette.structuralColor.white,
      opacity: "56%",
    },
    "&:hover": {
      background: `${theme.palette.primaryColor[500]}`,
      color: `${theme.palette.structuralColor.white}`,
    },
  },
});
const TextfieldStyle: SxProps = {
  width: "100%",
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      borderColor: theme.palette.greyColor.stroke,
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.greyColor.stroke,
  },
  "& .MuiInputBase-input": {
    fontSize: "17px",
    lineHeight: "24px",
  },
  marginBottom: 4,
};
const EditLink = styled(Link)({
  color: theme.palette.primaryColor[500],
  textDecorationColor: theme.palette.primaryColor[500],
});
const StyledPhoneInput = styled(MobileNumberInput)({
  "& .focus": {
    borderColor: theme.palette.primaryColor[500],
  },
});
function patchMyData(arg0: string) {
  throw new Error("Function not implemented.");
}
const continueBtnStyle: React.CSSProperties = {
  marginLeft:"31.9vw",
  marginTop:"25.4vw",
  width: "135px",
  padding: "16px 30px",
  borderRadius: "56px",
};
