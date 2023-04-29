"use client";
import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const ErrorPage = ({ statusCode }) => {
  return (
    <MainLayout>
      <PageLayout title="Error">
        <Box className="flex flex-col justify-center items-center w-full h-full my-10">
          <Box className="space-y-2 text-center">
            <Typography className="text-3xl text-slate-700">
              เกิดข้อผิดพลาด
            </Typography>
            <Typography className="text-sm text-slate-500">
              โปรดลองอีกครั้งในภายหลัง
            </Typography>
          </Box>
          <Box>
            <img src="/page/500.png" width={500} />
          </Box>
        </Box>
      </PageLayout>
    </MainLayout>
  );
};

export default ErrorPage;
