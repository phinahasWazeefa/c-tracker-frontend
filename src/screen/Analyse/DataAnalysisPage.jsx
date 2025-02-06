"use client";
import React, { useState } from "react";

//mui
import { Grid, Stack, Typography } from "@mui/material";

//components
import BasicDatePicker from "../../components/DatePicker/BasicDatePicker";
import SimpleButton from "../../components/Buttons/SimpleButton";
import AnalysisEntryDisplayCard from "../../components/Cards/AnalysisEntryDisplayCard";
import Loader from "../../components/Loader/Loader";
import Snackbar from "../../components/Snackbar/Snackbar";
import ExpenseDisplayComponent from "../../components/ExpenseDisplayComponent/ExpenseDisplayComponent";

//helpers
import { doDateValidation, getToken } from "../../utils/commonFns";
import axios from "../../axios";

function DataAnalysisPage() {
  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Testing alerts");
  const [snackbarServity, setSnackbarServity] = useState("info");

  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const [entries, setEntries] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const changeSnackbarState = () => {
    setSnackbarState(false);
  };

  const getData = () => {
    
    if (!doDateValidation(startDate, endDate)) {
      setSnackbarMessage("Check the selected days");
      setSnackbarServity("warning");
      setSnackbarState(true);
      return;
    }
    //window.alert("All correct")
    setLoading(true);
    axios
      .get(
        `/user/analyse-the-expense?startDate=${
          startDate + "T00:00:00.000Z"
        }&endDate=${endDate + "T00:00:00.000Z"}&criteria=${"date"}`,
        { headers: { Authorization: getToken() } }
      )
      .then((response) => {
        if (response.status != 200) {
          const errorMessage =
            response.data?.message || response.data.message || "No data found";
          setSnackbarMessage(errorMessage);
          setSnackbarServity("info");
          setSnackbarState(true);
          setEntries([]);
          setLoading(false);

          return;
        }
        setEntries(response.data.expenses);
        const calculatedTotalAmount = response.data.expenses.reduce(
          (total, entry) => total + entry.totalAmount,
          0
        );
        setTotalAmount(calculatedTotalAmount);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setSnackbarMessage(error.response.data.message);
        setSnackbarServity("error");
        setSnackbarState(true);
      });
  };

  return (
    <>
      <Loader openState={loading} />
      <Snackbar
        message={snackbarMessage}
        openStatus={snackbarState}
        severity={snackbarServity}
        onCloseFunction={changeSnackbarState}
      />

      <Grid container>
        <Grid item xs={12} padding={1}>
          <BasicDatePicker label={"from"} onChangeFn={setstartDate} />
        </Grid>
        <Grid item xs={12} padding={1}>
          <BasicDatePicker label={"to"} onChangeFn={setendDate} />
        </Grid>
        <Grid item xs={12} padding={1}>
          <SimpleButton buttonName="Search" onClickActn={getData} />
        </Grid>
        <Grid
          item
          xs={12}
          padding={1}
          justifyContent={"center"}
          display={"flex"}
        >
          {entries.length > 0 ? (
            <span>
              {" "}
              <span>Total:&nbsp;</span>
              {totalAmount}
            </span>
          ) : null}
        </Grid>
        <Grid
          item
          xs={12}
          padding={1}
          marginTop={"10px"}
          justifyContent="center"
          sx={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
        >
          {entries.length > 0 ? (
            <>
              {entries.map((entry) => {
                return (
                  <AnalysisEntryDisplayCard
                    typeOfAnalysis={"date"}
                    date={entry.day}
                    amount={entry.totalAmount}
                  />
                );
              })}
            </>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
}

export default DataAnalysisPage;
