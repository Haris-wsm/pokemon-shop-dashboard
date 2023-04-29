import TableListBanner from "@/components/banner/TableListBanner";
import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import { withAuth } from "@/util/auth";
import ApiReq from "@/util/axios";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export const getServerSideProps = withAuth(async (context) => {
  const response = await ApiReq.get("/api/banner");
  const error = response.data.ok ? false : true;
  const { data } = response.data;

  return {
    props: {
      banners: data,
      error: error,
    },
  };
});

const ViewAllBanner = ({ banners, error }) => {
  if (error) {
    return;
  }

  const router = useRouter();

  const redirectTo = (url) => router.push(url);

  return (
    <MainLayout>
      <PageLayout title="Banner">
        <Box className="w-full">
          <Box className="mt-5 mb-10 flex justify-end w-4/5 mx-auto">
            <Button
              className="bg-slate-700 hover:bg-slate-700 text-white px-3"
              onClick={() => redirectTo("/banner/add")}
            >
              จัดการ Banner
            </Button>
          </Box>
          <TableListBanner banners={banners} />
        </Box>
      </PageLayout>
    </MainLayout>
  );
};

export default ViewAllBanner;
