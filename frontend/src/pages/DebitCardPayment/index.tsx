import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

import { LoginSignup } from "/src/components/templates/loginSignUP";
import { Header } from "/src/components/molecules/header";
import { StepPay } from "/src/components/organisms/StepPay";
import { getLoggedInUser, getMyData, postMyData } from "/src/services";
import { PayWithYourCard } from "/src/components/organisms/PayWithYourCard";
import ConfirmPurchase, {
  TypographyComponentStyleHighEmp,
  TypographyComponentStyleMedEmp,
} from "/src/components/molecules/ConfirmPurchase";
import LLyodBank from "/public/assets/images/Bank/Lloyds bank.svg";
import VISA from "/public/assets/images/BrandIcons/visa.svg";
import { PaymentReviews } from "/src/components/molecules/PaymentReview";
import { TypographyComponent } from "/src/components/atoms/Typography";
import Image from "/src/components/atoms/Image";
import Back from "/public/assets/images/Muiicons/Back button.svg";
import theme from "/src/theme/theme";
import { Store } from "/src/store/types";
import { activeStep, setTransaction } from "/src/store/actions";
import { PAYMENT_TRACKER_DATA, STATUS_PENDING } from "/src/utils/constants";
import { User } from "/src/models/user";
const Wrapper = styled(Box)({
  ".transferType": {
    paddingLeft: "14.42vw",
    overflow: "auto",
    " ::-webkit-scrollbar": {
      display: "none",
    },
  },
  ".title": {
    ...theme.typography.heading1,
    color: theme.palette.textColor.highemp,
    paddingBottom: "19px",
  },
  ".lastPage": {
    display: "flex",
    flexDirection: "row",
    gap: "24px",
    paddingLeft: "14.42vw",
    height: "500px",
    overflow: "auto",
    " ::-webkit-scrollbar": {
      display: "none",
    },
  },
});
const ImageDiv = styled(Box)({
  paddingTop: "40px",
  paddingLeft: "10vw",
  cursor: "pointer",
});
export const DebitCardPaymentPage = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState("");
  const [lastScrren, setLastScreen] = useState(false);
  const [arrowValue, setArrowValue] = useState<number>(0);
  const navigate = useNavigate();
  const sendMoneySteps = useSelector((state:Store)=>state.steps);
  const transaction = useSelector((state:Store)=>state.transaction);
  const dispatch = useDispatch();
  const [active,setActive] = useState(false);
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
      }
    ));
  }, []);

  const handleClick = () => {
    setArrowValue(1);
    setClicked(true);
    if (paymentType === "BANK_TRANSFER") {
      navigate("/ChooseBank");
    }
  };

  const handlePaymentTypeChange = (event: any) => {
    setPaymentType(event.target?.defaultValue);
    dispatch(setTransaction({payWith:event.target.defaultValue}));
  };

  const handlecardClick = () => {
    setLastScreen(!lastScrren);
    setArrowValue(2);
  };

  const handleCompleteClick = () => {
    postMyData('transaction',{...transaction,senderId:user?.id}).then(res=>{
      navigate("/dashboard");
    });
   
  };
  const handleCancel = () => {
    navigate("/dashboard");
  };
  const handleArrowClick = () => {
    if (arrowValue === 0) {
      navigate("/stepReviewPage");
    }
    if (arrowValue === 1) {
      setArrowValue(0);
    }
    if (arrowValue === 2) {
      setArrowValue(1);
      setLastScreen(!lastScrren);
    }
  };
  console.log(arrowValue);
  return (
    <Wrapper>
      <LoginSignup
        head={
          <Header
            steps={sendMoneySteps ? sendMoneySteps:[]}
            close={true}
          />
        }
        image={
          <Box>
            <ImageDiv>
              <Image src={Back} alt="back button" onClick={handleArrowClick} />
            </ImageDiv>
          </Box>
        }
        children={
          (!lastScrren && arrowValue === 0) || arrowValue === 1 ? (
            clicked && paymentType === "DEBIT_CARD" && arrowValue === 1 ? (
              <Box className="transferType">
                {" "}
                <PayWithYourCard
                  transaction={transaction}
                  cvvvalue="4546"
                  expiredvalue="09/25"
                  onClickContinue={handlecardClick}
                  onClickCancel={handleCancel}
                />{" "}
              </Box>
            ) : transaction ? (
              <Box className="transferType">
                {" "}
                <StepPay
                  title="Choose your transfer type"
                  transaction={transaction}
                  handleContinueClick={handleClick}
                  handlePaymentTypeChange={handlePaymentTypeChange}
                  paymentType={paymentType}
                  handleCancelClick={handleCancel}
                />{" "}
              </Box>
            ) : null
          ) : (
            <Box className="lastPage">
              <Box sx={{ width: "474px" }}>
                <TypographyComponent className="title">
                  Pay with your card
                </TypographyComponent>
                <ConfirmPurchase
                  srcBank={LLyodBank}
                  srcCardType={VISA}
                  title="Confirm Your Purchase"
                  line1={[
                    [transaction?.fromCurrency+""+transaction?.amount, TypographyComponentStyleHighEmp],
                    [
                      " to PocketPay using visa card ending ",
                      TypographyComponentStyleMedEmp,
                    ],
                    ["9313", TypographyComponentStyleHighEmp],
                  ]}
                  lines={[
                    "Step 1: Open and confirm the push notification we sent to your mobile.",
                    "Step 2: Return to this screen and press the button below to finish your purchase.",
                  ]}
                  buttonLabel={"Complete"}
                  onClick={handleCompleteClick}
                />
              </Box>
              <Box>
                <PaymentReviews
                  transaction={transaction}
                  showButtons={false}
                />
              </Box>
            </Box>
          )
        }
      />
    </Wrapper>
  );
};
