import { ChangeEvent } from "react";
import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LanguageIcon from "@mui/icons-material/Language";

import "./index.css";
import { TypographyComponent } from "/src/components/atoms/Typography";
import theme from "/src/theme/theme";
import { PaymentTypeAndAddressCard } from "/src/components/molecules/PaymentTypeAndAddressCard";
import { CustomButton } from "/src/components/atoms/Button";
import { Transaction } from "/src/models/transaction";
import { ACCOUNT_NUMBER, ACCOUNT_TYPE, AMOUNT, EMAIL, FEE, FEE_VALUE, GUARANTEED_RATE, GUARANTEED_VALUE, NAME, StepReviewer } from "/src/utils/constants";

interface StepPayProps {
  title?: string;
  handleContinueClick?: () => void;
  handleCancelClick?: () => void;
  handlePaymentTypeChange?: (event: ChangeEvent) => void;
  paymentType?: string;
  transaction?:Transaction
}

interface TransferDetails {
  fromCurrency?: string;
  toCurrency?: string;
  recipientDatails: RecipientDetails;
}

interface RecipientDetails {
  firstName: string;
  lastName: string;
  email?: string;
  accountNumber?: string;
  accountType?: string;
}
const Heading1 = styled(TypographyComponent)({
  ...theme.typography.heading1,
});

const Caption = styled(TypographyComponent)({
  ...theme.typography.caption1,
  color: `${theme.palette.textColor.medemp}`,
});

const Body3 = styled(TypographyComponent)({
  ...theme.typography.body3,
});

const Body2 = styled(TypographyComponent)({
  ...theme.typography.body2,
});

const creditCardProps = {
  gridStyle: { flexDirection: "row" },
  cardStyle: { width: "474px", boxShadow: "none" },
  cardType: "payment",
  content: (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Body3>Credit card</Body3>
      <Caption>Send from your Visa or Mastercard.</Caption>
      <Caption>Should arrive by January 28th.</Caption>
    </div>
  ),
  icon: <CreditCardIcon />,
};

const debitCardProps = {
  gridStyle: { flexDirection: "row" },
  cardStyle: { width: "474px", boxShadow: "none" },
  cardType: "payment",
  content: (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Body3>Debit Card</Body3>
      <Caption>Send from your Visa or Mastercard.</Caption>
      <Caption>Should arrive by January 28th.</Caption>
    </div>
  ),
  icon: <CreditCardIcon />,
  value: "DEBIT_CARD",
};
const bankTransferProps = {
  gridStyle: { flexDirection: "row" },
  cardStyle: { width: "474px", boxShadow: "none" },
  cardType: "payment",
  content: (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Body3>Transfer from your bank account</Body3>
      <Caption>Transfer the money using bank account</Caption>
      <Caption>Should arrive by January 28th.</Caption>
    </div>
  ),
  value: "BANK_TRANSFER",
  icon: <AccountBalanceIcon />,
};

const advanceTransferProps = {
  gridStyle: { flexDirection: "row" },
  cardStyle: { width: "474px", boxShadow: "none" },
  cardType: "payment",
  content: (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Body3>SWIFT Transfer</Body3>
      <Caption>Send GBP from your bank account outside the UK.</Caption>
      <Caption>Should arrive by January 28th.</Caption>
    </div>
  ),
  icon: <LanguageIcon />,
};

