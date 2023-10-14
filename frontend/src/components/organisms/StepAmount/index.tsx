import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import styled from "@emotion/styled";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Grid,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";

import theme from "/src/theme/theme";
import { TypographyComponent } from "/src/components/atoms/Typography";
import "./index.css";
import { TextFieldComponent } from "/src/components/atoms/TextField";
import { CustomButton } from "/src/components/atoms/Button";
import DropDown from "/src/components/molecules/DropDown";
import { Transaction } from "/src/models/transaction";
import { getCurrenciesAPI } from "/src/services";

interface StepAmountProps{
  handleContinueBtnClick?:(data:Transaction)=>void,
  title?:string
}

const titleStyle: React.CSSProperties = {
  color: `${theme.palette.textColor.highemp}`,
  fontSize: "24px",
  fontWeight: "400",
  lineHeight: "40px",
  marginBottom: "25px",
  ...theme.typography.body1,
};

const menuItems = [
  {
    label: "United Kingdom",
    value: "gbp",
    tail: "GBP",
    renderValue: "GBP",
    imgSrc: "ukImg",
  },
  {
    label: "Austria",
    value: "eur",
    tail: "EUR",
    renderValue: "EUR",
    imgSrc: "australia",
  },
  {
    label: "India",
    value: "inr",
    tail: "INR",
    renderValue: "INR",
    imgSrc: "india",
  },
];

const dropDownStyles: React.CSSProperties = {
  backgroundColor: "#ffff",
};
const textFieldStyle: React.CSSProperties = {
  width: "516px",
  height: "72px",
  marginTop:"10px"
};

const paymentDetailsStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "400",
  lineHeight: "24px",
  color: `${theme.palette.textColor.medemp}`,
  ...theme.typography.body3
};

const dividerStyle: React.CSSProperties = {
  width: "100%",
  height: "1px",
  paddingTop: "10px",
  textAlign: "center",
};

const btnStyle= {
  marginTop:"150px",
  marginLeft: "33.5vw",
  width: "135px",
  padding: "16px 43px",
  borderRadius: "56px",
  backgroundColor: `${theme.palette.primaryColor[500]}`,
  textTransform: "inherit",
  "&:hover": {
    background: `${theme.palette.primaryColor[500]}`,
    color: `${theme.palette.structuralColor.white}`,
  },
  ":disabled": {
    backgroundColor: theme.palette.primaryColor[100],
    color: theme.palette.structuralColor.white,
    opacity: "56%",
  },
};

const iconStyle: React.CSSProperties = {
  width: "24px",
  height: "24px",
  color: `${theme.palette.textColor.medemp}`,
};

const modalBtnStyle = {
  backgroundColor: `${theme.palette.primaryColor[500]}`,
  borderRadius: "56px",
  boxShadow: "0px 8px 24px 0px rgba(85, 51, 255, 0.24)",
  display: "flex",
  width: "135px",
  padding: "16px 30px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  "&:hover": {
    background: `${theme.palette.primaryColor[500]}`,
    color: `${theme.palette.structuralColor.white}`,
  },
};

const ModalText = styled(TypographyComponent)({
  ...theme.typography.body1,
});

