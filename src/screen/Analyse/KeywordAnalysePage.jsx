"use client";
import React, { useState } from "react";
import {useSelector } from 'react-redux';
//mui
import { Grid } from "@mui/material";

//components

import TextField from "../../components/Textfields/TextField";
import SimpleButton from "../../components/Buttons/SimpleButton";
import Loader from "../../components/Loader/Loader";
import Snackbar from "../../components/Snackbar/Snackbar";
import EntryDisplayCard from "../../components/Cards/EntryDisplayCard";
import ViewExpenseInDetailComponent from '../../components/Dialog/ViewExpenseInDetailComponent';

//helpers
import { doDateValidation, getToken, convertToUserLocalTime } from "../../utils/commonFns";
import axios from "../../axios";

function KeywordAnalysePage() {
    let {user} = useSelector((state)=>state.user);
  const [loading, setLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Testing alerts");
  const [snackbarServity, setSnackbarServity] = useState("info");

  const [searchKeyWord, setSearchKeyWord] = useState(null);
  const [expenses,setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [viewMoreComponentStatus, setViewMoreComponentStatus] = useState(false);
  const [expenseToViewMore,setExpenseToViewMore] = useState(null);

  const changeSnackbarState = () => {
    setSnackbarState(false);
  };

  const getData = () => {
    //window.alert("All correct")
    setLoading(true);
    axios
      .get(
        `/user/search-with-keyword?keyword=${searchKeyWord}`,
        { headers: { Authorization: getToken() } }
      )
      .then((response) => {
        if (response.status != 200) {
          const errorMessage =
            response.data?.message || response.data.message || "No data found";
          setSnackbarMessage(errorMessage);
          setSnackbarServity("info");
          setSnackbarState(true);
          setExpenses([]);
          setLoading(false);

          return;
        }
       
        setExpenses(response.data.expenses);
        const calculatedTotalAmount = response.data.expenses.reduce(
          (total, entry) => total + entry.amount,
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

  const closeViewMoreComponents = () => {
    setViewMoreComponentStatus(false);
  }

  const viewMoreActnFunction = (id)=>{
  
    const entry = expenses.find(exp=> exp._id == id);
    let objData = {
        title:entry.title,
        category:entry.category.name,
        label:entry.label.name,
        date:convertToUserLocalTime(entry.date,user.timezone),
        amount:entry.amount,
        remarks:entry.remarks
    };
    
    setExpenseToViewMore(objData);
    setViewMoreComponentStatus(true)




  }

  return (
    <>
      <Loader openState={loading} />
      <Snackbar
        message={snackbarMessage}
        openStatus={snackbarState}
        severity={snackbarServity}
        onCloseFunction={changeSnackbarState}
      />
      <ViewExpenseInDetailComponent openState={viewMoreComponentStatus} changeOpenState={closeViewMoreComponents} expense={expenseToViewMore} />

      <Grid container>
        <Grid item xs={12} padding={1}>
          <TextField onChangeFn={setSearchKeyWord} label="keyword" />
        </Grid>

        <Grid item xs={12} padding={1}>
          {searchKeyWord!=null && searchKeyWord.length > 3 ? (
            <SimpleButton buttonName="Search" onClickActn={getData} />
          ) : null}
        </Grid>
        <Grid
          item
          xs={12}
          padding={1}
          justifyContent={"center"}
          display={"flex"}
        >
          {expenses.length > 0 ? (
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
          {expenses.length > 0 ? (
            <>
              {expenses.map((entry) => {
                return (
                  <EntryDisplayCard
                    entryId={entry['_id']}
                    category={entry.category.name}
                    title={entry.title}
                    date={convertToUserLocalTime(entry.date,user.timezone)}
                    amount={entry.amount}
                    viewMoreOption
                    viewMoreClick={viewMoreActnFunction}

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

export default KeywordAnalysePage;
