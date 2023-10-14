import { Box, Stack, Card, Theme, SxProps } from "@mui/material";
import styled from "@emotion/styled";

import RadioButton from "/src/components/atoms/RadioButton";
import { TypographyComponent } from "/src/components/atoms/Typography";
import theme from "/src/theme/theme";
export interface Addressprops {
  onChange?: () => void;
  onClick?: () => void;
  name?: string;
  sx?: SxProps<Theme>;
  value?: string;
  variant?: string;
  label?: string;
  address?: string;
  checked?: boolean;
  addressNo?: number;
}
const StyleBox = styled(Box)({
  minWidth: "516px",
  minHeight: "132px",
});
const StyleCard = styled(Card)({
  boxShadow: "none",
  backgroundColor: "transperent",
  border: "none",
  paddingBottom: 25,
  paddingTop: 25,
  paddingLeft: 25,
  paddingRight: 25,
  display: "flex",
  alignItems: "center",
  gap: "24px",
});
const labelstyle: React.CSSProperties = {
  color: theme.palette.textColor.medemp,
};
const addressstyle: React.CSSProperties = {
  color: theme.palette.textColor.highemp,
  wordWrap: "break-word",
};
const StyledRadioButton = styled(RadioButton)({
  paddingTop: "5%",
  "&.Mui-checked": {
    color: theme.palette.primaryColor[500],
  },
});
export const AddressCard = ({
  onChange,
  onClick,
  name,
  sx,
  value,
  variant,
  checked,
  label,
  address,
  addressNo,
}: Addressprops) => {
  return (
    <StyleBox data-testid="confirmPurchase">
      <StyleCard>
        <Stack direction="row" alignItems="center" spacing={3}>
          <StyledRadioButton
            onChange={onChange}
            onClick={onClick}
            name={name}
            value={value}
            variant={variant}
            checked={checked}
          ></StyledRadioButton>
          <Stack spacing={3}>
            <TypographyComponent style={labelstyle}>{label}</TypographyComponent>
            <TypographyComponent style={addressstyle}>{address}</TypographyComponent>
          </Stack>
        </Stack>
      </StyleCard>
    </StyleBox>
  );
};
