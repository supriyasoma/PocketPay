import {
  Box,
  Card,
  MenuItem,
  Modal,
  Select,
  Stack,
  SxProps,
} from "@mui/material";
import styled from "@emotion/styled";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

import {
  CANCEL_TEXT,
  CANCEL_TRANSFER,
  DUMMY_DATA,
  EXISTING_ACCOUNT,
  MENU_ITEMS,
  NEW_ACCOUNT,
  REFUND_TEXT,
  SELECT_ACCOUNT,
  SELECT_OPTION,
} from "/src/utils/constants";
import theme from "/src/theme/theme";
import { TypographyComponent } from "/src/components/atoms/Typography";
import { CustomButton } from "/src/components/atoms/Button";

export interface CancelTransferModalProps {
  handleOpen: () => void;
  open: boolean;
  onClose?: () => void;
  sx?: SxProps;
  username?: string;
}

const Boxstyle = styled(Box)({
  width: "564px",
  height: "auto",
  backgroundColor: theme.palette.structuralColor.white,
  borderRadius: "16px",
  marginLeft: "251px",
  marginTop: "216px",
  ".button": {
    width: "218px",
    height: "56px",
    margin: "40px 173px 12px 173px",
    borderRadius: "56px",
    backgroundColor: theme.palette.primaryColor[500],
    "&:hover": {
      background: `${theme.palette.primaryColor[500]}`,
      color: `${theme.palette.structuralColor.white}`,
    },
  },
});
const TypographyComponent1 = styled(TypographyComponent)({
  paddingTop: "24px",
  paddingLeft: "24px",
  paddingBottom: "40px",
  color: theme.palette.textColor.highemp,
  ...theme.typography.body1,
});
const TypographyComponent2 = styled(TypographyComponent)({
  paddingLeft: "24px",
  padddingBottom: "16px",
  color: theme.palette.textColor.medemp,
  ...theme.typography.caption1,
});
const TypographyComponent3 = styled(TypographyComponent)({
  margin: "20px 330px 20px 18px",
  color: theme.palette.textColor.medemp,
  ...theme.typography.body2,
});
const TypographyComponent4 = styled(TypographyComponent)({
  color: theme.palette.textColor.highemp,
  ...theme.typography.body2,
});
const Stackstyle = {
  border: `1px solid ${theme.palette.greyColor.stroke}`,
  borderRadius: "8px",
  width: "516px",
  height: "191px",
  margin: "16px 24px 11px 24px",
};
const StyledCard = {
  padding: "16px 300px 16px 18px ",
  elevation: 0,
  backgroundColor: "transparent",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: theme.palette.greyColor.stroke,
    color: theme.palette.common.white,
    cursor: "pointer",
  },
};

export const CancelTransferModal = (props: CancelTransferModalProps) => {
  const [showDropdowns, setShowDropdowns] = useState<boolean>(false);
  const [accountNo, setAccountNo] = useState<string>("");

  const handleButtonClick = () => {
    props.handleOpen();
  };

  const handleExistingCardClick = () => {
    setShowDropdowns(true);
  };
  const handleChange = (event: { target: { value: string } }) => {
    setAccountNo(event.target.value);
  };
  const renderingFunction = () => {
    const selectedAccount = MENU_ITEMS.find(
      (item) => item.cardNo === accountNo
    );
    if (selectedAccount) {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <TypographyComponent
            sx={{
              color: theme.palette.textColor.highemp,
              ...theme.typography.body2,
            }}
          >
            {props.username}
          </TypographyComponent>
          <TypographyComponent
            sx={{
              marginRight: "30px",
              color: theme.palette.textColor.highemp,
              ...theme.typography.body2,
            }}
          >
            {DUMMY_DATA} {selectedAccount.cardNo.slice(-4)}
          </TypographyComponent>
        </Box>
      );
    } else {
      return (
        <TypographyComponent
          sx={{
            color: theme.palette.textColor.highemp,
            ...theme.typography.body2,
          }}
        >
          {SELECT_OPTION}
        </TypographyComponent>
      );
    }
  };
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      sx={props.sx}
      data-testid="cancelModel"
    >
      <Boxstyle>
        <TypographyComponent1 data-testid="canceltext1">
          {CANCEL_TEXT}
        </TypographyComponent1>
        <TypographyComponent2>{REFUND_TEXT}</TypographyComponent2>
        {!showDropdowns && (
          <Stack sx={Stackstyle}>
            <TypographyComponent3>{SELECT_ACCOUNT}</TypographyComponent3>
            <Card sx={StyledCard} onClick={handleExistingCardClick}>
              <TypographyComponent4 data-testid="existingaccount">
                {EXISTING_ACCOUNT}
              </TypographyComponent4>
            </Card>
            <Card sx={StyledCard}>
              <TypographyComponent4>{NEW_ACCOUNT}</TypographyComponent4>
            </Card>
          </Stack>
        )}
        {showDropdowns && (
          <Stack>
            <Select
              variant="outlined"
              sx={{ margin: "20px 18px" }}
              IconComponent={ExpandMoreIcon}
              displayEmpty
              renderValue={() => EXISTING_ACCOUNT}
            ></Select>
            <Select
              sx={{ margin: "20px 18px ", zIndex: 1 }}
              IconComponent={ExpandMoreIcon}
              displayEmpty
              value={accountNo}
              onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    marginTop: "-90px",
                  },
                },
              }}
              data-testId="clicked"
              renderValue={() => renderingFunction()}
            >
              {MENU_ITEMS.map((item) => (
                <MenuItem value={item.cardNo} key={item.cardNo}>
                  <Box flexDirection={"column"} paddingTop={"11px"}>
                    <TypographyComponent
                      variant="body2"
                      sx={{ color: theme.palette.textColor.highemp }}
                    >
                      {props.username}
                    </TypographyComponent>
                    <TypographyComponent
                      variant="caption"
                      sx={{ color: theme.palette.textColor.lowemp }}
                    >
                      {item.cardNo}
                    </TypographyComponent>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </Stack>
        )}
        {accountNo && (
          <Box>
            <CustomButton
              className="button"
              variant="contained"
              onClick={handleButtonClick}
              label={CANCEL_TRANSFER}
            />
          </Box>
        )}
      </Boxstyle>
    </Modal>
  );
};
