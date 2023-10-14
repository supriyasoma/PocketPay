
import { Stack, Box, Card ,SxProps,Theme} from "@mui/material";
import styled from "@emotion/styled";
import InputAdornment from "@mui/material/InputAdornment";

import { TypographyComponent } from "/src/components/atoms/Typography";
import RadioButton from "/src/components/atoms/RadioButton";
import { TextFieldComponent } from "/src/components/atoms/TextField";
import theme from "/src/theme/theme";
import Image from "/src/components/atoms/Image";
import CardIcon from "/public/assets/images/Muiicons/credit-card.svg";
import {CVVcardconst} from "/src/utils/constants"
export interface CvvProps {
  label?: string;
  required?: boolean;
  onChangecheck?:(event: React.ChangeEvent<HTMLInputElement>)=>void,
  error?: boolean;
  errorMessage?: string;
  type?: string;
  onBlur?: () => void;
  id?: string;
  onChange?: () => void;
  onClick?: () => void;
  name?: string;
  sx?: SxProps<Theme>;
  value?: string;
  variant?: string;
  checked?: boolean;
  cardname?: string;
  cvvvalue?: string;
  expiryvalue?: string;
  lastdigit?: string;
  expirydate?: string;
}

const Typothree: React.CSSProperties = {
  color: theme.palette.textColor.highemp,
  paddingBottom: "3%",
};
const StyleBox = styled(Box)({
  minWidth: "474px",
  minHeight: "136px",
  display: "inline-block",
});
const StyleCard = styled(Card)({
  boxShadow: "none",
  backgroundColor: "transperent",
  border: "none",
  borpaddingTop: 15,
  paddingRight: 25,
});
const StyledRadioButton = styled(RadioButton)({
  "&.Mui-checked": {
    color: theme.palette.primaryColor[500],
  },
});
const CustomTextField = styled(TextFieldComponent)({
  "&:placeholder": {
    color: theme.palette.textColor.lowemp,
    fontFamily: "Gerbera",
    fontSize: "17px",
    lineHeight: "24px",
    letterSpacing: "0em",
    textAlign: "left",
  },
});
const Typoone: React.CSSProperties = {
  color: theme.palette.textColor.highemp,
  ...theme.typography.body2,
  paddingTop: "2%",
};

const Typotwo: React.CSSProperties = {
  color: theme.palette.textColor.medemp,
  ...theme.typography.body2,
  paddingBottom: "3%",
};
const TextfieldStyle: React.CSSProperties = {
  width: "20vw",
  height:'60px'
};
export const CvvCard = ({
  onChange,
  onClick,
  name,
  value,
  variant,
  checked,
  cardname,
  cvvvalue,
  expiryvalue,
  lastdigit,
  expirydate,
  label,
  required,
  onChangecheck,
  error,
  errorMessage,
  type,
  onBlur,
  id,
}: CvvProps) => {
  const typographyValues = [
    { style: Typotwo, children: lastdigit },
    { style: Typothree, children: cvvvalue },
    { style: Typotwo, children: expirydate },
    { style: Typothree, children: expiryvalue },
  ];
  return (
    <StyleBox data-testid="cvvcard">
      <StyleCard>
        <Stack direction="row" alignItems="flex-start" width="100%" spacing={5}>
          <StyledRadioButton
            data-testid="cvvcheckbox"
            onChange={onChange}
            onClick={onClick}
            name={name}
            value={value}
            variant={variant}
            checked={checked}
          />
          <Stack width="100%" spacing={1}>
            <TypographyComponent
              style={Typoone}
              children={cardname}
            />
            <Stack direction="row" width="100%" spacing={1.5}>
              {typographyValues.map((item, index) => (
                <TypographyComponent
                  key={item.children}
                  style={item.style}
                  children={item.children}
                />
              ))}
            </Stack>
            <CustomTextField
              placeholder={CVVcardconst.placeholdername}
              variant="outlined"
              size="small"
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Image src={CardIcon} alt="image" />
                  </InputAdornment>
                ),
              }}
              style={TextfieldStyle}
              label={label}
              required={required}
              onChange={onChangecheck}
              error={error}
              errorMessage={errorMessage}
              type={type}
              onBlur={onBlur}
              id={id}
            />
          </Stack>
        </Stack>
      </StyleCard>
    </StyleBox>
  );
};
