import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
import { getMyData } from "/src/services";
import { setUserDetails } from "/src/store/actions";

export interface SignUpProps {}
const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  width: "37.77vw",
  height: "71.22vh",
  paddingTop: "118px",
  paddingLeft: "31.11vw",
  ".button": {
    width: "31.47vw",
    height: "7.29vh",
    borderRadius: "56px",
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
  ".MainDiv": {
    display: "flex",
    gap: "94px",
    paddingLeft: "88px",
  },
  ".SubDiv": {
    height: "7.29vh",
    width: "4.09vw",
    cursor: "pointer",
  },
  ".Links": {
    color: theme.palette.primaryColor[500],
    textDecorationColor: theme.palette.primaryColor[500],
    cursor: "pointer",
  },
});

export const SignUp = () => {
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
  const [emailError, setEmailError] = useState("");

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

  const handleDisable = () => {
    return !(email !== "" && emailError == "");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handleSignup = () => {
    getMyData(`user?email=${email}`).then((res) => {
      if (res?.data.length!=0) {
        setEmailError("This email already exists");
      } else {
        dispatch(setUserDetails({email:email}))
        navigate("/selectAccountType")
      }
    },()=>{
      dispatch(setUserDetails({email:email}))
      navigate("/selectAccountType")
    });  
  };

  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <TypographyComponent
        style={{ ...theme.typography.heading1, paddingBottom: "12px" }}
      >
        Create your PocketPay account
      </TypographyComponent>
      <Box>
        <TextFieldComponent
          id="email"
          style={{ width: "31.47vw", height: "7.81vh" }}
          type="email"
          placeholder="Enter your email address"
          onChange={handleChange}
          value={email}
        />{" "}
        {emailError && (
          <TypographyComponent sx={{ color: "red" }}>
            {emailError}
          </TypographyComponent>
        )}
      </Box>

      <CustomButton
        className="button"
        label="Sign up"
        variant="contained"
        onClick={handleSignup}
        disabled={handleDisable()}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <TypographyComponent
          style={{
            ...theme.typography.caption1,
            color: theme.palette.textColor.medemp,
          }}
        >
          Or, Log in with
        </TypographyComponent>
        <Box className="MainDiv">
          {objects.map((item) => {
            return (
              <Box
                className="SubDiv"
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

      <TypographyComponent
        style={{
          ...theme.typography.caption1,
          color: theme.palette.textColor.medemp,
        }}
      >
        By registering, you accept our{" "}
        <Link className="Links">Terms of use</Link> and{" "}
        <Link className="Links">Privacy Policy</Link>
      </TypographyComponent>

      <Box
        sx={{
          height: "0px",
          borderBottom: `1px solid ${theme.palette.greyColor.stroke}`,
          width: "37.77vw",
        }}
      ></Box>

      <TypographyComponent
        style={{
          ...theme.typography.caption1,
          color: theme.palette.textColor.medemp,
          paddingLeft: "149px",
        }}
      >
        Already have an account?
        <Link className="Links" data-testid="login-link" onClick={() => navigate("/login")}>
          Log in
        </Link>
      </TypographyComponent>
    </Wrapper>
  );
};
