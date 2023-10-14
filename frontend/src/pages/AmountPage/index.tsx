import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector , useDispatch} from "react-redux";
import { Grid } from "@mui/material";

import { Header } from "/src/components/molecules/header";
import { StepAmount } from "/src/components/organisms/StepAmount";
import { LoginSignup } from "/src/components/templates/loginSignUP";
import { Store } from "/src/store/types";
import { activeStep, setTransaction } from "/src/store/actions";
import { Transaction } from "/src/models/transaction";

export const AmountPage = ()=>{
    const sendMoneySteps = useSelector((state:Store)=>state.steps);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [active,setActive] = useState<boolean>(false);

    useEffect(()=>{
        if(!active){
             dispatch(activeStep(1));
             setActive(true);
        }
    });

    const handleContinue = (data:Transaction)=>{
        dispatch(setTransaction(data));
    navigate("/recipientDetails");
    }
 
  const stepAmountArgs = {
    title: "How much would you like to transfer?",
    handleContinueBtnClick: handleContinue,
  };
  const handleArrowClick = () => {
    navigate("/transferOption");
  };

    return (
        <LoginSignup 
        head={<Header steps={sendMoneySteps ? sendMoneySteps:[]} arrow={true}close={true}/>} 
        children={
            <Grid container>
                <Grid item sm={4}></Grid>
                <Grid item sm={4}>
                    <StepAmount {...stepAmountArgs}/>
                </Grid>
                <Grid item sm={4}></Grid>
            </Grid>
    }
        />
    );
  };