export const StepPay = (props: StepPayProps) => {
  const {
    title,
    handleCancelClick,
    handleContinueClick,
    paymentType,
    handlePaymentTypeChange,
    transaction
  } = props;

  return (
    <div data-testid="step-pay" className="step-pay-container">
      <div className="section1">
        <div className="step-pay-page-title">
          <Heading1 className="step-pay-page-title-content">{title}</Heading1>
        </div>
        <div className="transfer-type-block">
          <div className="fast-easy-section">
            <Caption className="caption-text">Fast and easy transfer</Caption>

            <PaymentTypeAndAddressCard
              className="type-debit-card"
              onChange={handlePaymentTypeChange}
              checked={paymentType == "DEBIT_CARD"}
              {...debitCardProps}
            />

            <PaymentTypeAndAddressCard
              className="type-credit-card"
              disabled={true}
              {...creditCardProps}
            />
          </div>
        </div>

        <div className="transfer-type-block">
          <div className="low-cost-section">
            <Caption className="caption-text">Low cost transfer</Caption>
            <PaymentTypeAndAddressCard
              className="type-bank-transfer"
              onChange={handlePaymentTypeChange}
              checked={paymentType == "BANK_TRANSFER"}
              {...bankTransferProps}
            />
          </div>
        </div>

        <div className="transfer-type-block">
          <div className="advance-section">
            <Caption className="caption-text">Advanced transfer</Caption>
            <PaymentTypeAndAddressCard
              className="type-bank-transfer"
              disabled={true}
              {...advanceTransferProps}
            />
          </div>
        </div>
      </div>
      <div className="section2">
        <div className="transfer-details-block">
          <Caption>Transfer details</Caption>
          <div className="currency-display-block">
            <Body2 sx={{ color: `${theme.palette.textColor.highemp}` }}>
              {transaction?.convertedAmount+""+transaction?.toCurrency}
            </Body2>
            <ArrowBackIcon />
            <Body2 sx={{ color: `${theme.palette.textColor.highemp}` }}>
            {transaction?.amount+""+transaction?.fromCurrency}
            </Body2>
          </div>
          <div className="content-block">
            <Body2
              sx={{ color: `${theme.palette.textColor.medemp}`, width: "50%" }}
            >
              {FEE}:
            </Body2>
            <div className="content-rev">
              <Body2
                sx={{
                  float: "right",
                  color: `${theme.palette.textColor.highemp}`,
                }}
              >
                {FEE_VALUE}
              </Body2>
            </div>
          </div>
          <div className="content-block">
            <Body2
              sx={{ color: `${theme.palette.textColor.medemp}`, width: "50%" }}
            >
              {AMOUNT}:
            </Body2>
            <div className="content-rev">
              <Body2
                sx={{
                  float: "right",
                  color: `${theme.palette.textColor.highemp}`,
                }}
              >
                {transaction?.amount+""+transaction?.fromCurrency}
              </Body2>
            </div>
          </div>

          <div className="content-block">
            <Body2
              sx={{ color: `${theme.palette.textColor.medemp}`, width: "50%" }}
            >
              {GUARANTEED_RATE}:
            </Body2>
            <div className="content-rev">
              <Body2
                sx={{
                  float: "right",
                  color: `${theme.palette.textColor.highemp}`,
                }}
              >
               {GUARANTEED_VALUE}
              </Body2>
            </div>
          </div>
        </div>

        <div className="recipient-details-block">
          <Caption>{StepReviewer.recipient}</Caption>

          <div className="content-block">
            <Body2
              sx={{ color:`${theme.palette.textColor.medemp}`, width: "50%" }}
            >
              {NAME}:
            </Body2>
            <div className="content-rev">
              <Body2
                sx={{
                  float: "right",
                  color: `${theme.palette.textColor.highemp}`,
                }}
              >
                {transaction?.recipient?.firstName+" "+transaction?.recipient?.firstName}
              </Body2>
            </div>
          </div>
          <div className="content-block">
            <Body2
              sx={{ color: `${theme.palette.textColor.medemp}`, width: "50%" }}
            >
              {EMAIL}:
            </Body2>
            <div className="content-rev">
              <Body2
                sx={{
                  float: "right",
                  color: `${theme.palette.textColor.highemp}`,
                }}
              >
                {transaction?.recipient?.email}
              </Body2>
            </div>
          </div>

          <div className="content-block">
            <Body2
              sx={{ color: `${theme.palette.textColor.medemp}`, width: "50%" }}
            >
              {ACCOUNT_NUMBER}:
            </Body2>
            <div className="content-rev">
              <Body2
                sx={{
                  float: "right",
                  color: `${theme.palette.textColor.highemp}`,
                }}
              >
                {transaction?.recipient?.accountNumber}
              </Body2>
            </div>
          </div>

          <div className="content-block">
            <Body2
              sx={{ color: `${theme.palette.textColor.medemp}`, width: "50%" }}
            >
              {ACCOUNT_TYPE}:
            </Body2>
            <div className="content-rev">
              <Body2
                sx={{
                  float: "right",
                  color: `${theme.palette.textColor.highemp}`,
                }}
              >
                {transaction?.recipient?.accountType}
              </Body2>
            </div>
          </div>
        </div>
        <div className="action-btn-section">
          <CustomButton
            label="Continue to pay"
            className="step-continue-to-pay-btn"
            variant="contained"
            sx={{ backgroundColor: `${theme.palette.primaryColor[500]}` }}
            onClick={handleContinueClick}
            data-testid="step-continue-to-pay-btn"
          />
          <br></br>
          <CustomButton
            label="Cancel this transfer"
            className="step-cancel-pay-btn"
            variant="contained"
            sx={{ color: theme.palette.primaryColor[500] }}
            onClick={handleCancelClick}
            data-testid="step-cancel-pay-btn"
          />
        </div>
      </div>
    </div>
  );
};
