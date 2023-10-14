import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

import { LoginSignup } from "/src/components/templates/loginSignUP";
import { Header } from "/src/components/molecules/header";
import { StepRecipient } from "/src/components/organisms/StepRecipient";
import { RecipientDetailsForm } from "/src/components/organisms/RecipientDetailsForm";
import { postMyData } from "/src/services";
import Image from "/src/components/atoms/Image";
import Back from "/public/assets/images/Muiicons/Back button.svg";
import { Store } from "/src/store/types";
import { activeStep, setTransaction } from "/src/store/actions";
const StepRecipientDiv = styled(Box)({
  paddingLeft: "31.11vw",
  paddingTop: "29px",
});
const ImageDiv = styled(Box)({
  paddingTop: "40px",
  paddingLeft: "20vw",
  cursor: "pointer",
});
export const RecipientDetails = () => {
  const [showField, setShowField] = useState<boolean>(false);

  const [sendingTo, setSendingTo] = useState<string>("");
  const [back, setBack] = useState<number>(0);
  const sendMoneySteps = useSelector((state:Store)=>state.steps);
  const dispatch = useDispatch();
  const [active,setActive] = useState(false);

  const navigate = useNavigate();

  const handleMyBusiness = () => {
    setShowField(!showField);
    setSendingTo("My business");
    dispatch(setTransaction({sendingTo:"BUSINESS"}));
    setBack(1);
  };

  const handleBusinessOrCharity = () => {
    setShowField(!showField);
    setSendingTo("Business or Charity");
    dispatch(setTransaction({sendingTo:"BUSINESS_OR_CHARITY"}));

    setBack(1);
  };

  const handleSomeoneElse = () => {
    setShowField(!showField);
    setSendingTo("Someone else");
    dispatch(setTransaction({sendingTo:"OTHERS"}));
    setBack(1);
  };

  useEffect(() => {
    if(!active){
      dispatch(activeStep(3));
      setActive(true);
    }
  }, [sendingTo]);

  const handleArrowClick = () => {
    if (back === 0) {
      navigate("/amountPage");
    } else {
      setBack(0);
      setShowField(!showField);
    }
  };

  return (
    <Box>
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
          !showField ? (
            <StepRecipientDiv>
              <StepRecipient
                title="Who are you sending money to?"
                handleMyBusinessClick={handleMyBusiness}
                handleBusinessOrCharityClick={handleBusinessOrCharity}
                handleSomeoneElseClick={handleSomeoneElse}
              />
            </StepRecipientDiv>
          ) : (
            <RecipientDetailsForm />
          )
        }
      />
    </Box>
  );
};
