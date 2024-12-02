import React from 'react';
import { Modal as MuiModal, Box, Typography, Button } from '@mui/material';

const Modal = ({ open, onClose, title, content, onConfirm }) => (
    <MuiModal open={open} onClose={onClose}>
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
            }}
        >
            <Typography variant="h6" component="h2">
                {title}
            </Typography>
            <Typography sx={{ mt: 2 }}>{content}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button variant="contained" color="primary" onClick={onConfirm} sx={{ mr: 1 }}>
                    Confirm
                </Button>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </Box>
        </Box>
    </MuiModal>
);

export default Modal;
