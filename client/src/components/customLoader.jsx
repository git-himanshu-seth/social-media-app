import React from "react";
import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress color="primary" size={80} thickness={4} />
    </div>
  );
};

export default Loader;
