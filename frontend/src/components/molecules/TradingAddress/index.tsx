import { Box, Card, Stack, SxProps, Theme } from "@mui/material";
import styled from "@emotion/styled";

import { TextFieldComponent } from "/src/components/atoms/TextField";
import { TypographyComponent } from "/src/components/atoms/Typography";
import { CustomButton } from "/src/components/atoms/Button";
import theme from "/src/theme/theme";

export interface TradingAddressprops {
  onClick?: () => void;
  showinputfield?: boolean;
  buttonlabel: string;
  inputlabel: string;
  typovariant?: string;
  headingofcard: string;
  onChange?: () => void;
  sxButtonProps?: SxProps<Theme>;
  sxTypoProps?: SxProps<Theme>;
}
const TextfieldStyle: SxProps<Theme> = {
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
export const TradingAddress = ({
  onClick,
  onChange,
  typovariant,
  buttonlabel,
  showinputfield,
  headingofcard,
  inputlabel,
  sxButtonProps,
  sxTypoProps,
}: TradingAddressprops) => {
  const inputprops = {
    multiline: true,
    maxrows: 4,
  };
  return (
    <StyleBox test-id="tradingaddress">
      <StyleCard>
        <TypographyComponent
          variant={typovariant}
          children={headingofcard}
          sx={sxTypoProps}
        />
        <Stack direction="column" alignItems="center" spacing={13}>
          {showinputfield && (
            <TextFieldComponent
              variant="outlined"
              label={inputlabel}
              inputProps={inputprops}
              style={TextfieldStyle}
              onChange={onChange}
            />
          )}
          <CustomButton
            label={buttonlabel}
            variant="outlined"
            onClick={onClick}
            sx={sxButtonProps}
          />
        </Stack>
      </StyleCard>
    </StyleBox>
  );
};

const StyleCard = styled(Card)({
  paddingBottom: 25,
  boxShadow: "0",
  border: `1px solid ${theme.palette.greyColor.stroke}`,
  paddingTop: 25,
  paddingLeft: 25,
  paddingRight: 25,
  display: "flex",
  flexDirection: "column",
  borderRadius: "16px",
});
const StyleBox = styled(Box)({
  minWidth: "564px",
  minHeight: "306px",
  display: "inline-block",
});
