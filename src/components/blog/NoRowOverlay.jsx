import { Box, Typography } from "@mui/material";
import React from "react";
import RouterTwoToneIcon from "@mui/icons-material/RouterTwoTone";

const NoRowOverlay = () => {
  return (
    <Box className="flex gap-2 my-10 justify-center items-center h-full w-full">
      <Typography className="text-sm text-slate-400">ไม่พบข้อมูล</Typography>
      {/* <RouterTwoToneIcon className="text-slate-300 text-6xl" /> */}
    </Box>
  );
};

export default NoRowOverlay;
