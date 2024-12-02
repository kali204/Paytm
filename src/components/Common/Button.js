import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ text, color = 'primary', variant = 'contained', onClick, sx }) => (
    <MuiButton
        variant={variant}
        color={color}
        onClick={onClick}
        sx={{ ...sx }}
    >
        {text}
    </MuiButton>
);

export default Button;
