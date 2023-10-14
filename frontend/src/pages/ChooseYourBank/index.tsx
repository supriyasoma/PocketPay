import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";

import { Header } from "/src/components/molecules/header";
import { LoginSignup } from "/src/components/templates/loginSignUP";
import { ChooseyourBank } from "/src/components/organisms/ChooseyourBank";
import "./index.css";
import { getMyData } from "/src/services";
import { Bank } from "/src/models/bank";
import { Store } from "/src/store/types";
import { activeStep, setTransaction } from "/src/store/actions";

export const ChooseYourBankPage = () => {
  const sendMoneySteps = useSelector((state: Store) => state.steps);
  const [bankData, setBankData] = useState<Bank[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active,setActive] = useState(false);

  useEffect(() => {
    if(!active){
      dispatch(activeStep(6));
      setActive(true);
    }

    if (bankData.length == 0) {
      getMyData("banks")
        .then((res) => {
          setBankData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const handleSelectBank = (bank:Bank) => {
    dispatch(setTransaction({bank:bank}));
    navigate("/payWithYourBank");
  };
  const handleArrowClick = () => {
    navigate("/debitCardPayment");
  };
  return (
    <div className="choose-your-bank-page">
      <LoginSignup
        head={
          <Header arrow={true} onClick={handleArrowClick} steps={sendMoneySteps ? sendMoneySteps :[]} close={true} />
        }
        children={
          <Grid container>
            <Grid item sm={4}></Grid>
            <Grid item sm={4}>
              <ChooseyourBank
                oncancel={handleCancel}
                bankData={bankData}
                handleBankCardClick={handleSelectBank}
              />
            </Grid>
            <Grid item sm={4}></Grid>
          </Grid>
        }
      />
    </div>
  );
};
