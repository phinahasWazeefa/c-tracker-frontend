"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 

//mui
import { Grid, Stack, Typography, IconButton, Paper } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';

//components
import Loader from '../../components/Loader/Loader';
import Snackbar from '../../components/Snackbar/Snackbar';

//helpers
import axios from "../../axios";
import { convertToUserLocalTime, getToken } from "../../utils/commonFns";

function SessionsPage() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Testing alerts");
  const [snackbarServity, setSnackbarServity] = useState("info");


  const [sessions, setSessions] = useState([])



  const changeSnackbarState = () => {
    setSnackbarState(false);
  };


  const viewASession = (sessionId) => {
    router.push(`/odigos/dashboard/${sessionId}`);
  }

  useEffect(() => {

    console.log("session page")

    async function fetchData() {
      try {
        setLoading(true)

        const response = await axios.get(`/user/get-my-sessions`, { headers: { Authorization: getToken() } });
        setSessions(response.data.sessions);
        setLoading(false);

      } catch (error) {
        console.log(error.response);
        setLoading(false)
        setSnackbarMessage(
          error.response?.data?.message || error.message || "Something went wrong while fetching session"
        );
        setSnackbarServity("error");
        setSnackbarState(true);
        setLoading(false);

      }
    }

    fetchData()


  }, []);

  return (
    <>
      <Loader openState={loading} />
      <Snackbar
        message={snackbarMessage}
        openStatus={snackbarState}
        severity={snackbarServity}
        onCloseFunction={changeSnackbarState}
      />
      {/* Paper provides a card-like container with border and elevation */}
      <Grid container>
        <Grid item md={12} lg={12} mt={2}>
          {
            sessions.map((session,index)=>{
              return  <Paper
              elevation={3}
              sx={{
                width: '100%',
                p: 2,
                mb: 2,
                borderRadius: 2,
                backgroundColor: '#f5f5f5', // Light grey background
                border: '1px solid #ddd', // Light border for definition
              }}
            >
              <Grid container alignItems="center" spacing={2}>
                {/* Session Number */}
                <Grid item xs={12} sm={2}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {session.name}
                  </Typography>
                </Grid>
  
                {/* Start Date */}
                <Grid item xs={12} sm={3}>
                  <Typography variant="body1" color="text.secondary">
                    {convertToUserLocalTime(session.startdate,"Asia/Kolkata")}
                  </Typography>
                </Grid>
  
                {/* End Date */}
                <Grid item xs={12} sm={3}>
                  <Typography variant="body1" color="text.secondary">
                  {convertToUserLocalTime(session.endDate,"Asia/Kolkata")}
                  </Typography>
                </Grid>
  
                {/* Total Session Price */}
                <Grid item xs={12} sm={2}>
                  <Typography variant="body1" color="text.primary">
                    {session.totalSessionPrice}
                  </Typography>
                </Grid>
  
                {/* View Icon */}
                <Grid item xs={12} sm={2} container justifyContent="center">
                  <IconButton onClick={()=>{viewASession(session._id)}} color="primary">
                    <VisibilityIcon fontSize="large" />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
             
            })
          }
        
        </Grid>

      </Grid>

    </>
  );
};



export default SessionsPage;
