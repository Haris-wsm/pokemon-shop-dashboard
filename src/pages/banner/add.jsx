import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import { Box, Button, FormHelperText, IconButton } from "@mui/material";
import React, { useState } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import SingleFileUpload from "@/components/ui/DropImageFile/SingleFileUpload";
import { Controller, useForm } from "react-hook-form";

import schema from "@/util/validator/banner/add";
import { yupResolver } from "@hookform/resolvers/yup";
import ApiReq from "@/util/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { withAuth } from "@/util/auth";

const AllBanner = () => {
  const [image, setImage] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const file = data.banner[0].file;

    try {
      const formData = new FormData();
      formData.append("image", file);

      await ApiReq.post("/api/upload/banner", formData);
      toast.success("เพิ่มรูปภาพสำเร็จ");
      setImage([]);
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  const router = useRouter();

  const redirectBack = () => {
    router.back();
  };

  return (
    <MainLayout>
      <PageLayout title="Banner">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="flex justify-between w-4/5 mx-auto mt-10 mb-5">
            <Button
              className="bg-slate-700 hover:bg-slate-700 text-white"
              onClick={redirectBack}
            >
              กลับ
            </Button>
            <Button
              className="bg-red-400 hover:bg-red-500  text-white px-3"
              endIcon={<PlaylistAddIcon />}
              type="submit"
            >
              เพิ่ม Banner
            </Button>
          </Box>
          <Box className="mt-10 w-4/5 mx-auto">
            <Controller
              name="banner"
              control={control}
              value={image}
              render={({ field: { onChange } }) => (
                <SingleFileUpload
                  onChange={onChange}
                  setFiles={setImage}
                  imageTitle={image}
                  error={Boolean(errors.banner?.message)}
                />
              )}
            />
            <FormHelperText className="text-red-500 px-3 py-2">
              {errors.banner?.message}
            </FormHelperText>
          </Box>
        </form>
      </PageLayout>
    </MainLayout>
  );
};

export const getServerSideProps = withAuth(async (context) => {
  return {
    props: {},
  };
});

export default AllBanner;
