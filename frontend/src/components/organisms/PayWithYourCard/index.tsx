import React, { useState } from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

import { CvvCard } from "/src/components/molecules/CvvCard";
import { TypographyComponent } from "/src/components/atoms/Typography";
import theme from "/src/theme/theme";
import { PaymentReviews } from "/src/components/molecules/PaymentReview";
import { Transaction } from "/src/models/transaction";
export interface PayWithYourCardProps {
  transaction?:Transaction
  cvvvalue?: string;
  expiredvalue?: string;
  onClickContinue?: () => void;
  onClickCancel?: () => void;
}

const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "24px",
  ".titleTypo": {
    ...theme.typography.heading1,
    color: theme.palette.textColor.highemp,
    paddingBottom: "32px",
  },
  ".saveCard": {
    ...theme.typography.body3,
    color: theme.palette.primaryColor[500],
    paddingBottom: "12px",
    borderBottom: `2px solid ${theme.palette.primaryColor[500]}`,
  },
  ".newCard": {
    ...theme.typography.body3,
    color: theme.palette.textColor.medemp,
  },
  ".mainTitle": {
    display: "flex",
    flexDirection: "row",
    gap: "107px",
    paddingBottom: "15px",
    paddingLeft: "80px",
  },
  ".Cvv": {
    display: "flex",
    flexDirection: "column",
  },
  ".line": {
    height: "1px",
    width: "32.7vw",
    backgroundColor: theme.palette.greyColor.stroke,
    marginBottom: "40px",
  },
  ".errorText": {
    color: "red",
    paddingLeft: "80px",
  },
});

export const PayWithYourCard = ({
  transaction,
  cvvvalue,
  expiredvalue,
  onClickContinue,
  onClickCancel,
}: PayWithYourCardProps) => {
  const [cvv, setCvv] = useState("");
  const [cvvError, setCvvError] = useState<string | undefined>("");

  const validateCvv = (cvv: string) => {
    if (cvv.trim() === "") {
      return "CVV is required";
    }
    if (!/^\d+$/.test(cvv)) {
      return "CVV must contain only numbers";
    }
    if (cvv.length < 3 || cvv.length > 4) {
      return "cvv must be 3-4 digits only";
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCvv(value);
    setCvvError(validateCvv(value));
  };

  return (
    <Wrapper>
      <Box>
        <TypographyComponent className="titleTypo">
          Pay with your card
        </TypographyComponent>
        <Box className="mainTitle">
          <Box sx={{ width: "98px" }}>
            <TypographyComponent className="saveCard">
              SAVED CARD
            </TypographyComponent>
          </Box>
          <TypographyComponent className="newCard">
            NEW CARD
          </TypographyComponent>
        </Box>
        <Box className="Cvv">
          <Box className="line"></Box>
          <Box sx={{ marginBottom: "0px" }}>
            <CvvCard
              data-testId="cvvfield"
              cardname="EUR Visa Debit"
              lastdigit="Last four digit"
              cvvvalue={cvvvalue}
              expiryvalue={expiredvalue}
              expirydate="Expiry date"
              value={cvv}
              checked
              onChangecheck={handleChange}
            />
            {cvvError && (
              <TypographyComponent className="errorText">
                {cvvError}
              </TypographyComponent>
            )}
          </Box>
          <Box>
            <CvvCard
              cardname="EUR Visa Debit"
              lastdigit="Last four digit"
              cvvvalue={cvvvalue}
              expiryvalue={expiredvalue}
              expirydate="Expiry date"
              checked={false}
            />
          </Box>
        </Box>
      </Box>
      <PaymentReviews
        transaction={transaction}
        onClickone={onClickContinue}
        onClicktwo={onClickCancel}
      />
    </Wrapper>
  );
};
