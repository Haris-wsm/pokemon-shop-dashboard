import { Box, Typography } from "@mui/material";
import clsx from "clsx";
import React from "react";

const Widget = ({ label, amount, Icon, sx }) => {
  return (
    <Box className="inline-block mt-5 ml-5">
      <Box className="flex gap-3 4">
        <Box
          className={clsx({
            ["w-[40px] h-[40px] flex justify-center items-center p-5 rounded-md shadow-sm"]: true,
            [sx]: true,
          })}
        >
          <Icon className="text-white" />
        </Box>
        <Box>
          <Typography className="text-xs text-gray-500">{label}</Typography>
          <Typography className="text-xs text-gray-500 mt-2 font-semibold">
            {amount?.toLocaleString()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Widget;
