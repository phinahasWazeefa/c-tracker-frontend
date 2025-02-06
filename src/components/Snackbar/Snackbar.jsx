"use client"
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function PositionedSnackbar({ openStatus, onCloseFunction, message, severity }) {
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  useEffect(() => {
    if (openStatus) {
      const timer = setTimeout(() => {
        onCloseFunction(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [openStatus, onCloseFunction]);

  const handleClose = () => {
    onCloseFunction(false);
  };

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openStatus}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}