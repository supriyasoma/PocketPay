import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
export interface LoginSignupProps {
  head: React.ReactNode;
  children: React.ReactNode;
  image?: React.ReactNode;
}
const Wrapper = styled(Box)({
  width: "98vw",
  height: "98vh",
  display: "flex",
  flexDirection: "column",
  ".head": {
    paddingLeft: "80px",
    PaddingTop: "32px",
  },
});
export const LoginSignup = ({ head, children, image }: LoginSignupProps) => {
  return (
    <Wrapper>
      <Box className="head">{head}</Box>
      <Box>{image}</Box>
      <Box>{children}</Box>
    </Wrapper>
  );
};
