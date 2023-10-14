import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import { Box, Link } from "@mui/material";


import { TypographyComponent } from "/src/components/atoms/Typography";
import { TextFieldComponent } from "/src/components/atoms/TextField";
import { CustomButton } from "/src/components/atoms/Button";
import Image from "/src/components/atoms/Image";
import GoogleIcon from "/public/assets/images/BrandIcons/google.svg";
import FaceBookIcon from "/public/assets/images/BrandIcons/facebook.svg";
import AppleIcon from "/public/assets/images/BrandIcons/apple.svg";
import theme from "/src/theme/theme";
import Eye from "/public/assets/images/Muiicons/eye.svg";
import EyeOff from "/public/assets/images/Muiicons/eye-off.svg";
import { CheckBoxComponent } from "/src/components/atoms/Checkbox";
import { login} from "/src/services";

export interface LogInProps {}
const LoginBox = styled(Box)({
  height: "71.22vh",
  paddingTop: "118px",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  paddingLeft: "31.11vw",
  width: "37.77vw",
  ".buttonDiv": {
    borderRadius: "56px",
    width: "31.47vw",
    height: "7.29vh",
    backgroundColor: theme.palette.primaryColor[500],
    ":disabled": {
      backgroundColor: theme.palette.primaryColor[100],
      color: theme.palette.structuralColor.white,
      opacity: "56%",
    },
    ":hover": {
      backgroundColor: theme.palette.primaryColor[500],
    },
  },
  ".BottomDiv": {
    paddingLeft: "88px",
    display: "flex",
    gap: "94px",
  },
  ".SubBottomDiv": {
    height: "7.29vh",
    width: "4.09vw",
    cursor: "pointer",
  },
  ".CheckBoxDiv": {
    display: "flex",
    gap: "225px",
  },
  ".LogInLinks": {
    cursor: "pointer",
    color: theme.palette.primaryColor[500],
    textDecorationColor: theme.palette.primaryColor[500],
  },
  ".TextDiv": {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
});

const EyeImage = styled(Image)({
  cursor: "pointer",
});
const MiddleDiv = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

export const LogInComponent = () => {
  const objects = [
    {
      icon: GoogleIcon,
    },
    {
      icon: FaceBookIcon,
    },
    {
      icon: AppleIcon,
    },
  ];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [labelEmailmsg, setLabelEmailmsg] = useState(false);
  const [labelPasswordmsg, setLabelPasswordmsg] = useState(false);
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const handleDisable = () => {
    return !(
      email !== "" &&
      password !== "" &&
      emailError == "" &&
      passwordError == ""
    );
  };
  const validateEmail = (email: string) => {
    if (email.trim() === "") {
      return "Email is required";
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Invalid email address";
    }
    return "";
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setEmailError(validateEmail(value));
    setPasswordError("")
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    setPasswordError("")

  };
  const handleSignup = () => {
    setEmailError("");
    setPasswordError("");
    let body = {
      email:email,
      password:password
    };
    login(body).then((res)=>{
      if(res.status == 200){
        sessionStorage.setItem("email",email);
        navigate("/dashboard");
      }
      else{
        setPasswordError(res.statusText);
      }
    },(err)=>{
      setPasswordError("Invalid credentials!");
    });
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailFocus = () => {
    setLabelEmailmsg(!labelEmailmsg);
  };

  const handlePasswordFocus = () => {
    setLabelPasswordmsg(!labelPasswordmsg);
  };

  return (
    <LoginBox>
      <TypographyComponent
        style={{ ...theme.typography.heading1, paddingBottom: "12px" }}
      >
        Welcome back
      </TypographyComponent>

      <Box className="TextDiv">
        <Box>
          <TextFieldComponent
            id="email"
            style={{ width: "31.47vw", height: "7.81vh" }}
            type="email"
            placeholder="Enter your email address"
            onChange={handleEmailChange}
            value={email}
            onFocus={handleEmailFocus}
            label={labelEmailmsg ? "Email" : ""}
          />
          {emailError && (
            <TypographyComponent sx={{ color: "red" }}>
              {emailError}
            </TypographyComponent>
          )}
        </Box>
        <Box>
          <TextFieldComponent
            id="email"
            style={{ width: "31.47vw", height: "7.81vh" }}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            onChange={handlePasswordChange}
            value={password}
            onFocus={handlePasswordFocus}
            label={labelPasswordmsg ? "Password" : ""}
            inputProps={{
              endAdornment: !showPassword ? (
                <EyeImage
                  src={EyeOff}
                  alt="eye is loading"
                  onClick={handleTogglePasswordVisibility}
                />
              ) : (
                <EyeImage
                  src={Eye}
                  alt="closed eye"
                  onClick={handleTogglePasswordVisibility}
                />
              ),
            }}
          />
          {passwordError && (
            <TypographyComponent sx={{ color: "red" }}>
              {passwordError}
            </TypographyComponent>
          )}
        </Box>
      </Box>
      <MiddleDiv>
        <CustomButton
          data-testid="login-btn"
          className="buttonDiv"
          label={"Log in"}
          variant="contained"
          onClick={handleSignup}
          disabled={handleDisable()}
        />
        <Box className="CheckBoxDiv">
          <Box sx={{ display: "flex", gap: "5px" }}>
            <CheckBoxComponent />
            <TypographyComponent
              sx={{
                ...theme.typography.body3,
                color: theme.palette.textColor.medemp,
                paddingTop: "9px",
              }}
            >
              Remember me
            </TypographyComponent>
          </Box>
          <Link className="LogInLinks" sx={{ paddingTop: "12px" }}>
            Trouble logging in?
          </Link>
        </Box>
      </MiddleDiv>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <TypographyComponent
          style={{
            ...theme.typography.caption1,
            color: theme.palette.textColor.medemp,
          }}
        >
          Or, Log in with
        </TypographyComponent>

        <Box className="BottomDiv">
          {objects.map((item) => {
            return (
              <Box
                className="SubBottomDiv"
                key={item.icon}
                onClick={() => {
                  loginWithRedirect();
                }}
              >
                <Image src={item.icon} alt="googleIcon" />
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          height: "0px",
          borderBottom: `1px solid ${theme.palette.greyColor.stroke}`,
          width: "31.11vw",
        }}
      ></Box>
    </LoginBox>
  );
};
