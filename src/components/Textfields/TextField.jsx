import React from 'react';
import TextField from '@mui/material/TextField';

function SimpleTextField({variant='outlined', label='outlined', onChangeFn }) {
  return (
    <TextField id="outlined-basic" label={label} variant={variant}  onChange={(e)=>{onChangeFn(e.target.value)}} fullWidth />
  )
}

export default SimpleTextField