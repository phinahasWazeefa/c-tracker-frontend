import * as React from 'react';
import {Box,Stack,Grid,Typography} from '@mui/material';



export default function BoxSx({date="Jan 1 2000",category="Cat1",title="tit1",amount="111",typeOfAnalysis}) {
  return (
    <Grid container sx={{background:'#F6F5F5',marginTop:'5px',borderRadius:'12px'}}>
  

       
        
        <Stack sx={{width:'100%',margin:'0px !important',padding:'5px'}} justifyContent={"space-between"} direction="row" >
        <p> <span style={{color:'black',fontWeight:'bold'}}>{typeOfAnalysis=='date'?date:category}&nbsp;</span></p>

            <p> <span style={{color:'#DA0037'}}>{amount}&nbsp;</span>INR</p>
        </Stack>
 
       
     </Grid>
  );
}