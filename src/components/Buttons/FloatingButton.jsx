import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';




export default function FloatingButton({buttonText='Dummy',clickAction, height=320, bottom='50px'}) {
  return (
    <Box sx={{ height: height, transform: 'translateZ(0px)', flexGrow: 1, position:'fixed', bottom:bottom, right:'20px' }}>
      <Button variant='contained' sx={{ position: 'absolute', bottom: 16, right: 1, backgroundColor:'transparent', color:'#2666CF' }} onClick={clickAction} >{buttonText}</Button>
    </Box>
  );
}