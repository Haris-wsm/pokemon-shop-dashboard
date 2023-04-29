import React, { useState } from "react";
import SingleFileUpload from "@/components/ui/DropImageFile/SingleFileUpload";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import BlogEditor from "./BlogEditor";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import schema from "@/util/validator/blog/add";
import ApiReq from "@/util/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Form = () => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isPublish, setIsPublish] = useState(true);
  const [text, setText] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleChangeTitle = (e) => {
    const { value } = e.target;
    setTitle(value);
    handleSetSlug(value);
  };

  const handleSetSlug = (c) => {
    const text = c.replaceAll("/", "").replaceAll(" ", "-");

    setSlug(text);
  };

  const onSubmit = async (data) => {
    try {
      const { url } = await uploadImageTitle(data.titleImage[0].file);

      const payload = {
        image: url,
        title: data.title,
        slug: slug,
        publish: data.publish,
        rawHtml: text,
      };

      await ApiReq.post("/api/blog", payload);
      toast.success("เพิ่มบล็อกใหม่สำเร็จ");
      router.push("/blog/view");
    } catch (error) {
      toast.error(error.response?.data?.message || "เกิดข้อผิดพลาด");
    }
  };

  const uploadImageTitle = async (file) => {
    const formData = new FormData();

    formData.append("image", file);
    const response = await ApiReq.post("/api/upload/blog/title", formData);

    return response.data;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={6} className="my-5">
          <Box className="py-2">
            <Typography className="text-slate-500 my-3 text-sm">
              รูปภาพหลัก
            </Typography>
            <FormControl
              error={Boolean(errors.titleImage)}
              {...register("titleImage")}
              fullWidth
            >
              <Controller
                name="titleImage"
                control={control}
                value={files}
                render={({ field: { onChange } }) => (
                  <SingleFileUpload
                    onChange={onChange}
                    imageTitle={files}
                    setFiles={setFiles}
                    error={Boolean(errors.titleImage?.message)}
                  />
                )}
              />
              <FormHelperText className="text-red-500 px-3 py-2">
                {errors.titleImage?.message}
              </FormHelperText>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} className=" py-2">
          <Box className="pl-5 mb-5 mt-10">
            <Box className="flex  flex-col mt-[4.5em] mb-2">
              <Typography className="text-slate-500 my-3 text-sm  w-[120px]">
                หัววข้อเรื่อง
              </Typography>
              <TextField
                name="title"
                {...register("title")}
                placeholder="Title Name"
                size="small"
                fullWidth
                className="w-full md:w-4/5"
                value={title}
                onChange={handleChangeTitle}
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
              />
            </Box>
            <Box className="flex flex-col mb-2">
              <Typography className="text-slate-500 my-3 text-sm  w-[120px]">
                Slug
              </Typography>
              <TextField
                placeholder="Slug for blog url"
                size="small"
                fullWidth
                className="w-full md:w-4/5"
                value={slug}
                readOnly
                disabled
              />
            </Box>
            <Box className="flex gap-3 flex-wrap items-center ">
              <Typography className="text-slate-500 my-3 text-sm w-[120px]">
                เผยแพร่สาธารณะ
              </Typography>
              <FormControl {...register("publish")}>
                <Controller
                  name="publish"
                  control={control}
                  value={isPublish}
                  render={({ field: { onChange } }) => (
                    <FormControlLabel
                      control={<Switch checked={isPublish} />}
                      onChange={(e) => {
                        setIsPublish(e.target.checked);
                        onChange(e.target.checked);
                      }}
                    />
                  )}
                />
              </FormControl>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Divider className="my-5" />
      <BlogEditor setText={setText} hiddenButton />
      <Button type="submit">บันทึกสร้าง</Button>
    </form>
  );
};

export default Form;
