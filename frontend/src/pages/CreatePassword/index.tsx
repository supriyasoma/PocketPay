import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "/src/components/atoms/Button";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Visibility from "@mui/icons-material/Visibility";

import { TextFieldComponent } from "/src/components/atoms/TextField";
import { TypographyComponent } from "/src/components/atoms/Typography";
import { AccountSetupTemplate } from "/src/components/templates/AccountSetup";
import { LoginSignup } from "/src/components/templates/loginSignUP";
import theme from "/src/theme/theme";
import "./index.css";
import { Header } from "/src/components/molecules/header";
import { Store } from "/src/store/types";
import { activeStepAccount, setUserDetails } from "/src/store/actions";

const continueBtnStyle: React.CSSProperties = {
  marginLeft:"31.9vw",
  marginTop:"25.4vw",
  width: "135px",
  padding: "16px 30px",
  borderRadius: "56px",
};

export const CreatePasswordPage = () => {
  const [disableContinue, setDisableContinue] = useState(true);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const [passwordError, setPasswordError] = useState("");
  const setupSteps = useSelector((state:Store)=>state.accountSteps);
  const dispatch = useDispatch();
  const [active,setActive] = useState(false);

  useEffect(()=>{
    if(!active){
     dispatch(activeStepAccount(5));
     setActive(true);
    }
  });

  const handlePasswordVisibilty = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handlePasswordChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
    if (event.target.value != "") {
      setDisableContinue(false);
    } else {
      setDisableContinue(true);
    }
  setPasswordError(validatePassword(event.target.value));
  };

  const validatePassword = (value: string) => {
    if (value.trim() === "") {
      return "Password is required";
    }
    if (value.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!/^[A-Z]/.test(value)) {
      return "First letter of the password must be uppercase";
    }
    return "";
  };

  const handleClick = () => {
    dispatch(setUserDetails({password:values?.password}));
    navigate("/yourBusiness");
  };
  const handleArrowClick = () => {
    navigate("/twoFactorPage");
  };
  const accountTemplateProps = {
    content: (
      <div className="create-password-body" data-testid="create-password-body">
        <TypographyComponent
          className="created-password-body-title"
          sx={{
            ...theme.typography.heading1,
            color: theme.palette.textColor.highemp,
          }}
        >
          Create your password
        </TypographyComponent>

        <TextFieldComponent
          placeholder="Enter your password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handlePasswordChange("password")}
          inputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handlePasswordVisibilty}
                  data-testid="pwd-visibility-btn"
                >
                  {values.showPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          style={{ width: "512px" }}
        />
         {passwordError && (
            <TypographyComponent sx={{ color: "red" }}>
              {passwordError}
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
        onClick={handleClick}
      />
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
      children={<AccountSetupTemplate {...accountTemplateProps} />}
    />
  );
};
