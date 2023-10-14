import React from 'react';
import { Button,SxProps,Theme } from '@mui/material';
import styled from '@emotion/styled';
import theme from '../../../theme/theme';

interface ButtonProps {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  style?: React.CSSProperties;
  label?: string;
  sx?: SxProps<Theme>;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
const ButtonStyle = styled(Button)({
  textTransform: 'none',
  ...theme.typography.body2
});

export const CustomButton = (props: ButtonProps) => {
  return (
    <ButtonStyle data-testid="Button" {...props}>{props.label}</ButtonStyle>
  );
};
