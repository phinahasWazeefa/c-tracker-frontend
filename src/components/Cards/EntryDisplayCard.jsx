import * as React from "react";
import { Box, Stack, Grid, Typography } from "@mui/material";

export default function BoxSx({
  date,
  item,
  unitPrice,
  quantity,
  totalAmount,
  viewMoreOption = false,
  viewMoreClick,
  entryId
}) {

  
  return (
    <Grid
      container
      sx={{ background: "#F6F5F5", marginTop: "5px", borderRadius: "12px" }}
    >
      <Stack
        sx={{
          background: "",
          width: "100%",
          margin: "0px !important",
          padding: "5px",
          lineHeight: "0px !important",
        }}
      >
        <p style={{ color: "#362222" }}>{date}</p>
        <p>
          
          <span>{item}&nbsp;({unitPrice})</span>*
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>
            {quantity}
          </span>
        </p>
      </Stack>
      <Stack
        sx={{
          background: "",
          width: "100%",
          margin: "0px !important",
          padding: "5px",
        }}
        justifyContent={viewMoreOption ? "space-between" : "flex-end"}
        direction="row"
      >
        <p>
          <span style={{ color: "#DA0037" }}>{totalAmount}&nbsp;</span>INR
        </p>
        {viewMoreOption ? (
          <p>
            <span style={{ color: "#DA0037",cursor:"pointer" }} onClick={()=>{viewMoreClick(entryId)}}>view More</span></p>
        ) : null}
      </Stack>
    </Grid>
  );
}
