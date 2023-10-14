import * as React from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import { Stack, Box, Tab, Tabs, Card, Divider } from "@mui/material";

import theme from "/src/theme/theme";
import { TypographyComponent } from "/src/components/atoms/Typography";
import { CustomButton } from "/src/components/atoms/Button";
import { TimelineStepperComponent } from "/src/components/molecules/TimelineStepper";
import { PaymentStatus, STATUS_CANCEL } from "/src/utils/constants";
import './index.css';
import Image from "/src/components/atoms/Image";
import arrowright from "/public/assets/images/Muiicons/arrow-up-right.svg";
import share from "/public/assets/images/Muiicons/share.svg";
import info from "/public/assets/images/Muiicons/help-circle.svg";

export interface PaymentStatusProps {
  username?: string;
  status?: string;
  uservalue?: string;
  convertednewvalue?: string;
  onClickShare?: () => void;
  onClickCancel?: () => void;
  accountname?: string;
  accountnumber?: string;
  transactionrefund?:boolean;
}
interface StepProps {
  trackTime?:string,
  status?:string,
  completed?:boolean
  active?:boolean
  };
export interface PaymentOverallStatusProps extends PaymentStatusProps {
  steps: StepProps[];
  labelStyles: React.CSSProperties;
}

const RefundTypo = styled(TypographyComponent)({
  color: theme.palette.textColor.highemp,
  ...theme.typography.body1,
  paddingLeft:"27px"
});
const RefundTypoContent = styled(TypographyComponent)({
  color: theme.palette.textColor.medemp,
  ...theme.typography.body3,
  paddingLeft:"27px"
});

const NewImage = styled(Image)({
  width: "24px",
  height: "24px",
  borderRadius: "40px",
  background: theme.palette.structuralColor.background,
  border: "8px solid #F8F9FA", 
});
const StyleCard = styled(Box)({
  paddingTop: "2%",
  minHeight: "79px",
});
const HeaderBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: "87px",
  padding: "16px",
  marginLeft:"30px",
  marginRight:"30px",
});
const StyleStack = styled(Stack)({
  paddingLeft: "3%",
  paddingRight: "3%",
});
const Stackone = styled(Stack)({
  paddingBottom: "12px",
});
const Stacktwo = styled(Stack)({
  marginLeft: "3%",
});
const StyleTab = styled(Tabs)({
  minHeight: "58px",
});
const ColorTab = styled(Tab)`
  "& .muitab-root.mui-selected": {
    color: "red";
  }
`;
const OverallCard = styled(Card)({
  marginLeft:"10px",
  width: "100%",
  minWidth: "1072",
  boxShadow: "none",
  border: `1px solid ${theme.palette.greyColor.stroke}`,
});
const GeneralButton = styled(CustomButton)({
  width: "116px",
  height: "46px",
  borderRadius: "4px",
  border: " 1px solid #E4E4E5",
  color: theme.palette.textColor.highemp,
  background: theme.palette.structuralColor.background,
  "&:hover": {
    background: theme.palette.structuralColor.hovercolor,
  },
  boxShadow: "none",
  textTransform: "none",
});
const CancelButton = styled(CustomButton)({
  width: "218px",
  height: "58px",
  borderRadius: "56px",
  color: theme.palette.primaryColor[500],
  background: theme.palette.structuralColor.white,
  "&:hover": {
    background: theme.palette.structuralColor.hovercolor,
  },
  boxShadow: "0",
  textTransform: "none",
  marginRight: "1%",
  marginBottom: "2%",
});
const Typoone: React.CSSProperties = {
  color: theme.palette.textColor.highemp,
  textAlign: "right",
  ...theme.typography.body2
};
const Typotwo: React.CSSProperties = {
  color: theme.palette.textColor.medemp,
  ...theme.typography.caption1
};
const Typothree: React.CSSProperties = {
  color: theme.palette.textColor.medemp,
  ...theme.typography.body2
};

export const PaymentOverallStatus = ({
  username,
  status,
  uservalue,
  convertednewvalue,
  onClickShare,
  onClickCancel,
  accountname,
  accountnumber,
  steps,
  labelStyles
}: PaymentOverallStatusProps) => {
  const [open, setOpen] = React.useState(true);
  const value="one";
  
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <OverallCard>
      <HeaderBox>
        <Stack
        data-testid="exapand-btn"
          direction="row"
          spacing={5}
          alignItems="center"
          onClick={handleClick}
        >
          <NewImage src={arrowright} />
          <Stack>
            <TypographyComponent
              children={username}
              style={Typoone}
            />
            <TypographyComponent
              children={status}
              style={Typotwo}
            />
          </Stack>
        </Stack>
        <Stack direction="row" spacing={5}>
          <Stack>
            <TypographyComponent
              children={uservalue}
              style={Typoone}
            />
            <TypographyComponent
              children={convertednewvalue}
              style={Typotwo}
            />
          </Stack>
          {open ? (
            <ExpandLess onClick={handleClick} />
          ) : (
            <ExpandMore onClick={handleClick} />
          )}
        </Stack>
      </HeaderBox>
      <Divider variant="fullWidth" />
      {open && (
        <Box
          sx={{
            minHeight: "471px",
          }}
        >
          <StyleCard>
            <StyleStack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <StyleTab
                value={value}
                data-testid="status-tab"
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: theme.palette.primaryColor[500],
                  },
                }}
              >
                <Tab
                  value={PaymentStatus.tabvalue}
                  label={PaymentStatus.tabfirstlabel}
                />
                <Tab label={PaymentStatus.tabsecondlabel} />
              </StyleTab>
              <Stackone direction="row" spacing={3} alignItems="center">
                <GeneralButton
                  label={PaymentStatus.generallabel}
                  variant="contained"
                  endIcon={<ExpandMore />}
                />
                <Image datatest-id ="share-button" src={share} onClick={onClickShare} />
                <Image src={info} onClick={onClickShare} />
              </Stackone>
            </StyleStack>
            <Divider />
          </StyleCard>

          <Stack spacing={5}>
            <Stacktwo spacing={5} alignItems="flex-start">
              <Stack direction="row" spacing={15} minWidth={399}>
                <div className="label-text">
                <TypographyComponent
                  children={PaymentStatus.labelone}
                  style={Typothree}
                />
                </div>
                <div className="label-value">
                <TypographyComponent
                  children={accountname}
                  style={Typoone}
                />
                </div>
               
              </Stack>
              <Stack direction="row" spacing={10} minWidth={399}>
              <div className="label-text">
                <TypographyComponent
                  children={PaymentStatus.labeltwo}
                  style={Typothree}
                />
                </div>
                <div className="label-value">
                <TypographyComponent
                  children={accountnumber}
                  style={Typoone}
                />
                </div>
               
              </Stack>
            </Stacktwo>
            {status == STATUS_CANCEL ? (
              <>
              <RefundTypo>Your money will be refunded</RefundTypo>
                <RefundTypoContent>
                  When we receive your money, we’ll give you a refund. Refunds
                  usually take 3-5 working days.
                </RefundTypoContent>
                </>
            ):(   
              <>
             <TimelineStepperComponent steps={steps} labelStyles={labelStyles} />
           
            <Stack alignItems="flex-end">
              <CancelButton
                data-testid="cancel-button"
                label={PaymentStatus.cancellabel}
                variant="contained"
                onClick={onClickCancel}
              />
            </Stack>
            </>
             )}
          </Stack>
        </Box>
      )}
    </OverallCard>
  );
};
