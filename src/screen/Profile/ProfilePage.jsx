"use client"

import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

//mui
import { Grid, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import AssessmentIcon from '@mui/icons-material/Assessment';


//components
import SimpleButton from '../../components/Buttons/SimpleButton';

//helpers
import { addUser, setLoginState } from '../../Redux/UserSlice';


function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  let {user} = useSelector((state)=>state.user);
  let userName = user?.name?.charAt(0)||"U";


  const logout = ()=>{
    if(typeof window !== 'undefined'){
      localStorage.removeItem('tokenOs');
   }
    dispatch(setLoginState(false));
    router.push('/odigos/signin');
    dispatch(addUser({}));

  }
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" ml={2}>
            Profile
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <hr />
        </Grid>
        <Grid item xs={2}>
          <hr />
        </Grid>
        <Grid container ml={2} mt={2}>
          <Grid item xs={2}>
            <Avatar>{userName}</Avatar>
          </Grid>
          <Grid item xs={10}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <span>
                {" "}
                <span style={{ color: "#1687A7", fontWeight: "bold" }}>
                  Hello,
                </span>
                <br />
                <span>{user.name}</span>
              </span>
              <span style={{ marginRight: "10%", marginTop: "3%" }}>
                <NavigateNextIcon sx={{ color: "#1687A7", fontSize: "30px" }} />
              </span>
            </Stack>
          </Grid>
        </Grid>

        <Grid item xs={12} mt={5}>
          <Typography variant="h5" ml={2}>
            Settings
          </Typography>
        </Grid>
        <Grid item xs={12} mt={1} padding={3}>
          <Grid
            
            style={{
              border: "1px solid black",
              borderRadius: "5px",
              height: "225px",
              padding: "8px",
              background:'#F6F6F6'
            }}
          >
            <Stack direction={"row"} justifyContent={"space-between"} mt={1}>
              <span>
                <EditNotificationsIcon
                  sx={{ color: "#379237", fontSize: "30px" }}
                />
              </span>
              <span style={{ fontWeight: "bold" }}>Notifications</span>
              <NavigateNextIcon sx={{ fontSize: "30px" }} />



                 
              
             
            </Stack>
            <hr />
            <Stack direction={"row"} justifyContent={"space-between"}>
              <span>
                <WorkIcon
                  sx={{ color: "#2192FF", fontSize: "30px" }}
                />
              </span>
              <span style={{ fontWeight: "bold" }}>Budget</span>
              <NavigateNextIcon sx={{ fontSize: "30px" }} />



                 
              
             
            </Stack>
            <hr />
            <Stack direction={"row"} justifyContent={"space-between"}>
              <span>
                <CategoryIcon
                  sx={{ color: "#FB2576", fontSize: "30px" }}
                />
              </span>
              <span style={{ fontWeight: "bold" }}>Category</span>
              <NavigateNextIcon sx={{ fontSize: "30px" }} />
   
            </Stack>
            <hr />
            <Stack direction={"row"} justifyContent={"space-between"}>
              <span>
                <AssessmentIcon
                  sx={{ color: "#FF6D28", fontSize: "30px" }}
                />
              </span>
              <span style={{ fontWeight: "bold" }}>Report</span>
              <NavigateNextIcon sx={{ fontSize: "30px" }} />
   
            </Stack>

          </Grid>
        </Grid>
        <Grid container sx={{display: "flex", justifyContent:'center'}}>
          <Grid item xs={6}>

              <SimpleButton variant="outlined" buttonName="Logout" onClickActn={logout}/>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ProfilePage;
