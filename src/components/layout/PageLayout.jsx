import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const PageLayout = (props) => {
  return (
    <Box>
      <Typography className="text-2xl text-fontMain">{props.title}</Typography>
      <Box className="my-3 relative">
        <Divider className="w-4/5 " />
        <Divider className="w-[10%] absolute left-0 bg-main" />
      </Box>
      <Box className="p-3">{props.children}</Box>
    </Box>
  );
};

export default PageLayout;
