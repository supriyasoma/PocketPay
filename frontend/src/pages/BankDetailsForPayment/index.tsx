import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";

import { PayeeDetailsCard } from "/src/components/organisms/EndPayment";
import { LoginSignup } from "/src/components/templates/loginSignUP";
import { Header } from "/src/components/molecules/header";
import { Store } from "/src/store/types";
import { activeStep, setTransaction } from "/src/store/actions";
import { getLoggedInUser, postMyData } from "/src/services";
import { PAYMENT_TRACKER_DATA, STATUS_PENDING } from "/src/utils/constants";
import { User } from "/src/models/user";
export const BankDetailsForPaymentPage = () => {
  
  const sendMoneySteps = useSelector((state: Store) => state.steps);
  
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [active,setActive] = useState(false);
  const transaction = useSelector((state:Store)=>state.transaction);
  const [user,setUser] = useState<User>();


  useEffect(() => {
    
    if(!active){
      dispatch(activeStep(6));
      setActive(true);
      getLoggedInUser("user",sessionStorage.getItem("email") ?? "").then(res=>{
        if(res.data){
          setUser(res.data);
        }
      });
    }
    dispatch(
      setTransaction({
        status: STATUS_PENDING
      })
    );
  });
  const handleArrowClick = () => {
    navigate("/payWithYourBank");
  };
  const handleContinue = () => {
    postMyData('transaction',{...transaction,senderId:user?.id}).then(res=>{
      navigate("/dashboard");
    });

  };
  const handleCancel = () => {
    navigate("/dashboard");

  };

  return (
    <div className="bank-details-for-payment-page">
      <LoginSignup
        head={
          <Header arrow={true} onClick={handleArrowClick} steps={sendMoneySteps ? sendMoneySteps:[]} close={true}/>
        }
        children={
          <Grid container>
            <Grid item sm={4}></Grid>
            <Grid item sm={4}>
              <PayeeDetailsCard  transaction={transaction} handleContinue={handleContinue} handleCancel={handleCancel}/>
            </Grid>
            <Grid item sm={4}></Grid>
          </Grid>
        }
      />
    </div>
  );
};
