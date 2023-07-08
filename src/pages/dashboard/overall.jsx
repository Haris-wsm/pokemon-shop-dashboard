import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import CodeIcon from "@mui/icons-material/Code";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import ClearAllOutlinedIcon from "@mui/icons-material/ClearAllOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { withAuth } from "@/util/auth";
import Widget from "@/components/dashboard/widget";
import ApiReq from "@/util/axios";
import AllSoldChart from "@/view/AllSoldChart";
import AllTodayTable from "@/view/AllTodayTable";

const Overall = (props) => {
  if (props.error) {
    return;
  }

  const summary = props.summary;

  return (
    <MainLayout>
      <PageLayout title="Dashboard">
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4}>
              <Card className="relative w-full">
                <CardHeader
                  title={
                    <Typography className="text-gray-500">
                      สรุปยอดสินค้า
                    </Typography>
                  }
                  subheader={
                    <Typography className="text-gray-400 text-xs my-2">
                      ยอดจำนวนสินค้าทั้งหมดในระบบ
                    </Typography>
                  }
                />
                <img
                  src="/misc/triangle-light.png"
                  alt="misc-shard"
                  className="w-2/3 h-4/5 absolute bottom-0 right-0"
                />

                <img
                  src="/misc/trophy.png"
                  alt="misc-shard"
                  width={100}
                  className=" absolute bottom-2 right-5"
                />

                <CardContent>
                  <Box className="flex justify-start items-center gap-2 px-5">
                    <Typography className="text-4xl text-purple-500">
                      {summary.products}
                    </Typography>
                    <Typography className="text-md text-gray-500">
                      ชิ้น
                    </Typography>
                  </Box>
                  <Box>
                    <Link href="/products/all">
                      <Button
                        className="bg-purple-500 hover:bg-purple-500 text-white px-3 my-5 mx-5"
                        size="small"
                      >
                        เรียกดูสินค้า
                      </Button>
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Card>
                <CardHeader
                  title={
                    <Typography className="text-gray-500">
                      ข้อมูลยอดสถิติ
                    </Typography>
                  }
                  subheader={
                    <Typography className="text-gray-400 text-xs my-2">
                      รายละเอียดสถิติที่น่าสนใจ
                    </Typography>
                  }
                />
                <CardContent className="">
                  <Widget
                    label="จำนวน Code"
                    Icon={CodeIcon}
                    amount={summary.codes}
                    sx="bg-purple-500"
                  />
                  <Widget
                    label="จำนวน Blog"
                    Icon={BookmarksOutlinedIcon}
                    amount={summary.blogs}
                    sx="bg-green-400"
                  />
                  <Widget
                    label="จำนวนประเภท"
                    Icon={BookmarksOutlinedIcon}
                    amount={summary.category}
                    sx="bg-yellow-400"
                  />
                  <Widget
                    label="บัญชีผู้ใช้งาน"
                    Icon={ContactMailOutlinedIcon}
                    amount={summary.accounts}
                    sx="bg-blue-400"
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <AllTodayTable />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <AllSoldChart />
            </Grid>
          </Grid>
        </Box>
      </PageLayout>
    </MainLayout>
  );
};

Overall.requireAuth = true;

export const getServerSideProps = withAuth(async (context) => {
  const response = await ApiReq.get("/api/dashboard");

  const error = response.data.ok ? false : response.data.message;
  return {
    props: { summary: response.data.data, error },
  };
});

export default Overall;
