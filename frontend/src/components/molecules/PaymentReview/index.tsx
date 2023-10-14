import styled from "@emotion/styled";
import { Box, Card, Stack } from "@mui/material";

import { TypographyComponent } from "/src/components/atoms/Typography";
import { CustomButton } from "/src/components/atoms/Button";
import theme from "/src/theme/theme";
import Image from "/src/components/atoms/Image";
import right from "/public/assets/images/Muiicons/arrow-right.svg";
import { Transaction } from "/src/models/transaction";
import {
  FEE,
  FEE_VALUE,
  AMOUNT,
  GUARANTEED_VALUE,
  GUARANTEED_RATE,
  NAME,
  ACCOUNT_NUMBER,
  ACCOUNT_TYPE,
  EMAIL,
  CANCEL_THIS_TRANSFER, CONTINUE_PAY, StepReviewer
} from "/src/utils/constants";
export interface PaymentReviewprops {
  onClickone?: () => void;
  onClicktwo?: () => void;
  showButtons?: boolean;
  transaction?:Transaction
}
const StyleBox = styled(Box)({
  minWidth: "474px",
  minHeight: "650px",
  display: "inline-block",
});
const StyleCard = styled(Card)({
  paddingBottom: 25,
  boxShadow: "0",
  border: `1px solid ${theme.palette.greyColor.stroke}`,
  paddingTop: "48px",
  paddingLeft: "32px",
  paddingRight: "32px",
  borderRadius:"10px"
});
const PayButton = styled(CustomButton)({
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
});
const CancelButton = styled(CustomButton)({
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
});
const Typoone: React.CSSProperties = {
  color: theme.palette.textColor.highemp,
  ...theme.typography.body2,
};
const Typotwo: React.CSSProperties = {
  color: theme.palette.textColor.medemp,
  ...theme.typography.body2,
};
const Typothree: React.CSSProperties = {
  color: theme.palette.textColor.lowemp,
  ...theme.typography.caption1,
};

export const PaymentReviews = ({
  onClickone,
  onClicktwo,
  transaction,
  showButtons = true,
}: PaymentReviewprops) => {
 
  return (
    <StyleBox data-testid="confirmPurchase">
      <StyleCard>
        <Stack spacing={5}>
          <Stack width="100%" spacing={4}>
            <TypographyComponent children={StepReviewer.transfer} style={Typothree} />
            <Stack direction="row" spacing={2}>
              <TypographyComponent children={transaction?.convertedAmount+""+transaction?.toCurrency} style={Typoone} />
              <Image src={right} alt="changes to" width="24px" height="24px" />
              <TypographyComponent
                children={transaction?.amount+""+transaction?.fromCurrency}
                style={Typoone}
              />
            </Stack>
              <Stack direction="row" justifyContent="space-between">
                <TypographyComponent children={FEE} style={Typotwo} />

                <TypographyComponent children={FEE_VALUE} style={Typoone} />
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <TypographyComponent  children={AMOUNT} style={Typotwo} />

                <TypographyComponent children={transaction?.amount +""+transaction?.fromCurrency}  style={Typoone} />
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <TypographyComponent  children={GUARANTEED_RATE} style={Typotwo} />

                <TypographyComponent children={GUARANTEED_VALUE}   style={Typoone} />
              </Stack>
          </Stack>
          <Stack width="100%" spacing={4}>
            <TypographyComponent children={StepReviewer.recipient} style={Typothree} />
              <Stack  direction="row" justifyContent="space-between">
                <TypographyComponent children={NAME} style={Typotwo} />
                <TypographyComponent children={transaction?.recipient?.firstName+" "+transaction?.recipient?.lastName} style={Typoone} />
              </Stack>
              <Stack  direction="row" justifyContent="space-between">
                <TypographyComponent children={EMAIL} style={Typotwo} />
                <TypographyComponent children={transaction?.recipient?.email} style={Typoone} />
              </Stack>
              <Stack  direction="row" justifyContent="space-between">
                <TypographyComponent children={ACCOUNT_NUMBER} style={Typotwo} />
                <TypographyComponent children={transaction?.recipient?.accountNumber} style={Typoone} />
              </Stack>

              <Stack  direction="row" justifyContent="space-between">
                <TypographyComponent children={ACCOUNT_TYPE} style={Typotwo} />
                <TypographyComponent children={transaction?.recipient?.accountType} style={Typoone} />
              </Stack>
          </Stack>
        </Stack>
        <br />
        <br />
        <br />
        {showButtons && (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={6}
          >
            <PayButton
              onClick={onClickone}
              variant="contained"
              label={CONTINUE_PAY}
            />
            <CancelButton
              onClick={onClicktwo}
              variant="contained"
              label={CANCEL_THIS_TRANSFER}
            />
          </Stack>
        )}
      </StyleCard>
    </StyleBox>
  );
};
