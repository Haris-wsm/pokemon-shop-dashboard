import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import ApiReq from "@/util/axios";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

export async function getServerSideProps(context) {
  const response = await ApiReq.get("/api/social/");

  const error = response.data.ok ? false : response.data.message;

  return { props: { data: response.data.data, error } };
}

const Social = (props) => {
  const [facebook, setFacebook] = useState(props?.data?.facebook ?? "");
  const [instagram, setInstagram] = useState(props?.data?.instagram ?? "");
  const [twitter, setTwitter] = useState(props?.data?.twitter ?? "");

  const handleSave = async () => {
    try {
      const payload = {
        facebook: getDomainHTTP(facebook),
        instagram: getDomainHTTP(instagram),
        twitter: getDomainHTTP(twitter),
      };

      await ApiReq.post(`/api/social`, payload);
      toast.success("บันทึกสำเร็จ");
    } catch (error) {
      toast.success("เกิดข้อผิดพลาด");
      console.log(error);
    }
  };

  const getDomainHTTP = (url) => {
    if (url === "") return url;
    if (!url.includes(["http", "https"])) {
      return "https://" + url;
    }

    return url;
  };

  if (props.error) return;
  return (
    <MainLayout>
      <PageLayout title="Social Media">
        <Grid container spacing={3} className="mt-10">
          <Grid item xs={12} sm={12} md={6} className="space-y-10">
            <Box className="space-y-2 px-5">
              <Typography className="text-slate-600 text-sm">
                Facebook
              </Typography>
              <TextField
                name="facebook"
                size="small"
                fullWidth
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </Box>
            <Box className="space-y-2 px-5">
              <Typography className="text-slate-600 text-sm">
                Instagram
              </Typography>
              <TextField
                name="instagram"
                size="small"
                fullWidth
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </Box>
            <Box className="space-y-2 px-5">
              <Typography className="text-slate-600 text-sm">
                Twitter
              </Typography>
              <TextField
                name="twitter"
                size="small"
                fullWidth
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </Box>
            <Box className="flex justify-end px-5">
              <Button
                onClick={handleSave}
                className="bg-slate-600 hover:bg-slate-700 text-white ml-auto"
              >
                บันทึก
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}></Grid>
        </Grid>
      </PageLayout>
    </MainLayout>
  );
};

export default Social;
