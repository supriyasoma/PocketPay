import { Box, Grid } from "@mui/material";
import styled from "@emotion/styled";

import { TypographyComponent } from "/src/components/atoms/Typography";
import theme from "/src/theme/theme";
import Image from "/src/components/atoms/Image";
import {
  END_TITLE,
  GBP_TITLE,
  SUB_TITLE,
  UK_SORT_CODE_VAL,
  ACCOUNT_NUMBER, 
  REFERENCE,
  PAYEE_NAME,
  AMOUNT_TO_SEND,
  UK_SORT_CODE,
  ONLINE_BANKING_MSG_2,
  logos,
  REFERENCE_ID
  
} from "/src/utils/constants";
import { CustomButton } from "/src/components/atoms/Button";
import { PayeeDetails } from "/src/models/payee-details";
const Wrapper = styled(Box)({
  width: "38vw",
  marginBottom: "10px",
  overflow: "auto",
  " ::-webkit-scrollbar": {
    display: "none",
  },
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  ".title": {
    ...theme.typography.heading1,
    color: theme.palette.textColor.highemp,
  },
  ".titleDiv": {
    width: "34vw",
  },
  ".Div": {
    height: "921px",
    width: "34vw",
    borderRadius: "16px",
    border: `1px solid ${theme.palette.greyColor.stroke}`,
  },
  ".bottomText": {
    color: theme.palette.textColor.medemp,
    ...theme.typography.body3,
    paddingLeft: "32px",
    paddingRight: "50px",
    paddingBottom: "40px",
  },
  ".links": {
    color: theme.palette.primaryColor[500],
    textDecorationColor: theme.palette.primaryColor[500],
    cursor: "pointer",
  },
  ".gbpTitle": {
    ...theme.typography.body1,
    color: theme.palette.textColor.highemp,
    paddingLeft: "32px",
    paddingTop: "16px",
    paddingBottom: "12px",
  },
  ".subTitle": {
    ...theme.typography.caption1,
    color: theme.palette.textColor.medemp,
    paddingLeft: "32px",
    paddingBottom: "27px",
  },
  ".content": {
    "& .MuiGrid-item": {
      paddingBottom: "40px",
      paddingLeft: "32px",
    },
    "& .body": {
      marginTop: "8px",
    },
    ".titles": {
      ...theme.typography.caption1,
      color: theme.palette.textColor.lowemp,
    },
    ". value": {
      ...theme.typography.body2,
      color: theme.palette.textColor.highemp,
    },
  },
  ".continue": {
    background: `${theme.palette.primaryColor[500]}`,
    color: `${theme.palette.structuralColor.white}`,
    width: "218px",
    height: "56px",
    borderRadius: "56px",
    textTransform: "none",
    "&:hover": {
      background: `${theme.palette.primaryColor[500]}`,
      color: `${theme.palette.structuralColor.white}`,
    },
  },
  ".cancel": {
    color: `${theme.palette.primaryColor[500]}`,
    background: `${theme.palette.structuralColor.white}`,
    width: "218px",
    height: "56px",
    borderRadius: "56px",
    textTransform: "none",
    "&:hover": {
      color: `${theme.palette.primaryColor[500]}`,
      background: `${theme.palette.structuralColor.white}`,
    },
  },
  ".buttons": {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    paddingLeft: "9vw",
    paddingBottom: "40px",
  },
});
const ImageDiv = styled(Image)({
  paddingLeft: "15.4vw",
  paddingTop: "16px",
});

export const PayeeDetailsCard = ({
  handleContinue,
  handleCancel,
  transaction
}: PayeeDetails) => {
  return (
    <Wrapper>
      <Box className="titleDiv">
        <TypographyComponent className="title">{END_TITLE}</TypographyComponent>
      </Box>
      <Box className="Div">
        <ImageDiv src={logos[transaction?.bank?.logoSrc!]} alt="LIoyds" />
        <TypographyComponent className="gbpTitle">
          {GBP_TITLE} {transaction?.fromCurrency}
        </TypographyComponent>
        <TypographyComponent className="subTitle">
          {SUB_TITLE}
        </TypographyComponent>

        <Grid container className="content">
            <Grid item xs={6}>
              <Box className="content-item">
                <TypographyComponent className="titles">
                {PAYEE_NAME}
                </TypographyComponent>
                <TypographyComponent className="value">
                  {transaction?.recipient?.firstName + " "+transaction?.recipient?.lastName}
                </TypographyComponent>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box className="content-item">
                <TypographyComponent className="titles">
                {REFERENCE}
                </TypographyComponent>
                <TypographyComponent className="value">
                  {REFERENCE_ID}
                </TypographyComponent>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box className="content-item">
                <TypographyComponent className="titles">
                {AMOUNT_TO_SEND}
                </TypographyComponent>
                <TypographyComponent className="value">
                  {transaction?.amount +""+ transaction?.fromCurrency}
                </TypographyComponent>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="content-item">
                <TypographyComponent className="titles">
                {UK_SORT_CODE}
                </TypographyComponent>
                <TypographyComponent className="value">
                  {UK_SORT_CODE_VAL}
                </TypographyComponent>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box className="content-item">
                <TypographyComponent className="titles">
                {ACCOUNT_NUMBER}
                </TypographyComponent>
                <TypographyComponent className="value">
                  {transaction?.recipient?.accountNumber}
                </TypographyComponent>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="content-item">
                <TypographyComponent className="titles">
                {ACCOUNT_NUMBER}
                </TypographyComponent>
                <TypographyComponent className="value">
                  {transaction?.bank?.address}
                </TypographyComponent>
              </Box>
            </Grid>
        </Grid>
        <TypographyComponent className="bottomText">
        {ONLINE_BANKING_MSG_2} {transaction?.bank?.bankName} {ONLINE_BANKING_MSG_2}
        </TypographyComponent>
        <Box className="buttons">
          <CustomButton
            className="continue"
            label="Continue"
            variant="contained"
            onClick={handleContinue}
          />
          <CustomButton
            className="cancel"
            label="Cancel the transfer"
            variant="contained"
            onClick={handleCancel}
          />
        </Box>
      </Box>
    </Wrapper>
  );
};
