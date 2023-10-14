import { Chip, ChipProps } from "@mui/material";

import './index.css';
import theme from "/src/theme/theme";
interface PropTypes extends ChipProps {
  label?: string;
  variant?: "filled" | "outlined";
  size?: "medium" | "small";
}

export default function CustomChip({
  label,
  variant,
  size,
  ...rest
}: PropTypes) {
  
  return (
    <div>
      <Chip
        sx={{color:theme.palette.primaryColor[500]}}
        className="styled-chip"
        label={label}
        variant={variant}
        size={size}
        data-testid="custom-chip"
        {...rest} />
    </div>
  );
}
