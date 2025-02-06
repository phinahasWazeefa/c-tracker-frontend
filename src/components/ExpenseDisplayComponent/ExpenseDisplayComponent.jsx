import React from "react";

import { Grid, Stack } from "@mui/material";

import { getUserMonth } from "../../utils/commonFns";

function ExpenseDisplayComponent({
  totalAmount,
  thisMonthTotal,
  monthTotaal = false,
  sessionName
}) {
  return (
    // <Grid item xs={12} sm={12} sx={{background:'#D3E0EA',color:'black',height:'20vh',display:'flex',justifyContent:'center',alignItems:'center'}} >

    //    <h4>{totalAmount}</h4>

    // </Grid>

    <Grid
      item
      xs={12}
      sx={{
        background: "#1687A7",
        height: "20vh",
        color: "white",
        borderRadius: "12px",
      }}
    >
      <Stack alignItems={"center"} sx={{ width: "100%" }}>
        {" "}
        <h4 style={{ color: "white", fontWeight: "bolder" }}>
          {totalAmount}
        </h4>{" "}
      </Stack>
      {monthTotaal ? (
        <Stack
          alignItems={"flex-end"}
          pr={1}
          sx={{ width: "100%", marginBottom: "0px !important" }}
        >
          {" "}
          {sessionName ? <span>
            SessionName:&nbsp;{sessionName}
            {/* {getUserMonth()}:&nbsp;{thisMonthTotal} */}
          </span>:null }
          {" "}
        </Stack>
      ) : null}
    </Grid>
  );
}

export default ExpenseDisplayComponent;
