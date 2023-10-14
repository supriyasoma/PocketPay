import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Card, Stack, SxProps } from "@mui/material";
import styled from "@emotion/styled";
import Link from "@mui/material/Link";

import { TypographyComponent } from "/src/components/atoms/Typography";
import { CustomButton } from "/src/components/atoms/Button";
import theme from "/src/theme/theme";
import { TextFieldComponent } from "/src/components/atoms/TextField";
import Image from "/src/components/atoms/Image";
import right from "/public/assets/images/Muiicons/arrow-right.svg";
import {
  ACCOUNT_NUMBER,
  ACCOUNT_TYPE,
  AMOUNT,
  AMOUNTS,
  AMOUNT_VALUE,
  ARRIVAL_VALUE,
  EMAIL,
  FEE,
  FEE_VALUE,
  FIRST_NAME,
  GUARANTEED_RATE,
  GUARANTEED_VALUE,
  LAST_NAME,
  NAME,
  RATE_VALUE,
  REPEATS,
  REPEATS_VALUE,
  SENDING,
  SENDING_VALUE,
  SHOULD_ARRIVE,
  STEP_REVIEW,
  StepReviewer,
} from "/src/utils/constants";
import { Transaction } from "/src/models/transaction";
import { Recipient } from "/src/models/recipient";
import { setTransaction } from "/src/store/actions";
import { getCurrenciesAPI } from "/src/services";
export interface Paymentprops {
  onClick?: () => void;
  values: string[];
  currency: string;
  convertedcurrency: string;
  transaction?:Transaction
}
export const PaymentReviews = ({
  values,
  onClick,
  transaction
}: Paymentprops) => {

  const [trnxAmout,setTrnxAmount] = useState(0);
  const [recipientDetails,setRecipientDetails] = useState<Recipient>(); 
  const dispatch = useDispatch(); 

  useEffect(() => {
    if(!recipientDetails){
      console.log(transaction);
      setRecipientDetails(transaction?.recipient);
    }
    if(trnxAmout == 0){
      setTrnxAmount(transaction?.amount ? transaction.amount:0);
    }
  });


  const transferDetails = [
    { label1: FEE, label2: FEE_VALUE },
    { label1: AMOUNT, label2: AMOUNT_VALUE },
    { label1: GUARANTEED_RATE, label2: RATE_VALUE },
  ];

  const scheduledetails = [
    { label1: SENDING, label2: SENDING_VALUE },
    { label1: SHOULD_ARRIVE, label2: ARRIVAL_VALUE },
    { label1: REPEATS, label2: REPEATS_VALUE },
  ];

  const [showRecipientForm, setShowRecipientForm] = useState(false);
  const [showTransferForm, setShowTransferForm] = useState(false);

  const [recipientFieldValidity] = useState<
    boolean[]
  >([true, true, true, true]);


  const [amountFieldValidity] = useState<boolean>(true);

  const [amountFieldError] = useState<string>("");


  const handleRecipientClick = () => {
    setShowRecipientForm(true);
  };

  const handleTransferClick = () => {
    setShowTransferForm(true);
  };

  const handleRecipientSave = () => {
    dispatch(setTransaction({recipient:{...transaction?.recipient,...recipientDetails}}));
    setShowRecipientForm(false);
  };

  const handleTransferSave = () => {
    getCurrenciesAPI(transaction?.fromCurrency).then((res?:any)=>{
      if(res.data){
        let rate = res?.data[transaction?.fromCurrency ?? ""][transaction?.toCurrency ?? ""];
        dispatch(setTransaction({amount:trnxAmout,convertedAmount:(rate*trnxAmout)}));
      }
    });
    setShowTransferForm(false);
  };

  const handleCancel = () => {
    setShowRecipientForm(false);
    setShowTransferForm(false);
  };

  const loadRecipientForm = ()=>{
    return (
      <Box data-testid="recipient-details-form">
              <Stack direction="column" spacing={7}>
              <TypographyComponent
                  children={StepReviewer.recipient}
                  style={Typosubheading}
                />
                <Stack direction="column" spacing={7}>
                      <TextFieldComponent
                        data-testid="recipient-email"
                        label={EMAIL}
                        value={recipientDetails?.email}
                        onChange={(event) => {setRecipientDetails({...recipientDetails,email:event.target.value})}}
                        style={TextfieldStyle}
                      />
                      <TextFieldComponent
                      data-testid="first-name"
                        label={FIRST_NAME}
                        value={recipientDetails?.firstName}
                        onChange={(event) => {setRecipientDetails({...recipientDetails,firstName:event.target.value})}}
                        style={TextfieldStyle}
                      />
                      <TextFieldComponent
                      data-testid="recipient-lastName"
                        label={LAST_NAME}
                        value={recipientDetails?.lastName}
                        onChange={(event) => {setRecipientDetails({...recipientDetails,lastName:event.target.value})}}
                        style={TextfieldStyle}
                      />
                      <TextFieldComponent
                      data-testid="recipient-account"
                        label={ACCOUNT_NUMBER}
                        value={recipientDetails?.accountNumber}
                        onChange={(event) => {setRecipientDetails({...recipientDetails,accountNumber:event.target.value})}}
                        style={TextfieldStyle}
                      />
                      <TextFieldComponent
                      data-testid="recipient-accountType"
                        label={ACCOUNT_TYPE}
                        value={recipientDetails?.accountType}
                        onChange={(event) => {setRecipientDetails({...recipientDetails,accountType:event.target.value})}}
                        style={TextfieldStyle}
                      />
                </Stack>
                <Stack direction="row" justifyContent="flex-end" spacing={4} ml={5}>
                  <CancelButton label="Cancel" onClick={handleCancel} />
                  <SaveButton
                    data-testid="save-recipient-btn"
                    label="Save"
                    onClick={handleRecipientSave}
                    disabled={!recipientFieldValidity.every((valid) => valid)}
                  />
                </Stack>
              </Stack>
            </Box>
    );
  }

  const loadTransferForm = ()=>{
    return (
      <Box>
      <Stack direction="column" spacing={7}>
      <TypographyComponent
          children={StepReviewer.transfer}
          style={Typosubheading}
        />
        <Stack direction="column" spacing={3}>
          <TextFieldComponent
            label={AMOUNTS}
            value={trnxAmout.toFixed(2)}
            onChange={(event)=>{setTrnxAmount(parseFloat(event.target.value))}}
            style={TextfieldStyle}
          />
          {amountFieldError && (
            <TypographyComponent
              sx={{ color: "red" }}
              children={amountFieldError}
            />
          )}
          {transferDetails.map((data) => (
            <Stack key={data.label1} spacing={3}>
              <TextFieldComponent
                key={data.label1}
                label={data.label1}
                value={data.label2}
                style={TextfieldStyle}
                inputProps={{
                  disabled: true,
                }}
              />
            </Stack>
          ))}
        </Stack>
        <Stack direction="row" justifyContent="flex-end" spacing={4} ml={4}>
          <CancelButton label="Cancel" onClick={handleCancel} />
          <SaveButton
            label="Save"
            data-testid="save-trnxn-btn"
            onClick={handleTransferSave}
            disabled={
              !recipientFieldValidity.every((valid) => valid) ||
              !amountFieldValidity
            }
          />
        </Stack>
      </Stack>
    </Box>
    );
  }

  const loadDefault = ()=>{
    return (
      <Stack spacing={4}>
      <Stack
        direction="row"
        justifyContent="space-between"
        width="100%"
        paddingBottom="2%"
      >
        <TypographyComponent
          children={StepReviewer.transfer}
          style={Typosubheading}
        />
        <EditLink onClick={handleTransferClick} data-testid="edit-amount-link">
          {StepReviewer.buttonone}
        </EditLink>
      </Stack>
      <Stack direction="row" spacing={2}>
        <TypographyComponent
          children={transaction?.convertedAmount +""+transaction?.toCurrency}
          style={Typocontent}
        />
        <Image src={right} width="24px" height="24px" />
        <TypographyComponent
          children={transaction?.amount +""+transaction?.fromCurrency}
          style={Typocontent}
        />
      </Stack>
        <Stack direction="row" justifyContent="space-between" >
          <TypographyComponent children={FEE} style={Typovalues} />
          <TypographyComponent children={FEE_VALUE} style={Typocontent} />
        </Stack>

        <Stack direction="row" justifyContent="space-between" >
          <TypographyComponent children={AMOUNT} style={Typovalues} />
          <TypographyComponent children={transaction?.amount +""+transaction?.fromCurrency} style={Typocontent} />
        </Stack>

        <Stack direction="row" justifyContent="space-between" >
          <TypographyComponent children={GUARANTEED_RATE} style={Typovalues} />
          <TypographyComponent children={GUARANTEED_VALUE} style={Typocontent} />
        </Stack>

      <StyledStack direction="row">
        <TypographyComponent
          children={StepReviewer.recipient}
          style={Typosubheading}
        />
        <EditLink onClick={handleRecipientClick} data-testid="recipient-link">
          {StepReviewer.buttontwo}
        </EditLink>
      </StyledStack>
        <Stack direction="row" justifyContent="space-between">
          <TypographyComponent children={NAME} style={Typovalues} />
          <TypographyComponent children={transaction?.recipient?.firstName +" "+transaction?.recipient?.lastName} style={Typocontent} />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <TypographyComponent children={EMAIL} style={Typovalues} />
          <TypographyComponent children={transaction?.recipient?.email} style={Typocontent} />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <TypographyComponent children={ACCOUNT_NUMBER} style={Typovalues} />
          <TypographyComponent children={transaction?.recipient?.accountNumber} style={Typocontent} />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <TypographyComponent children={ACCOUNT_TYPE} style={Typovalues} />
          <TypographyComponent children={transaction?.recipient?.accountType} style={Typocontent} />
        </Stack>

      <StyledStack direction="row">
        <TypographyComponent
          children={StepReviewer.scheduledetails}
          style={Typosubheading}
        />
        <EditLink>{StepReviewer.buttonone}</EditLink>
      </StyledStack>
      {scheduledetails.map((data) => (
        <Stack direction="row" justifyContent="space-between" key={data.label1}>
          <TypographyComponent children={data.label1} style={Typovalues} />
          <TypographyComponent children={data.label2} style={Typocontent} />
        </Stack>
      ))}
      <Stack alignItems="center" spacing={6}>
        <Stack alignItems="center">
          <TypographyComponent
            children={StepReviewer.typoone}
            style={Typosubheading}
          />
          <TypographyComponent
            children={StepReviewer.typotwo}
            style={Typosubheading}
          />
        </Stack>
        <ConfirmButton label={StepReviewer.confirm} onClick={onClick} />
      </Stack>
    </Stack>
    );
  }

  const renderForm = () => {
    if (showRecipientForm) {
      return loadRecipientForm();
    } else if (showTransferForm) {
      return loadTransferForm();
    } else {
      return loadDefault();
    }
  };  
  return (
    <StyleBox data-testid="confirmPurchase" className="outerbox">
      <TypographyComponent style={HeadingTypo} children={STEP_REVIEW} />
      <StyleCard>
        <Stack spacing={5}>
          {renderForm()}
        </Stack>
      </StyleCard>
    </StyleBox>
  );
};
const TextfieldStyle: SxProps = {
  width: "90%",
  marginTop: 4,
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      borderColor: theme.palette.primaryColor[500],
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primaryColor[500],
  },
  "& .MuiInputBase-input": {
    fontSize: "17px",
    lineHeight: "24px",
  },
};
const StyleBox = styled(Box)({
  paddingLeft: "31vw",
  width: "38vw",
  minWidth: "300px",
  maxWidth: "516px",
  minHeight: "650px",
  display: "inline-block",
});
const StyleCard = styled(Card)({
  boxShadow: "none",
  backgroundColor: "transperent",
  border: "none",
});
const ConfirmButton = styled(CustomButton)({
  background: `${theme.palette.primaryColor[500]}`,
  color: `${theme.palette.structuralColor.white}`,
  width: "218px",
  height: "56px",
  borderRadius: "56px",
  textTransform: "none",
  ":hover":{
    background: `${theme.palette.primaryColor[500]}`,
  }
});

