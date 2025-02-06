import React from 'react'
import Button from '@mui/material/Button';

function SimpleButton({variant="contained",buttonName='contained', onClickActn, btnSize="large"}) {
  return (
    <Button variant={variant} fullWidth sx={{width:'100%'}} size={btnSize} onClick={onClickActn}>{buttonName}</Button>
  )
}

export default SimpleButton