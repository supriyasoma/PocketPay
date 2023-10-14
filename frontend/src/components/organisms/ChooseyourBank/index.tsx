import * as React from "react";
import { Box, Stack, SxProps, styled } from "@mui/material";

import { TextFieldComponent } from "/src/components/atoms/TextField";
import { CustomButton } from "/src/components/atoms/Button";
import theme from "/src/theme/theme";
import { Popper } from "/src/components/molecules/ConfirmModel";
import { Bank } from "/src/models/bank";
import { TypographyComponent } from "/src/components/atoms/Typography";
import './index.css';
import BankCard from "/src/components/molecules/BankCard";
import { logos } from "/src/utils/constants";


export interface ChoosebankProps {
  oncancel?: () => void;
  bankData: Bank[];
  handleBankCardClick: (bank:Bank) => void;
  title?:string
}

const CancelButton = styled(CustomButton)({
  color: `${theme.palette.primaryColor[500]}`,
  background: `${theme.palette.structuralColor.white}`,
  width: "218px",
  height: "56px",
  borderRadius: "56px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  textTransform: "none",
});

const StyleInputField: SxProps = {
  width: "100%",
  marginBottom: "5%",
  fontSize: "17px",
  fontFamily: "Gerbera",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "24px",
};
const styles = {
  outerbox: {
    display: 'inline-block',
    minWidth: '518px',
    minHeight: '598px',
  },
  innerstack: {
    alignItems: 'center',
  },
};
export const ChooseyourBank = ({
  bankData,
  oncancel,
  handleBankCardClick,
  title
}: ChoosebankProps) => {
  const [pop, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className="choose-your-bank-outerbox" style={styles.outerbox} data-testid="choose-your-bank-block">
      <div className="choose-you-bank-title">
        <TypographyComponent variant="heading1" sx={{color:theme.palette.textColor.highemp}}>
          {title}
        </TypographyComponent>
      </div>
      <Stack className="innerstack" style={styles.innerstack}  spacing={3}>
        <TextFieldComponent
          style={StyleInputField}
          inputProps={{
            disabled: true,
          }}
          size="small"
          placeholder="Start typing to search"
        />
        {bankData.map((bank) => (
          <Stack key={bank.id}>
            <BankCard
              key={bank.id}
              bankIcon={logos[bank.logoSrc!]}
              bankName={bank.bankName}
              onClick={()=>handleBankCardClick(bank)}
            />
          </Stack>
        ))}
        <CancelButton data-testid="cancel-button" onClick={handleOpen} label="Cancel the transfer" />
      </Stack>
      {pop && <Popper data-testid="popper" open={true} onClose={handleClose} onCancel={oncancel} className="bank-card-modal"/>}
    </Box>
  );
};
