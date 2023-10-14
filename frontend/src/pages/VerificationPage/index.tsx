import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

import { LoginSignup } from "/src/components/templates/loginSignUP";
import { Header } from "/src/components/molecules/header";
import PocketPayPurpose from "/src/components/organisms/PocketPayPurpose";
import { OwnerDetails } from "/src/components/organisms/OwnerDetails";
import Image from "/src/components/atoms/Image";
import Back from "/public/assets/images/Muiicons/Back button.svg";
import { Store } from "/src/store/types";
import { activeStep } from "/src/store/actions";
const ImageDiv = styled(Box)({
  paddingTop: "40px",
  paddingLeft: "20vw",
  cursor: "pointer",
});
export const VerificationPage = () => {
  const [currentOrganism, setCurrentOrganism] = useState<number>(0);
  const [arrowValue, setArrowValue] = useState<number>(0);
  const navigate = useNavigate();
  const sendMoneySteps = useSelector((state:Store)=>state.steps);
  const dispatch = useDispatch();
  const [active,setActive] = useState(false);

  useEffect(()=>{
    if(!active){
      dispatch(activeStep(4));
      setActive(true);
    }
  });

  const handleArrowClick = () => {
    if (arrowValue === 0) {
      navigate("/recipientDetails");
    }
    if (arrowValue === 1) {
      setArrowValue(0);
      setCurrentOrganism(0);
    }
    if (arrowValue === 2) {
      setArrowValue(1);
      setCurrentOrganism(1);
    }
  };

  const handlePocketPayPurpose = () => {
    setCurrentOrganism(1);
    setArrowValue(1);
  };
  const handleDirector = () => {
    setCurrentOrganism(2);
    setArrowValue(2);
  };
  
  return (
    <Box>
      <LoginSignup
        head={
          <Header
            steps={ sendMoneySteps ? sendMoneySteps :[]}
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
          <Box>
            {currentOrganism === 0 && arrowValue === 0 && (
              <PocketPayPurpose onClick={handlePocketPayPurpose} />
            )}
            {currentOrganism === 1 && arrowValue === 1 && (
              <Box>
                <OwnerDetails
                  nameTitle="Director"
                  mainTitle="Confirm your business directors"
                  subTitle="Please confirm these details from companies house. If anyone’s missing, add them below."
                  buttonLabel="Add another director"
                  onClick={handleDirector}
                />
              </Box>
            )}
            <Box>
              {currentOrganism === 2 && arrowValue === 2 && (
                <OwnerDetails
                  nameTitle="Shareholder"
                  mainTitle="Confirm your business owners"
                  subTitle="Please confirm these details from companies house. If anyone else controls more than 25% of your business, add them below."
                  buttonLabel="Add another owner"
                  onClick={() => {
                    navigate("/stepReviewPage");
                  }}
                />
              )}
            </Box>
          </Box>
        }
      />
    </Box>
  );
};
