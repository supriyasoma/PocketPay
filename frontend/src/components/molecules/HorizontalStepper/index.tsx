import {
  Step,
  StepConnector,
  StepIconProps,
  StepLabel,
  Stepper,
  stepConnectorClasses,
} from "@mui/material";
import styled from "@emotion/styled";

import { TypographyComponent } from "/src/components/atoms/Typography";
import theme from "/src/theme/theme";
import "./index.css";

interface HorizontalStepperProps {
  steps: StepProps[] ;
}

interface StepProps {
  label?: string;
  active?: boolean;
  completed?: boolean;
}
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 0,
    right: 0,
  },
  [`& .${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#E4D6FF",
    },
  },
  [`& .${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#E4D6FF",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#F8F9FA",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));
const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: "red",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#784af4",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);

const Caption = styled(TypographyComponent)({
  ...theme.typography.caption1,
});

function QontoStepIcon(props: StepIconProps) {
  const { active, className } = props;

  return (
    <QontoStepIconRoot
      ownerState={{ active }}
      className={className}
      style={{ zIndex: 99 }}
    >
      {active ? <div className="QontoStepIcon-circle" /> : null}
    </QontoStepIconRoot>
  );
}
export const HorizontalStepper = (props: HorizontalStepperProps) => {
  const { steps } = props;
  return (
    <div data-testid="horizontal-stepper" className="horizontal-stepper-container">
      <Stepper connector={<QontoConnector />} className="stepper-section">
        {steps.map((menu,index) => (
          <Step
            key={menu.label}
            active={menu.active}
            completed={menu.completed}
            className="step-section"
          >
            <StepLabel className="step-label-section"
              StepIconComponent={QontoStepIcon}
              StepIconProps={{ active: menu.active, completed: menu.completed }}
            >
              <Caption
                sx={{
                  color:
                    menu.active || menu.completed
                      ? `${theme.palette.primaryColor[500]}`
                      : `${theme.palette.textColor.medemp}`,
                }}
              >
                {menu.label}
              </Caption>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};