export const StepAmount = (props: StepAmountProps) => {

  const { handleContinueBtnClick , title} = props;

  const [open, setOpen] = useState(false);

  const [info, setInfo] = useState<any>([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("gbp");
  const [to, setTo] = useState("eur");
  const [output, setOutput] = useState(0);
  const [disabled,setDisabled] = useState(true);

  useEffect(() => {
    getCurrenciesAPI(from).then((data?:any)=>{
      if(data){
        setInfo(data[from]);
      }
    });
  }, [from]);

  const convert = (val: number) => {
    setDisabled(val <= 0);
    setInput(val);
    let rate = info[to];
    setOutput(val * rate);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCurrencyFromChange = (e: SelectChangeEvent) => {
    setFrom(e.target.value);
    let rate = info[to];
    setOutput(input * rate);
  };
  const handleCurrencyToChange = (e: SelectChangeEvent) => {
    setTo(e.target.value);
    let rate = info[e.target.value];
    setOutput(input * rate);
  };

  const handleContinueClick = ()=>{
    let data:Transaction = {
      amount:input,
      convertedAmount:output,
      fromCurrency:from,
      toCurrency:to
    };
    if(handleContinueBtnClick){
      handleContinueBtnClick(data);
    }
  };
  return (
    <div className="send-money-step-amount" data-testid="step-amount">
      <TypographyComponent  style={titleStyle} className="step-amount-page-title">
        {title}
      </TypographyComponent>

      <TextFieldComponent
        label="You send"
        type="number"
        style={textFieldStyle}
        onChange={(e: SelectChangeEvent) => {
          convert(parseFloat(e.target.value));
        }}
        inputProps={{
          endAdornment: (
            <DropDown
              menuItems={menuItems}
              onChange={(e) => {
                handleCurrencyFromChange(e);
              }}
              variant="filled"
              IconComponent={ExpandMoreIcon}
              sx={dropDownStyles}
              defaultValue="gbp"
              menuProps={{ PaperProps: { sx: { width: "516px" } } }}
              placeholder="currency from"
            />
          ),
        }}
      />
      <TextFieldComponent
        label="Receipient gets"
        type="number"
        style={textFieldStyle}
        value={output.toFixed(2)}
        inputProps={{
          endAdornment: (
            <DropDown
            data-testid="currencyToDropdown"
              menuItems={menuItems}
              onChange={(e) => handleCurrencyToChange(e)}
              variant="filled"
              IconComponent={ExpandMoreIcon}
              sx={dropDownStyles}
              defaultValue="eur"
              placeholder="currency to"
            />
          ),
        }}
      />

      <div className="payment-details-section">
        <Grid container className="payment-details-section-grid-container">
          <Grid item sm={4} textAlign="left">
            <TypographyComponent  style={paymentDetailsStyle}>
              Low cost transfer fee:
            </TypographyComponent>
          </Grid>
          <Grid item sm={4} textAlign="center">
            <Divider sx={dividerStyle} />
          </Grid>
          <Grid item sm={4}>
            <div className="payment-details-section-right">
            <TypographyComponent  style={paymentDetailsStyle}>
              From 3.69GBP
            </TypographyComponent>
            <IconButton sx={{padding:0}}>
              <InfoOutlinedIcon style={iconStyle} />
            </IconButton>
            </div>
          </Grid>
        </Grid>
        <Grid container className="payment-details-section-grid-container">
          <Grid item sm={5} textAlign="left">
            <TypographyComponent  style={paymentDetailsStyle}>
              Guaranteed rate (24 hrs):
            </TypographyComponent>
          </Grid>
          <Grid item sm={4} textAlign="center">
            <Divider sx={dividerStyle} />
          </Grid>
          <Grid item sm={3}>
          <div className="payment-details-section-right">
            <TypographyComponent
              sx={{ color: `${theme.palette.primaryColor[500]}`,...theme.typography.body3 }}
            >
              1.20048
            </TypographyComponent>
            <IconButton onClick={handleClickOpen} data-testid="grow-rate-icon-btn" sx={{padding:0}}>
              <TrendingDownOutlinedIcon
                sx={{
                  color: `${theme.palette.primaryColor[500]}`,
                  width: "24px",
                  height: "24px",
                }}
              />
            </IconButton>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className="growth-rate-popup"
            >
              <DialogContent sx={{ height: "240px" }}  className="growth-rate-popup-content">
                <DialogContentText id="alert-dialog-description" className="growth-rate-popup-content-text">
                  <ModalText data-testid="modalText">
                    {" "}
                    We’ll apply this rate if we receive your money today.{" "}
                  </ModalText>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <CustomButton
                data-testid="modal-close-btn"
                  onClick={handleClose}
                  label="Ok"
                  style={modalBtnStyle}
                  variant="contained"
                ></CustomButton>
              </DialogActions>
            </Dialog>
            </div>
          </Grid>
        </Grid>
        <Grid container className="payment-details-section-grid-container">
          <Grid item sm={4} textAlign="left">
            <TypographyComponent  style={paymentDetailsStyle}>
              Total amount:
            </TypographyComponent>
          </Grid>
          <Grid item sm={4} textAlign="center">
            <Divider sx={dividerStyle} />
          </Grid>
          <Grid item sm={4}>
          <div className="payment-details-section-right">
            <TypographyComponent  style={paymentDetailsStyle}>
              996.31 GBP
            </TypographyComponent>
            <IconButton sx={{padding:0}}>
              <InfoOutlinedIcon style={iconStyle} />
            </IconButton>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className="btn-section">
        <CustomButton
         sx={btnStyle} 
         className="step-amount-continue-btn"
          label="Continue"
           onClick={handleContinueClick} 
           variant="contained"
           disabled={disabled}
           />
      </div>
    </div>
  );
};
