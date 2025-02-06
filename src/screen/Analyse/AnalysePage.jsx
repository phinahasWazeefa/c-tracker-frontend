import React from "react";
import Link from "next/link";
import { Grid, Stack, Typography } from "@mui/material";

function AnalysePage() {
  //const router = useRouter();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
      direction="column"
    >
      <span style={{ marginBottom: "8px", fontWeight: "bold" }}>
        Do your expense analysis by,
      </span>
      <Link
        href="/odigos/dashboard/analyse/date"
        style={{ textDecoration: "none" }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#F6F5F5",
            background: "#276678",
            padding: "10px !important",
            borderRadius: "12px",
            width: "105px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          Date
        </Typography>
      </Link>
      <Link
        href="/odigos/dashboard/analyse/category"
        style={{ textDecoration: "none" }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#F6F5F5",
            background: "#276678",
            padding: "10px !important",
            borderRadius: "12px",
            width: "105px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            marginTop: "8px",
          }}
        >
          Category
        </Typography>
      </Link>
      <Link
        href="/odigos/dashboard/analyse/keyword"
        style={{ textDecoration: "none" }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#F6F5F5",
            background: "#276678",
            padding: "10px !important",
            borderRadius: "12px",
            width: "105px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            marginTop: "8px",
          }}
        >
          Keywords
        </Typography>
      </Link>
    </Grid>
  );
}

export default AnalysePage;
