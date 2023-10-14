import {
  Box,
  Link,
  Modal,
  RadioGroup,
  Stack,
  SxProps,
  Theme,
  styled,
} from "@mui/material";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

import { TypographyComponent } from "/src/components/atoms/Typography";
import theme from "/src/theme/theme";
import { AddressCard } from "/src/components/molecules/Address";
import { TextFieldComponent } from "/src/components/atoms/TextField";
import { CONFIRM_TRADING } from "/src/utils/constants";
import { CustomButton } from "/src/components/atoms/Button";
import { setUserDetails } from "/src/store/actions";
import { Business } from "/src/models/business";
interface ConfirmBusinessProps {
  handleClick?: () => void;
  business?:Business
}
export const ConfirmTradingAddress = ({
  handleClick,
  business
}: ConfirmBusinessProps) => {
  const [displayEdit, setDisplayEdit] = useState<boolean>(false);

  const [addressValues, setAddressValues] = useState<string[]>(
    CONFIRM_TRADING.addresses
  );

  const [activeAddress, setActiveAddress] = useState<number>(-1);

  const [displayModal, setDisplayModal] = useState<boolean>(false);

  const [addAddress, setAddAddress] = useState<string>("");

  const [allAddress, setAllAddress] = useState<string[]>(
    CONFIRM_TRADING.addresses
  );

  const [refresh, setRefresh] = useState<boolean>(false);
  
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [addAddressError, setAddAddressError] = useState<string>('');
  const dispatch = useDispatch();

  const handleSetActiveAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveAddress(parseInt(e.target.value));
    dispatch(setUserDetails({business:{...business,primaryTradingAddress:{address:e.target.value}}}));
  };

  const handleSetAddressValues = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number
  ) => {
    setAddressValues((prev) => {
      const updatedAddressValues = [...prev];
      updatedAddressValues[idx] = e.target.value;
      
      return updatedAddressValues;
    });
    
  };

  const toggleEdit = () => {
    if (activeAddress !== -1) setDisplayEdit((prev) => !prev);
  };

  const handleDisplayModal = () => {
    setDisplayModal((prev) => !prev);
  };

  const handleSetAddAddress = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    const { value } = e.target;
    setAddAddress(value);
    setAddAddressError(value.trim() === '' ? 'Field is required' : '');
  };

  const handleSetAllAddress = () => {
    setAllAddress([...addressValues]);
  };

  const handleSave = () => {
    const errors = addressValues.map((value) => (value.trim() === '' ? 'Field is required' : ''));
  setValidationErrors(errors);

  if (errors.every((error) => error === '')) {
    setAllAddress(addressValues);
    setRefresh(!refresh);
    toggleEdit();
  }
  };

  const handleCancel = (idx: number) => {
    setAddressValues((prev) => {
      const updatedAddressValues = [...prev];
      updatedAddressValues[idx] = allAddress[idx];
      return updatedAddressValues;
    });
    toggleEdit();
  };

  useEffect(() => {
    handleSetAllAddress();
  }, [refresh]);

  const inputprops = {
    multiline: true,
    maxRows: 3,
  };

  const handleAdd = () => {
    setAddressValues((prev) => {
      const updatedAddressValues = [...prev];
      updatedAddressValues.push(addAddress);
      return updatedAddressValues;
    });
    setRefresh(!refresh);
    setAddAddress("");
    handleDisplayModal();
  };

  return (
    <Wrapper>
      <TypographyComponent className="title" style={headingstyle}>
        {CONFIRM_TRADING.title}
      </TypographyComponent>
      <Stack>
        <TypographyComponent style={subtitlestyle}>
          {CONFIRM_TRADING.subtitle + CONFIRM_TRADING.subtitle2}
        </TypographyComponent>
      </Stack>
      <Box className="content">
        <Box className="content-title">
          <TypographyComponent style={content}>
            {CONFIRM_TRADING.tradingAddress}
          </TypographyComponent>
          {!displayEdit && (
            <EditLink onClick={toggleEdit}>{CONFIRM_TRADING.edit}</EditLink>
          )}
        </Box>
        <Box className="content-address">
          <RadioGroup onChange={handleSetActiveAddress}>
            {addressValues?.map((item, index) => (
              <Box key={item} className="typo-inp-container">
                {displayEdit && index === activeAddress ? (
                  <div>
                  <TextFieldComponent
                    label={`Trading address ${index + 1}`}
                    value={addressValues[index]}
                    inputProps={inputprops}
                    onChange={(e) => handleSetAddressValues(e, index)}
                    data-testid="input-field"
                  />
                  {validationErrors[index] && (
                    <TypographyComponent sx={{ color: 'red' }} children={validationErrors[index]} />
                  )}
                  </div>
                ) : (
                  <AddressCard
                    value={index.toString()}
                    address={item}
                    addressNo={index + 1}
                  />
                )}
              </Box>
            ))}
          </RadioGroup>
        </Box>
        <Box className="buttons">
          {displayEdit && activeAddress !== -1 ? (
            <>
              <CancelButton
                variant="contained"
                className="down-btn"
                onClick={() => handleCancel(activeAddress)}
                label={CONFIRM_TRADING.cancel}
              />
              <SaveButton
                variant="text"
                className="up-btn"
                onClick={handleSave}
                label={CONFIRM_TRADING.save}
              />
            </>
          ) : (
            <>
              <TradingButton
                variant="text"
                onClick={handleDisplayModal}
                className="up-btn"
                label={CONFIRM_TRADING.buttonsContent[0]}
              />

              <ConfirmButton
                variant="contained"
                className={
                  activeAddress === -1 ? "disable confirm-btn" : "confirm-btn"
                }
                data-testid="confirm"
                onClick={handleClick}
                label={CONFIRM_TRADING.buttonsContent[1]}
              />
            </>
          )}
        </Box>
      </Box>
      <Modal open={displayModal} disableAutoFocus onClose={handleDisplayModal}>
        <ModalBox>
          <StyleBox test-id="tradingaddress">
            <TypographyComponent children={CONFIRM_TRADING.modal.title} />
            <TextFieldComponent
              variant="outlined"
              label={CONFIRM_TRADING.modal.label}
              inputProps={inputprops}
              style={TextfieldStyle}
              onChange={handleSetAddAddress}
            />
            {addAddressError && (
              <TypographyComponent sx={{ color: 'red' }} children={addAddressError} />
            )}
            <StyleCardBox>
              <CustomButton
                label={CONFIRM_TRADING.modal.btn}
                variant="outlined"
                sx={ButtonStyle}
                onClick={handleAdd}
               disabled={addAddressError !== '' || addAddress.trim() === ''}
              />
            </StyleCardBox>
          </StyleBox>
        </ModalBox>
      </Modal>
    </Wrapper>
  );
};
const ConfirmButton = styled(CustomButton)({
  color: theme.palette.structuralColor.white,
  background: theme.palette.primaryColor[500],
  textTransform: "none",
  "&:hover": {
    background: `${theme.palette.primaryColor[500]}`,
    color: `${theme.palette.structuralColor.white}`,
  },
});
const TradingButton = styled(CustomButton)({
  color: theme.palette.primaryColor[500],
  textTransform: "none",
  boxShadow: "0",
});
const SaveButton = styled(CustomButton)({
  color: theme.palette.structuralColor.white,
  background: theme.palette.primaryColor[500],
  textTransform: "none",
  "&:hover": {
    background: `${theme.palette.primaryColor[500]}`,
    color: `${theme.palette.structuralColor.white}`,
  },
});
const CancelButton = styled(CustomButton)({
  backgroundColor: theme.palette.structuralColor.white,
  color: theme.palette.primaryColor[500],
  "&:hover": {
    background: `${theme.palette.structuralColor.white}`,
    color: `${theme.palette.primaryColor[500]}`,
  },
});
const TextfieldStyle: SxProps = {
  width: "99%",
  marginTop: 4,
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      borderColor: theme.palette.greyColor.stroke,
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.greyColor.stroke,
  },
  "& .MuiInputBase-input": {
    fontSize: "17px",
    lineHeight: "24px",
  },
};

