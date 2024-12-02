import React from 'react';
import { TextField } from '@mui/material';

const InputField = ({ label, type = 'text', value, onChange, fullWidth = true, sx, ...props }) => (
    <TextField
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        fullWidth={fullWidth}
        sx={{ ...sx }}
        {...props}
    />
);

export default InputField;
