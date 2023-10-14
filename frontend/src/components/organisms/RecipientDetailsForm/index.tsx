import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import styled from "@emotion/styled";

import { TypographyComponent } from "/src/components/atoms/Typography";
import { TextFieldComponent } from "/src/components/atoms/TextField";
import { CheckBoxComponent } from "/src/components/atoms/Checkbox";
import { CustomButton } from "/src/components/atoms/Button";
import theme from "/src/theme/theme";
import { Recipient } from "/src/models/recipient";
import { setTransaction } from "/src/store/actions";
import { ACCOUNT_TYPE_CHECKING, ACCOUNT_TYPE_SAVING } from "/src/utils/constants";
import { useDispatch } from "react-redux";

export interface RecipientDetailsFormProps {}
const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  marginLeft: "31.11vw",
  marginTop: "29px",
  ".typo1": {
    ...theme.typography.heading1,
    color: theme.palette.textColor.highemp,
    paddingBottom: "30px",
  },
  ".checkDiv": {
    display: "flex",
    gap: "5px",
    paddingBottom: "40px",
  },
  ".typo2": {
    ...theme.typography.body3,
    color: theme.palette.textColor.highemp,
    paddingBottom: "12px",
  },
  ".fieldDiv": {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  ".button": {
    width: "9.88vw",
    height: "56px",
    borderRadius: "56px",
    marginLeft: "32vw",
    backgroundColor: theme.palette.primaryColor[500],
    ":disabled": {
      backgroundColor: theme.palette.primaryColor[100],
      color: theme.palette.structuralColor.white,
      opacity: "56%",
    },
    ":hover": {
      backgroundColor: theme.palette.primaryColor[500],
    },
  },
});

const FormControlStyled = styled(FormControl)(`
.MuiInputLabel-root{
  font-size:${theme.typography.caption1};
  color:${theme.palette.textColor.lowemp}; 
}
& .Mui-focused.MuiInputLabel-root {
  color: ${theme.palette.textColor.lowemp};
}
`);

export const RecipientDetailsForm = () => {
  const [email, setEmail] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountType, setAccountType] = useState("");
  const [ifscCodeError, setIfscCodeError] = useState<string | undefined>("");
  const [emailError, setEmailError] = useState("");
  const [accountNoError, setAccountNoError] = useState<string | undefined>("");
  const navigate = useNavigate();
  const [recipient , setRecipient] = useState<Recipient>();
  const dispatch = useDispatch();


  const validateEmail = (email: string) => {
    if (email.trim() === "") {
      return "Email is required";
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Invalid email address";
    }
    return "";
  };

  const validateAccountNo = (accountNo: string) => {
    if (accountNo.trim() === "") {
      return "AccountNumber required";
    }
    if (!/^\d+$/.test(accountNo)) {
      return "AccountNumber must contain only numbers";
    }
    if (accountNo.length < 10) {
      return "AccountNumber must be 10 digits";
    }
  };

  const validateIfscCode = (ifscCode: string) => {
    if (ifscCode.trim() === "") {
      return "IFSC code is required";
    }
    if (ifscCode.length < 3) {
      return "IFSC code must be above 3 characters";
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setRecipient({...recipient,email:value});
    setEmailError(validateEmail(value));
  };

  const handleAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAccountNo(value);
    setRecipient({...recipient,accountNumber:value});
    setAccountNoError(validateAccountNo(value));
  };

  const handleIfscCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setIfscCode(value);
    setRecipient({...recipient,ifsc:value});
    setIfscCodeError(validateIfscCode(value));
  };

  const handleFirstChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFirstName(value);
    setRecipient({...recipient,firstName:value});
    
  };

  const handleLastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLastName(value);
    setRecipient({...recipient,lastName:value});
  };

  const handleClick = () => {
    dispatch(setTransaction({recipient:recipient}));
    navigate("/verificationPage");
  };

  const handleChangeType = (
    event: SelectChangeEvent<string>,
    child: ReactNode
  ) => {
    const { value } = event.target;
    setAccountType(value);
    setRecipient({...recipient,accountType:value});
  };

  const handleDisable = () => {
    return !(
      recipient?.email !== "" &&
      recipient?.accountNumber !== "" &&
      recipient?.firstName !== "" &&
      recipient?.lastName !== "" &&
      recipient?.ifsc !== "" &&
      recipient?.accountType !== "" &&
      ifscCodeError === undefined &&
      emailError === "" &&
      accountNoError === undefined
    );
  };

  return (
    <Wrapper>
      <TypographyComponent className="typo1">
        Send to someone
      </TypographyComponent>
      <TextFieldComponent
        id="email"
        style={{ width: "31.47vw", height: "7.81vh" }}
        type="email"
        placeholder="Email"
        onChange={handleEmailChange}
        value={email}
      />
      {emailError && (
        <TypographyComponent sx={{ color: "red" }}>
          {emailError}
        </TypographyComponent>
      )}

      <Box className="checkDiv">
        <CheckBoxComponent />
        <TypographyComponent
          sx={{
            ...theme.typography.body3,
            color: theme.palette.textColor.medemp,
            paddingTop: "9px",
          }}
        >
          I know their bank details
        </TypographyComponent>
      </Box>

      <TypographyComponent className="typo2">
        Recipient details
      </TypographyComponent>

      <Box className="fieldDiv">
        <TextFieldComponent
          style={{ width: "31.47vw", height: "7.81vh" }}
          type="text"
          label="Account number"
          placeholder="Account number"
          onChange={handleAccountChange}
          value={accountNo}
        />
        {accountNoError && (
          <TypographyComponent sx={{ color: "red" }}>
            {accountNoError}
          </TypographyComponent>
        )}

        <TextFieldComponent
          style={{ width: "31.47vw", height: "7.81vh" }}
          type="text"
          label="First name"
          placeholder="First name"
          onChange={handleFirstChange}
          value={firstName}
        />

        <TextFieldComponent
          style={{ width: "31.47vw", height: "7.81vh" }}
          type="text"
          label="Last name"
          placeholder="Last name"
          onChange={handleLastChange}
          value={lastName}
        />
        <Box>
          <TextFieldComponent
            style={{ width: "31.47vw", height: "7.81vh" }}
            type="text"
            label="IFSC code"
            placeholder="IFSC code"
            onChange={handleIfscCodeChange}
            value={ifscCode}
          />
          {ifscCodeError && (
            <TypographyComponent sx={{ color: "red" }}>
              {ifscCodeError}
            </TypographyComponent>
          )}
        </Box>
        <Box>
          <FormControlStyled>
            <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
            <Select
              data-testid="select"
              sx={{ width: "31.47vw", borderRadius: "8px" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={accountType}
              label="Account Type"
              MenuProps={{
                PaperProps: {
                  sx: {
                    marginTop: "-30px",
                  },
                },
              }}
              onChange={handleChangeType}
            >
              <MenuItem value="" disabled>
                Select Account Type
              </MenuItem>
              <MenuItem value="Checking">{ACCOUNT_TYPE_CHECKING}</MenuItem>
              <MenuItem value="Savings">{ACCOUNT_TYPE_SAVING}</MenuItem>
            </Select>
          </FormControlStyled>
        </Box>
        <CustomButton
          className="button"
          label={"Continue"}
          variant="contained"
          onClick={handleClick}
          disabled={handleDisable()}
        />
      </Box>
    </Wrapper>
  );
};
