import { Box, Button, Divider, Grid, Typography } from "@mui/material";

import { useRouter } from "next/router";
import React, { useState } from "react";
import CodeTable from "./CodeTable";
import CodeAdding from "./CodeAdding";

const CodeManage = ({ data }) => {
  const router = useRouter();

  const handleBackward = () => {
    router.back();
  };

  return (
    <>
      <Box className="flex justify-between">
        <Button
          size="small"
          className="bg-slate-700 text-white hover:bg-slate-700 mb-10"
          onClick={handleBackward}
        >
          Back
        </Button>
      </Box>
      <Box className="px-5">
        <CodeAdding />
        <CodeTable codes={data[0].codes} />
      </Box>
    </>
  );
};

export default CodeManage;
