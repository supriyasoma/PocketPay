import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";

import { LoginSignup } from "/src/components/templates/loginSignUP";
import { Header } from "/src/components/molecules/header";
import { PayFromYourBankComponent } from "/src/components/organisms/PayFromYourBank";
import { useState } from "react";
import { Store } from "/src/store/types";
import { activeStep } from "/src/store/actions";
import { logos } from "/src/utils/constants";

export const PayfromYourBankPage = () => {
  const sendMoneySteps = useSelector((state: Store) => state.steps);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active,setActive] = useState(false);
  const transaction = useSelector((state:Store)=>state.transaction);

  useState(() => {
    if(!active){
      dispatch(activeStep(6));
      setActive(true);
    }
  });

  const handlePayfromContinue = () => {
    navigate("/bankDetailsForPayment");
  };

  const payFromBankProps = {
    bankName: transaction?.bank?.bankName,
    amount: transaction?.amount,
    currency: transaction?.fromCurrency,
    bankLogo: logos[transaction?.bank?.logoSrc!],
    handleContinueClick: handlePayfromContinue,
  };
  const handleArrowClick = () => {
    navigate("/ChooseBank");
  };
  return (
    <div className="pay-from-your-bank-page">
      <LoginSignup
        head={
          <Header arrow={true} onClick={handleArrowClick} steps={sendMoneySteps ? sendMoneySteps:[]} close={true}/>
        }
        children={
          <Grid container>
            <Grid item sm={4}></Grid>
            <Grid item sm={4}>
              <PayFromYourBankComponent {...payFromBankProps} />
            </Grid>
            <Grid item sm={4}></Grid>
          </Grid>
        }
      />
    </div>
  );
};
