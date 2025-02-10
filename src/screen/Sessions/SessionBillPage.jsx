"use client";

import React, { useState, useEffect } from "react";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "../../axios";
import {getToken } from '../../utils/commonFns'

//components
import Loader from '../../components/Loader/Loader';
import Snackbar from '../../components/Snackbar/Snackbar';

const BillPage = ({ sessionId }) => {

   const [loading, setLoading] = useState(false);
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("Testing alerts");
    const [snackbarServity, setSnackbarServity] = useState("info");

    
  const changeSnackbarState = () => {
    setSnackbarState(false);
  };

  const [sessionData, setSessionData] = useState(null);

  // Set session data when component mounts
  useEffect(() => {

    async function fetchData() {
      try {
        setLoading(true)

        const response = await axios.get(`/user/get-a-session-bill?sessionLogId=${sessionId}`, { headers: { Authorization: getToken() } });
        setSessionData(response.data.sessionBill);
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
     <Container sx={{ my: 4 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#1976D2" }}>
        Invoice
      </Typography>

      {sessionData?.items?.length > 0 ? (
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead sx={{ bgcolor: "#1976D2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Item Name 😋</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Quantity</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Unit Price</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessionData.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.item}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">{item.unitPrice}</TableCell>
                  <TableCell align="center">{item.quantity * item.unitPrice}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right" sx={{ fontWeight: "bold" }}>
                  Total Amount:
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  ${sessionData.totalSessionPrice}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
       null
      )}
    </Container>
    {sessionData && sessionData?.items?.length == 0 ? <Typography variant="h5" align="center">No items found</Typography>:null }
    
    </>
   
  );
};

export default BillPage;
