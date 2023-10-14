import { Card, CardContent, Grid, SxProps, Theme, styled } from "@mui/material";
import React, { ReactElement } from "react";

import RadioButton from "/src/components/atoms/RadioButton";
import theme from "/src/theme/theme";


interface PaymentTypeCardProps {
  cardStyle?: SxProps<Theme>;
  gridStyle?: SxProps<Theme>;
  content?: ReactElement;
  cardType?: string;
  className?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent) => void;
  value?: string;
  checked?: boolean;
  icon?: React.ReactElement;
}

const cardBlockStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "100%",
  backgroundColor: "#F8F9FA",
  paddingLeft: "20%",
  paddingTop: "20%",
};

const cardBlockContentStyle = {
  minWidth: "474px",
  minHeight: "103px",
};

const StyledRadioButton = styled(RadioButton)({
  paddingTop: "5%",
  "&.Mui-checked": {
    color: theme.palette.primaryColor[500],
  },
});
export const PaymentTypeAndAddressCard = (props: PaymentTypeCardProps) => {
  const {
    gridStyle,
    cardStyle,
    content,
    cardType,
    disabled,
    onChange,
    value,
    checked,
    icon,
  } = props;
  return (
    <Card sx={cardStyle} data-testid="paymentAddressCard">
      <CardContent>
        <Grid container sx={gridStyle}>
          <Grid
            item
            md={2}
            sx={{
              paddingTop: "3%",
              display: cardType == "payment" ? "block" : "none",
            }}
          >
            <div style={cardBlockStyle}>{icon}</div>
          </Grid>
          <Grid item md={8}>
            <div style={cardBlockContentStyle}>{content}</div>
          </Grid>
          <Grid item md={2} sx={{ paddingTop: "3%", paddingLeft: "3vw" }}>
            <StyledRadioButton
              disabled={disabled}
              onChange={onChange}
              name={cardType}
              value={value}
              checked={checked}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
