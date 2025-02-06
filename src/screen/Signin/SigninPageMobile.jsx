"use client"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

//MUI
import { Stack, Grid } from '@mui/material';
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
import { addUser, setLoginState } from '../../Redux/UserSlice'


function SigninPageMobile() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Testing alerts');
  const [snackbarServity, setSnackbarServity] = useState('info');

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const signinFn = ()=>{
    
  
    if( !password || !email){
      setSnackbarMessage("All fields are required");
      setSnackbarServity("warning");
      setSnackbarState(true);
      return;
    }
   
  
    setLoading(true);
    axios.post('/auth/signin',{email:email,password:password,timezone:getUserTimeZone()})
    .then((response) => {
      if(typeof window !== 'undefined'){
        localStorage.setItem('tokenOs', response.data.token);
      }
      dispatch(addUser(response.data.user));
      dispatch(setLoginState(true));
      setLoading(false);
      setSnackbarMessage(response.data.message || "Login success");
      setSnackbarServity("success");
      setSnackbarState(true);
      router.push('/odigos/dashboard/home');
    }).catch((error) => {
      console.log(error);
      setLoading(false);
      const errorMessage =error.response?.data?.message || error.message || "Something went wrong";
      setSnackbarMessage(errorMessage);
      setSnackbarServity("error");
      setSnackbarState(true);
    })
  
  }

  const changeSnackbarState = () => {
    setSnackbarState(false);
};
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
        <h5>Sign In</h5>
        <Grid item xs={12} sm={12} md={12} sx={{ }}>
        <TextFieldWithIcon placeholder='ab@cd.xy' icon={<AlternateEmailIcon/>} type={'email'} onChangeFn={setEmail} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{ }}>
          <PasswordField onChangeFn={setPassword} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{ }}>
          <SimpleButton buttonName='Sign IN'onClickActn={signinFn}  />
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{display:"flex",flexDirection:'row',justifyContent:'center',width:'100%',padding:'5px' }}>
        Want to join us ? <span style={{cursor:'pointer', color:'#1687A7'}} onClick={()=>{router.push('/odigos/signup')}}>&nbsp;Sign Up</span>
        </Grid>
      </Stack>
    </Grid>
    </>
   
  );
}

export default SigninPageMobile;
