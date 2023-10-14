import { Grid } from "@mui/material";
import { Header } from "/src/components/molecules/header";
import { LoginSignup } from "/src/components/templates/loginSignUP";
import AccountCard from "/src/components/molecules/AccountCard";
import SendIcon from "/public/assets/images/Muiicons/send.svg";
import SetupIcon from "/public/assets/images/Muiicons/setup.svg";
import "./index.css";
import { TypographyComponent } from "/src/components/atoms/Typography";
import {
  SEND_MONEY_SUB_TITLE,
  SEND_MONEY_TITLE,
  SETUP_ACCOUNT_SUB_TITLE,
  SETUP_ACCOUNT_TITLE,
  TRANSFER_OPTIONS_PAGE_TITLE,
} from "/src/utils/constants";
import { useNavigate } from "react-router";
export const TransferOptionsPage = () => {
  const navigate = useNavigate();
  const handleSelect = (val: string) => {
    navigate("/amountPage");
  };

  const handleArrowClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="transfer-options-page">
      <LoginSignup
        head={<Header steps={[]} arrow={true} close={true} onClick={handleArrowClick} />}
        children={
          <Grid container>
            <Grid item sm={4}></Grid>
            <Grid item sm={4}>
              <div className="transfer-option-content">
                <div className="transfer-options-page-title">
                  <TypographyComponent variant="heading1">
                    {TRANSFER_OPTIONS_PAGE_TITLE}
                  </TypographyComponent>
                </div>
                <div className="transfer-options">
                  <AccountCard
                    className="transfer-options-item"
                    srcIcon={SendIcon}
                    title={SEND_MONEY_TITLE}
                    subtitle={SEND_MONEY_SUB_TITLE}
                    onClick={() => handleSelect("send")}
                  />
                  <AccountCard
                    className="transfer-options-item"
                    srcIcon={SetupIcon}
                    title={SETUP_ACCOUNT_TITLE}
                    subtitle={SETUP_ACCOUNT_SUB_TITLE}
                    onClick={() => handleSelect("setup")}
                  />
                </div>
              </div>
            </Grid>
            <Grid item sm={4}></Grid>
          </Grid>
        }
      />
    </div>
  );
};
