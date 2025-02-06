"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


//MUI
import { Stack, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

//components
import PasswordField from '../../components/Textfields/PasswordField';
import TextFieldWithIcon from '../../components/Textfields/TextFieldWithIcon';
import SimpleButton from '../../components/Buttons/SimpleButton';
import Loader from '../../components/Loader/Loader';
import Snackbar from '../../components/Snackbar/Snackbar';

//helpers
import {getUserTimeZone} from '../../utils/commonFns';
import axios from '../../axios';

function SigninupPageMobile() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Testing alerts');
  const [snackbarServity, setSnackbarServity] = useState('info');

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);



  const changeSnackbarState = () => {
    setSnackbarState(false);
};

const signupFn = ()=>{

  if(!name || !password || !email){
    setSnackbarMessage("All fields are required");
    setSnackbarServity("warning");
    setSnackbarState(true);
    return;
  }
  if(password.length <= 2){
    setSnackbarMessage("Password length must be at least 3");
    setSnackbarServity("warning");
    setSnackbarState(true);
    return;
  }

  setLoading(true);
  axios.post('/user/auth/create-user',{name:name,email:email,password:password,timezone:getUserTimeZone()})
  .then((response) => {
    setLoading(false);
    setSnackbarMessage(response.data.message);
    setSnackbarServity("success");
    setSnackbarState(true);
    router.push('/odigos/signin');
  }).catch((error) => {
    setLoading(false);
    console.log(error);
    const errorMessage =error.response?.data?.message || error.message || "Something went wrong";
    setSnackbarMessage(errorMessage);
    setSnackbarServity("error");
    setSnackbarState(true);
  })

}


  return (
    <>
    <Loader openState={loading} />
    <Snackbar message={snackbarMessage} openStatus={snackbarState} severity={snackbarServity} onCloseFunction={changeSnackbarState} />
    <Grid
      container
      sx={{
        //background: 'cyan',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
    
      <Stack sx={{ background: '', width: '100%', display: 'flex', alignItems: 'center' }} spacing={2}>
        <h5>Sign Up </h5>
        <Grid item xs={12} sm={12} md={12} sx={{ }}>
          <TextFieldWithIcon placeholder='Name' icon={<PersonIcon/>} type={'text'} onChangeFn={setName} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{ }}>
          <TextFieldWithIcon placeholder='ab@cd.xy' icon={<AlternateEmailIcon/>} type={'email'}  onChangeFn={setEmail}/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{ }}>
          <PasswordField onChangeFn={setPassword} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{ }}>
          <SimpleButton buttonName='Sign UP' onClickActn={signupFn}  />
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{display:"flex",flexDirection:'row',justifyContent:'center',width:'100%',padding:'5px' }}>
        Already have account ? <span style={{cursor:'pointer', color:'#1687A7'}} onClick={()=>{router.push('/odigos/signin')}}>&nbsp;Sign In</span>
        </Grid>
      </Stack>
    </Grid>
    </>
    
  );
}

export default SigninupPageMobile;
