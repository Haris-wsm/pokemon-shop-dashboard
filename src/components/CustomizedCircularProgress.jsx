import React from "react";
// import { makeStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";

// const useStyles = makeStyles((theme) => {
//   return {
//     circularPorgress: {
//       color: theme.palette.primary.main,
//     },
//     divProgress: {
//       // position: "absolute",
//       // position: "relative",
//       // top: "50%",
//       // left: "50%",
//       // height: "100%",
//       display: "flex",
//       justifyContent: "center",

//       marginTop: "30vh",
//       // alignItems: "stretch",
//       // alignContent: "center"
//     },
//   };
// });

const CustomizedCircularProgress = () => {
  //   const classes = useStyles();
  return (
    <div>
      <CircularProgress />
    </div>
  );
};

export default CustomizedCircularProgress;
