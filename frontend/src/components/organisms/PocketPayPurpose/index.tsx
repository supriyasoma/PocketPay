import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";

import { TypographyComponent } from "/src/components/atoms/Typography";
import { CustomButton } from "/src/components/atoms/Button";  
import { setTransaction } from "/src/store/actions";
import {
  POCKETPAY_PURPOSE_PLACEHOLDER,
  POCKETPAY_PURPOSE_SUBTITLE,
  POCKETPAY_PURPOSE_TITLE,
  PurposeDropDown,
} from "/src/utils/constants";
import theme from "/src/theme/theme";


interface PocketPayPurposeProps{
  onClick?: () => void;
}
export default function PocketPayPurpose({onClick}:PocketPayPurposeProps) {
  const [selecetdValue, setselecetedValue] = useState("");
  const dispatch = useDispatch();

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setselecetedValue(value);
    dispatch(setTransaction({purpose:value}));
  };
  const handleDisable = selecetdValue === "";
  const handleClick=()=>{
    if (onClick) {
      onClick();
    }
  }
  return (
    <div>
      <Wrapper>
        <TypographyComponent
          className="title"
          children={POCKETPAY_PURPOSE_TITLE}
        />
        <TypographyComponent
          className="content"
          children={POCKETPAY_PURPOSE_SUBTITLE}
        />
        <Box className="dropdown">
          <FormControlStyled>
            <InputLabel className="inputfield" id="demo-simple-select-label1">
              {POCKETPAY_PURPOSE_PLACEHOLDER}
            </InputLabel>
            <Select
              data-testId="select2"
              sx={{ width: "31.47vw", borderRadius: "8px" }}
              label={POCKETPAY_PURPOSE_PLACEHOLDER}
              labelId="demo-simple-select-label1"
              id="demo-simple-select"
              MenuProps={{
                PaperProps: {
                  sx: {
                    marginTop: "-66px",
                    border: theme.palette.greyColor.stroke,
                  },
                },
              }}
              onChange={handleCategoryChange}
            >
              <MenuItem value="" disabled>
                {POCKETPAY_PURPOSE_PLACEHOLDER}
              </MenuItem>
              {PurposeDropDown.map((item, idx) => (
                <MenuItem key={item.label} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControlStyled>
        </Box>
        <CustomButton
          className="button"
          label="Continue"
          variant="contained"
          disabled={handleDisable}
          onClick={handleClick}
        />
      </Wrapper>
    </div>
  );
}

const FormControlStyled = styled(FormControl)(`
.MuiInputLabel-root{
  font-size:${theme.typography.caption1};
  color:${theme.palette.textColor.lowemp}; 
}
& .Mui-focused.MuiInputLabel-root {
  color: ${theme.palette.textColor.lowemp};
  border-color: ${theme.palette.greyColor.stroke};
}
& .Mui-active.MuiInputLabel-root {
    color: ${theme.palette.textColor.lowemp};
    border-color: ${theme.palette.greyColor.stroke};
  }
  .MuiInputLabel-root {
    font-size: ${theme.typography.caption1};
    color: ${theme.palette.textColor.lowemp};
    border: none;
  }
  .MuiSelect-select{
    width:100% !important
   }
`);
const Wrapper = styled(Box)({
  paddingLeft: "31vw",
  width: "38vw",
  minWidth: "300px",
  maxWidth: "516px",
  "& .title": {
    marginBottom: "12px",
    ...theme.typography.heading1,
  },
  "& .content": {
    marginTop: "32px",
    marginBottom: "24px",
    ...theme.typography.body3,
    color: theme.palette.textColor.medemp,
  },
  ".dropdown": {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  ".inputfield": {
    borderColor: theme.palette.greyColor.stroke,
  },
  ".button": {
    marginLeft: "31.5vw",
    marginTop: "27vw",
    width: "9.88vw",
    height: "56px",
    borderRadius: "56px",
    backgroundColor: theme.palette.primaryColor[500],
    ":disabled": {
      backgroundColor: theme.palette.primaryColor[100],
      color: theme.palette.structuralColor.white,
      opacity: "56%",
    },
    "&:hover": {
      background: `${theme.palette.primaryColor[500]}`,
      color: `${theme.palette.structuralColor.white}`,
    },
  },
});
