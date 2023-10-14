import { Radio, SxProps, Theme } from "@mui/material";

interface RadioButtonProps {
  checked?: boolean;
  onChange?: (event:React.ChangeEvent) => void;
  onClick?: () => void;
  name?: string;
  sx?: SxProps<Theme>;
  label?: string;
  value?: string;
  variant?: string;
  disabled?:boolean
}

const RadioButton = (props: RadioButtonProps) => {
  return( <Radio data-testid="radioButton" {...props} />)
};

export default RadioButton;
