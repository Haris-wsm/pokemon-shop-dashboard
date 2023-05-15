import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import shcema from "@/util/validator/contact/mail";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ApiReq from "@/util/axios";
import { toast } from "react-toastify";

export async function getServerSideProps(context) {
  const response = await ApiReq.get("/api/social/");

  const error = response.data.ok ? false : response.data.message;

  return { props: { data: response.data.data, error } };
}

const Contact = (props) => {
  const [email, setEmail] = useState(props?.data?.contact_email ?? "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(shcema) });

  const onSubmit = async (data) => {
    const payload = {
      contact_email: data.email,
    };

    handleSaveContactMail(payload);
  };

  const handleSaveContactMail = async (payload) => {
    try {
      await ApiReq.post("/api/social/", payload);

      toast.success("บันทึกสำเร็จ");
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(errors);

  return (
    <MainLayout>
      <PageLayout title="ข้อมูลกการติดต่อ">
        <Box className="flex flex-wrap gap-3 my-5">
          <Typography className="text-xs text-slate-700">Note:</Typography>
          <Typography className="text-xs text-slate-600">
            สำหรับใช้รับอีเมลแจ้งจากผู้ใช้งาน ติดต่อสอบถามหรือรายงานปัญหา
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} className="mt-5">
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <Typography className="text-sm text-slate-700">อีเมล</Typography>
              <TextField
                name="email"
                {...register("email")}
                size="small"
                fullWidth
                helperText={errors?.email?.message}
                defaultValue={email}
              />

              <Box className="flex justify-end">
                <Button type="submit">บันทึก</Button>
              </Box>
            </form>
          </Grid>
          <Grid item xs={12} sm={12} md={6}></Grid>
        </Grid>
      </PageLayout>
    </MainLayout>
  );
};

export default Contact;
