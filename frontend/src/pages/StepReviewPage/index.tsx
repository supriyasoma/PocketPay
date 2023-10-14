import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import { LoginSignup } from "/src/components/templates/loginSignUP";
import { Header } from "/src/components/molecules/header";
import { PaymentReviews } from "/src/components/organisms/StepReview";
import { getMyData } from "/src/services";
import { Store } from "/src/store/types";
import { activeStep } from "/src/store/actions";
export interface Transaction {
  id: number;
  fromCurrency: string;
  toCurrenct: string;
  amount: number;
  convertedAmount: number;
  recipient: Recipient;
  purpose: string;
  payWith: string;
  sendingTo: string;
  status: string;
}
export interface Recipient {
  id: number;
  email: string;
  accountNumber: string;
  firstName: string;
  lastName: string;
  ifsc: string;
}
export const StepReviewPage = () => {
  const [dataArray, setDataArray] = useState<Transaction[]>([]);
  const navigate = useNavigate();
  const sendMoneySteps = useSelector((state:Store)=>state.steps);
  const dispatch = useDispatch();
  const [active,setActive] = useState(false);
  const transaction = useSelector((state:Store)=>state.transaction);


  useEffect(() => {
    if(!active){
      dispatch(activeStep(5));
      setActive(true);
    }
  });
  const data = [
    `${dataArray[0]?.amount}`,
    `${dataArray[0]?.convertedAmount}`,
    `${dataArray[0]?.recipient.firstName}  ${dataArray[0]?.recipient.lastName}`,
    `${dataArray[0]?.recipient.email}`,
    `${dataArray[0]?.recipient.accountNumber}`,
    `${dataArray[0]?.status}`,
    `${dataArray[0]?.id}`,
  ];
  const handleClick = () => {
    navigate("/debitCardPayment");
  };
  const handleArrowClick = () => {
    navigate("/verificationPage");
  };
  return (
    <Box>
      <LoginSignup
        head={
          <Header
            close={true}
            arrow={true}
            onClick={handleArrowClick}
            steps={sendMoneySteps ? sendMoneySteps:[]}
          />
        }
        children={
          <PaymentReviews
            values={data}
            currency="GBP"
            convertedcurrency="EUP"
            onClick={handleClick}
            transaction={transaction}
          />
        }
      />
    </Box>
  );
};
