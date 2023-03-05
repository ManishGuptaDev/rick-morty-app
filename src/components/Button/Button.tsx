import React from 'react';
import {default as MuiButton, ButtonProps } from '@mui/material/Button'

interface Props extends ButtonProps {
  className?: string;
  children?: React.ReactNode;
}

type Ref = HTMLButtonElement;

const Button = React.forwardRef<Ref, Props>(
  (
    {
      className,
      children,
      disabled,
      ...rest
    },
    ref,
  ) => (
    <MuiButton
      ref={ref}
      className={`${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </MuiButton>
  ),
);

Button.displayName = 'Button';

export default Button;