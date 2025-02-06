"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Typography } from "@mui/material";


export default function MaxWidthDialog({
  openState = false,
  changeOpenState,
  expense
}) {
  return (
    <React.Fragment>
     
      <Dialog
        fullScreen
        fullWidth={true}
        maxWidth={"lg"}
        open={openState}
        onClose={changeOpenState}
        sx={{ fontFamily: "Poppins !important" }}
      >
        <DialogTitle
          marginBottom={1}
          sx={{
            fontFamily: "Poppins !important",
            fontSize: "16px",
            background: "#303737",
            color: "white",
          }}
        >
          <Typography>Expense</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize:'20px'
          }}
        >
          <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
              <span><span style={{fontWeight:'bold',fontSize:'16px'}}>Category</span><span>&nbsp;:&nbsp;{expense?.category || null}</span></span>
            </Grid>
            <Grid item xs={12} sm={12}>
              <span><span style={{fontWeight:'bold',fontSize:'16px'}}>Title</span><span>&nbsp;:&nbsp;{expense?.title || null}</span></span>
            </Grid>
            <Grid item xs={12} sm={12}>
              <span><span style={{fontWeight:'bold',fontSize:'16px'}}>Date</span><span>&nbsp;:&nbsp;{expense?.date || null}</span></span>
            </Grid>
            
            <Grid item xs={12} sm={12}>
              <span><span style={{fontWeight:'bold',fontSize:'16px'}}>Label</span><span>&nbsp;:&nbsp;{expense?.label || null}</span></span>
            </Grid>
            <Grid item xs={12} sm={12}>
              <span><span style={{fontWeight:'bold',fontSize:'16px'}}>Amount</span><span>&nbsp;:&nbsp;{expense?.amount || null}</span></span>
            </Grid>
            <Grid item xs={12} sm={12}>
              <span><span style={{fontWeight:'bold',fontSize:'16px'}}>Remarks</span><span>&nbsp;:&nbsp;{expense?.remarks || null}</span></span>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={changeOpenState}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
