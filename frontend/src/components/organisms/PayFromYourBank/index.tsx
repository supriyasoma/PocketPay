import React from "react";

import theme from "/src/theme/theme";
import { TypographyComponent } from "/src/components/atoms/Typography";
import "./index.css";
import BankFlag from "/public/assets/images/Bank/Flag.svg";
import LockImage from "/public/assets/images/Lock.svg";
import Image from "/src/components/atoms/Image";
import { CustomButton } from "/src/components/atoms/Button";

interface PayfromBankProps {
  bankName?: string;
  amount?: number;
  currency?: string;
  bankLogo?: string;
  handleContinueClick?: () => void;
}
const titleStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "400",
  lineHeight: "40px",
  color: `${theme.palette.textColor.highemp}`,
  ...theme.typography.heading1,
};

const textContentStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "400",
  lineHeight: "24px",
  color: `${theme.palette.textColor.medemp}`,
  ...theme.typography.body3,
};

const body1Style: React.CSSProperties = {
  fontSize: "20px",
  lineHeight: "85px",
  fontWeight: "400",
  color: `${theme.palette.textColor.highemp}`,
  ...theme.typography.body1,
};

const btnStyle: React.CSSProperties = {
  width: "218px",
  padding: "16px 40px",
  borderRadius: "56px",
  backgroundColor: `${theme.palette.primaryColor[500]}`,
  textTransform: "inherit",
};

export const PayFromYourBankComponent = (props: PayfromBankProps) => {
  const { bankName, amount, currency, bankLogo, handleContinueClick } = props;

  return (
    <div className="pay-from-bank-container" data-testid="pay-from-bank-org">
      <div className="pay-from-bank-header">
        <TypographyComponent style={titleStyle}>
          Pay from your {bankName} account
        </TypographyComponent>
      </div>
      <div className="card-container">
        <TypographyComponent style={textContentStyle}>
          You’ll be redirected to {bankName}, where you can securely log in to
          your own <b>business</b> account and approve the payment for your{" "}
          <b>
            {amount} {currency}
          </b>{" "}
          transfer.
        </TypographyComponent>

        <TypographyComponent style={body1Style}>
          Safe and Secure
        </TypographyComponent>

        <TypographyComponent style={textContentStyle}>
          <ul className="bank-security-checklist">
            <li>We’ll use an encrypted end to end connection.</li>
            <li>
              Your bank will not share your login details with PocketPay or
              anyone else.
            </li>
          </ul>
        </TypographyComponent>

        <div className="logos-container">
          <div
            className="bank-flag-sec"
            style={{ backgroundColor: `${theme.palette.primaryColor[100]}` }}
          >
            <Image src={BankFlag} height="20px" width="20px" />
          </div>
          <div className="secure-connection-img">
            <Image src={LockImage} height="24px" width="24px" />
          </div>
          <div className="bank-logo-sec">
            <Image src={bankLogo} width="60px" height="60px" />
          </div>
        </div>

        <div className="btn-container">
          <CustomButton
            label="Continue to pay"
            variant="contained"
            onClick={handleContinueClick}
            style={btnStyle}
          />
        </div>
      </div>
    </div>
  );
};
