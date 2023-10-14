
import { Step, StepLabel, Stepper } from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './index.css';
import { TypographyComponent } from "/src/components/atoms/Typography";

interface StepperProps{
steps:StepProps[],
labelStyles?:React.CSSProperties
};

interface StepProps {
trackTime?:string,
trackInfo?:string,
completed?:boolean,
active?:boolean
};


export const DotComponent = (iconProps:any)=>{
  return (<FiberManualRecordIcon sx={{fontSize:"10px"}}/>);
};


export const TimelineStepperComponent = (props:StepperProps)=>{
    const { steps , labelStyles } = props;
    return (
        <div data-testid="timeline-stepper" className="timeline-stepper" >
      <Stepper orientation="vertical" sx={{paddingLeft:"15%"}}>
      {steps.map((step:StepProps) => (
        <Step key={step.trackTime} active={step.active} completed={step.completed}>
          <StepLabel StepIconComponent={DotComponent} sx={{padding:"0px",color:(step.completed || step.active) ? '#7633FF':'#E4E4E5'}} style={labelStyles}>
            <TypographyComponent sx={{position:'absolute',left:"3%"}} variant="caption">{step?.trackTime}</TypographyComponent>
            <TypographyComponent sx={{position:'absolute',left:"20%"}} variant="caption">{step?.trackInfo}</TypographyComponent>

          </StepLabel>
        </Step>
      ))}
    </Stepper>
    </div>
      
    );
}