const EditLink = styled(Link)({
  color: theme.palette.primaryColor[500],
  textDecorationColor: theme.palette.primaryColor[500],
});

const StyleCardBox = styled(Box)({
  paddingTop: 50,
});
const StyleBox = styled(Box)({
  minWidth: "564px",
  minHeight: "306px",
  display: "inline-block",
});
const ModalBox = styled(Box)(`
width:564px;
box-shadow:none;
height:306px;
position:absolute;
transform:translate(-50%, -50%);
top:50%;
left:50%;
background:white;
padding:24px;
border-radius:16px;
.MuiTextField-root{
    margin-top:32px;
    
}
.MuiButton-root{
    width:135px;
    height:56px;
    border-radius:56px;
}
.btn{
    text-align:center;
}

`);
const headingstyle: React.CSSProperties = {
  color: theme.palette.textColor.highemp,
  ...theme.typography.heading1,
};

const subtitlestyle: React.CSSProperties = {
  color: theme.palette.textColor.medemp,
  ...theme.typography.body3,
};

const content: React.CSSProperties = {
  color: theme.palette.textColor.medemp,
  ...theme.typography.body2,
};

const ButtonStyle: SxProps<Theme> = {
  background: `${theme.palette.primaryColor[500]}`,
  color: `${theme.palette.structuralColor.white}`,
  width: "135px",
  height: "56px",
  borderRadius: "56px",
  textTransform: "none",
  marginLeft: "35%",
  marginTop:"5%",
  "&:hover": {
    background: `${theme.palette.primaryColor[500]}`,
    color: `${theme.palette.structuralColor.white}`,
  },
  "&:disabled": {
    backgroundColor: theme.palette.primaryColor[100],
    color: theme.palette.structuralColor.white,
    opacity: "56%",
  },
};

const Wrapper = styled(Box)(`
    width:38vw;
    min-width:300px;
    max-width:516px;
    & .title{
        margin-bottom:12px;
    }
    & .content{
        margin-top:32px;
    }
    & .content-title{
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-bottom:12px;
            & .link{
                cursor:pointer;
                text-decoration:underline;  
            }
        }
    & .MuiFormControlLabel-root{
        margin:0;
        margin-left:12px;
        height:132px;
    }
    & .buttons{
        margin-top:40px;
        & .MuiButtonBase-root{
            width:218px;
            height:56px;
            display:block;
            margin:0 auto;
            margin-bottom:20px;
            border-radius:56px;
        }
        & .up-btn{
            box-shadow: 0px 8px 24px rgba(85, 51, 255, 0.24);
        }
        & .down-btn{
            box-shadow: 0px 8px 8px rgba(20, 20, 20, 0.04), 0px 0px 8px rgba(20, 20, 20, 0.04), 0px 0px 1px rgba(20, 20, 20, 0.12);
        }
    }
    .MuiTextField-root{
        margin:0 auto;
        margin-top:24px;
        width:500px;
    }
    & .typo-inp-container{
      margin-bottom:16px;
    }
    & .disable{
      pointer-events:none;
      opacity:0.3;
    }
`);