const Typocontent: React.CSSProperties = {
  color: theme.palette.textColor.highemp,
  ...theme.typography.body2,
};
const Typovalues: React.CSSProperties = {
  color: theme.palette.textColor.medemp,
  ...theme.typography.body2,
};
const Typosubheading: React.CSSProperties = {
  color: theme.palette.textColor.lowemp,
  ...theme.typography.caption1,
};

const HeadingTypo: React.CSSProperties = {
  color: theme.palette.textColor.highemp,
  ...theme.typography.heading1,
  paddingTop: "1vw",
  paddingBottom: "2vw",
};
const SaveButton = styled(CustomButton)({
  background: `${theme.palette.primaryColor[500]}`,
  color: `${theme.palette.structuralColor.white}`,
  width: "135px",
  height: "58px",
  borderRadius: "58px",
  textTransform: "none",
  boxShadow: "0",
  ":hover":{
    background: `${theme.palette.primaryColor[500]}`,
  }
});
const CancelButton = styled(CustomButton)({
  color: `${theme.palette.primaryColor[500]}`,
  background: `${theme.palette.structuralColor.white}`,
  width: "135px",
  height: "58px",
  borderRadius: "58px",
  textTransform: "none",
  boxShadow: "0px 0px 1px 0px rgba(20, 20, 20, 0.12), 0px 0px 8px 0px rgba(20, 20, 20, 0.04), 0px 8px 8px 0px rgba(20, 20, 20, 0.04)"
});
const EditLink = styled(Link)({
  color: theme.palette.primaryColor[500],
  textDecorationColor: theme.palette.primaryColor[500],
  cursor:"pointer"
});
const StyledStack = styled(Stack)({
  justifyContent: "space-between",
  width: "100%",
  paddingBottom: "2%",
  paddingTop: "2%",
});
