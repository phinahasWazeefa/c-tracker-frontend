"use client";

import React, { useState, useEffect } from "react";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const BillPage = ({ sessionData: initialData, error }) => {
  const [sessionData, setSessionData] = useState(null);

  // Set session data when component mounts
  useEffect(() => {
    
    setSessionData(initialData.sessionBill);
  }, [initialData]);

  // Error Component
  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error: {error}
      </Typography>
    );
  }

  return (
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
        <Typography variant="h5" align="center">No items found</Typography>
      )}
    </Container>
  );
};

export default BillPage;
