"use client";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  List,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import Papa from "papaparse";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import TerminalIcon from "@mui/icons-material/Terminal";

import React, { useEffect, useState } from "react";
import SingleFileUpload from "../ui/DropImageFile/SingleFileUpload";
import MultipleFileUpload from "../ui/DropImageFile/MultipleFileUpload";
import { Controller, useForm } from "react-hook-form";
import schema from "@/util/validator/products/add";
import { yupResolver } from "@hookform/resolvers/yup";
import dynamic from "next/dynamic";
import ApiReq from "@/util/axios";
import Link from "next/link";
import { toast } from "react-toastify";
import CustomModal from "../ui/Modal";
const Editor = dynamic(import("../ui/DropImageFile/EditorQuill"), {
  ssr: false,
});

const typeProduct = [
  { name: "แพ็คเก็จ", isSetPackage: true },
  { name: "รายชิ้น", isSetPackage: false },
];

const status = ["in-stock", "out-stock"];

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [productType, setProductType] = useState("");
  const [productStatus, setProductStatus] = useState("in-stock");
  const [productPromotion, setProductPromotion] = useState(false);
  const [productPromotionPrice, setProductPromotionPrice] = useState(0);

  // Images
  const [imageTitle, setImageTitle] = useState([]);
  const [imageGallery, setImageGallery] = useState([]);

  // Button Loadding

  const [loading, setLoading] = useState(false);

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setProductType(value);
  };

  // File CSV
  const [codes, setCodes] = useState([]);
  const [files, setFiles] = useState(null);

  // Modal
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleUploadFile = (e) => {
    const { files } = e.target;
    setFiles(files[0]);

    const reader = new FileReader();

    reader.onload = (e) => {
      const parsed = parseCSVFile(e);

      // Check if CSV only has one column and its name is "code"
      const headers = parsed.meta.fields;
      if (isValidFileFormat(headers)) {
        const data = parsed.data;
        // Remove the last column from array that was have default value to ''
        data.pop();
        const allCode = data.map((c) => ({ code: Object.values(c)[0] }));
        setCodes(allCode);
      } else {
        toast.error("รูปแบบไฟล์ไม่ถูกต้อง");
      }
    };

    reader.readAsText(files[0]);
    e.target.value = null;
  };

  const isValidFileFormat = (headers) => {
    return headers.length === 1;
  };

  const parseCSVFile = (e) => {
    const text = e.target.result;
    const parsed = Papa.parse(text, { header: true });

    return parsed;
  };

  // Editor
  const [text, setText] = useState("");
  const handleTextChange = (content, delta, source, editor) => {
    setText(content);
  };

  // Categories
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const getCategories = async () => {
    try {
      const res = await ApiReq.get("/api/categories");

      if (res.data.ok) {
        setCategories(res.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCategories();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const titleImage = await uploadImageTitle(data.titleImage[0].file);
      const galleryImages = await uploadImageGallery(data.gallery);

      const payload = {
        name: data.name,
        price: data.price,
        status: data.status,
        inStock: data.stock,
        isSetPackage: false,
        ref_category: data.category,
        sale: data.promotionSale,
        discount: data.promotionPrice,
        image: titleImage,
        gallery: galleryImages,
        desc: text,
        codes: codes,
      };

      const res = await ApiReq.post("/api/products", payload);

      toast.success(res.data.message);
      resetForm();
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("เกิดข้อผิดพลาด");
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProductType("");
    setProductStatus("in-stock");
    setProductPromotion(false);
    setProductPromotionPrice(0);
    setImageTitle([]);
    setImageGallery([]);
    setText("");
    setCategory("");
    setValue("name", "");
    setValue("price", "");
    setCodes([]);
    window.scrollTo(0, 0);
  };

  const uploadImageTitle = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await ApiReq.post("/api/upload/product/title", formData);

      return res.data.url;
    } catch (error) {}
  };

  const uploadImageGallery = async (files) => {
    const formData = new FormData();

    files.forEach((content) => {
      formData.append("images", content.file);
    });

    const res = await ApiReq.post("/api/upload/product/gallery", formData);
    return res.data.url;
  };

  const isError = (field) => (Boolean(field) ? true : false);

  // const getHTML = () => {
  //   return <div dangerouslySetInnerHTML={{ __html: text }} />;
  // };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4} className="mt-2">
          <Grid item xs={12} md={6} className="px-5">
            <Typography className="text-xl mb-10">รายละเอียดสินค้า</Typography>
            <Box className="flex mb-6">
              <Typography className="w-[150px] text-slate-500 text-sm">
                ชื่อ:
              </Typography>
              <TextField
                {...register("name")}
                error={isError(errors.name)}
                helperText={errors.name?.message}
                fullWidth
                placeholder="ชื่อสินค้า"
                size="small"
                name="name"
                InputProps={{
                  endAdornment: (
                    <Typography className="text-red-500 text-xl">*</Typography>
                  ),
                }}
              />
            </Box>
            <Box className="flex mb-6">
              <Typography className="w-[150px] text-slate-500 text-sm">
                ราคา:
              </Typography>
              <TextField
                fullWidth
                {...register("price")}
                error={isError(errors.price)}
                helperText={errors.price?.message}
                placeholder="ราคาสินค้า"
                size="small"
                name="price"
                // type="number"
                InputProps={{
                  endAdornment: (
                    <Typography className="text-red-500 text-xl">*</Typography>
                  ),
                }}
              />
            </Box>
            <Box className="flex mb-6">
              <Typography className="w-[150px] text-slate-500 text-sm">
                สถานะ:
              </Typography>

              <FormControl
                sx={{ minWidth: 120 }}
                size="small"
                fullWidth
                error={isError(errors.status)}
              >
                <Controller
                  name="status"
                  control={control}
                  defaultValue={productStatus}
                  render={({ field: { onChange } }) => (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={productStatus}
                      onChange={(e) => {
                        const { value } = e.target;
                        onChange(value);
                        setProductStatus(value);
                        if (value !== "in-stock") {
                          setValue("stock", 0);
                          clearErrors("stock");
                        }
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>None</em>
                      </MenuItem>

                      {status.map((st, i) => (
                        <MenuItem value={st} key={i}>
                          {st}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.status?.message}</FormHelperText>
              </FormControl>
            </Box>
            <Box className="flex mb-6 flex-wrap">
              <Typography className="w-[113px] text-slate-500 text-sm">
                รหัสโค้ด:
              </Typography>
              <Box className="flex gap-3 justify-center items-center">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept=".csv"
                    type="file"
                    onChange={handleUploadFile}
                  />

                  <AttachFileIcon />
                </IconButton>
                <Typography
                  noWrap
                  className="text-xs text-gray-600 max-w-[150px]"
                >
                  {files?.name ?? "คลิ๊กอัปโหลดไฟล์ csv"}
                </Typography>
                {codes.length > 0 && (
                  <Tooltip title="เรียกดูรายการโค้ดทั้งหมด">
                    <Typography
                      className="text-slate-700 text-xs ml-4 underline cursor-pointer"
                      onClick={handleOpen}
                    >
                      เรียกกดู
                    </Typography>
                  </Tooltip>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} className="px-5">
            <Typography className="text-xl mb-10 ">
              รายละเอียดเพิ่มเติม
            </Typography>
            {/* <Box className="flex mb-6">
              <Typography className="w-[150px] text-slate-500 text-sm">
                รูปแบบการขาย:
              </Typography>

              <FormControl
                sx={{ m: 1, minWidth: 120 }}
                size="small"
                fullWidth
                error={isError(errors.type)}
                {...register("type")}
              >
                <Controller
                  name="type"
                  control={control}
                  defaultValue={productType}
                  render={({ field: { onChange } }) => (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={productType}
                      onChange={(e) => {
                        const { value } = e.target;
                        onChange(value);
                        handleSelectChange(e);
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>None</em>
                      </MenuItem>

                      {typeProduct.map((type, i) => (
                        <MenuItem value={type.isSetPackage} key={i}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.type?.message}</FormHelperText>
              </FormControl>
            </Box> */}
            <Box className="flex mb-6">
              <Typography className="w-[150px] text-slate-500 text-sm">
                ประเภทสินค้า:
              </Typography>
              <FormControl
                sx={{ m: 1, minWidth: 120 }}
                size="small"
                fullWidth
                error={isError(errors.category)}
                {...register("category")}
              >
                <Controller
                  name="category"
                  control={control}
                  defaultValue={category}
                  render={({ field: { onChange } }) => (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      onChange={(e) => {
                        const { value } = e.target;
                        onChange(value);
                        setCategory(value);
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>None</em>
                      </MenuItem>

                      {categories?.map((cat, i) => (
                        <MenuItem value={cat._id} key={i}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                <FormHelperText>{errors.category?.message}</FormHelperText>
                <Box className="flex justify-end pt-2">
                  <Link
                    href="/products/catergories"
                    className="text-slate-500 text-sm"
                  >
                    <Typography className="text-xs ">
                      เพิ่มประเภทสินค้าใหม่
                    </Typography>
                  </Link>
                </Box>
              </FormControl>
            </Box>
            <Box className="flex mb-6">
              <Typography className="w-[150px] text-slate-500 text-sm">
                สินค้า Sale:
              </Typography>
              <FormControl error={errors.promotion}>
                <Controller
                  name="promotionSale"
                  control={control}
                  defaultValue={productPromotion}
                  render={({ field: { onChange } }) => (
                    <FormControlLabel
                      control={<Switch />}
                      label={productPromotion ? "" : "เปิดโปรโมชั่น"}
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: "14px",
                        },
                      }}
                      onChange={(e) => {
                        setProductPromotion(e.target.checked);
                        onChange(e.target.checked);

                        if (e.target.checked === false) {
                          clearErrors("promotionPrice");
                        }
                      }}
                      checked={productPromotion}
                    />
                  )}
                />
              </FormControl>
            </Box>
            <Box className="flex mb-6">
              <Typography className="w-[150px] text-slate-500 text-sm">
                จำนวนส่วนลด:
              </Typography>
              <TextField
                {...register("promotionPrice")}
                error={errors.promotionPrice}
                helperText={errors.promotionPrice?.message}
                value={productPromotionPrice}
                onChange={(e) => setProductPromotionPrice(e.target.value)}
                fullWidth
                placeholder="จำนวนส่วนลด"
                size="small"
                type="number"
                name="stock"
              />
            </Box>
          </Grid>
        </Grid>
        <Divider className="my-10" />
        <Typography className="text-xl"> รูปภาพ</Typography>
        <Grid container spacing={4} className="mt-5">
          <Grid item md={6}>
            <Typography className="text-md mb-2 text-slate-500 text-sm">
              Title
            </Typography>
            <Box>
              <Controller
                name="titleImage"
                control={control}
                value={imageTitle}
                render={({ field: { onChange } }) => (
                  <SingleFileUpload
                    onChange={onChange}
                    setFiles={setImageTitle}
                    imageTitle={imageTitle}
                    error={Boolean(errors.titleImage?.message)}
                  />
                )}
              />

              <FormHelperText className="text-red-500 px-3 py-2">
                {errors.titleImage?.message}
              </FormHelperText>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Typography className="text-md mb-2 text-slate-500 text-sm">
              Gallery
            </Typography>
            <Box>
              <Controller
                name="gallery"
                control={control}
                value={imageGallery}
                render={({ field: { onChange } }) => (
                  <MultipleFileUpload
                    onChange={onChange}
                    setFiles={setImageGallery}
                    imageGallery={imageGallery}
                    error={Boolean(errors.gallery?.message)}
                  />
                )}
              />

              <FormHelperText className="text-red-500 px-3 py-2">
                {errors.gallery?.message}
              </FormHelperText>
            </Box>
          </Grid>
        </Grid>
        <Divider className="my-10" />

        <Box className="my-10">
          <Typography className="text-md mb-2 text-slate-500 text-sm">
            Description
          </Typography>
          <Editor
            handleTextChange={handleTextChange}
            text={text}
            uploadURL={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/upload/editor/product`}
          />
        </Box>
        <Box className="my-10 flex justify-end">
          <Button
            size="large"
            className="bg-red-400 hover:bg-red-500 text-white w-full md:w-[20%] mx-0 md:mx-auto"
            type="submit"
            disabled={loading}
          >
            {loading && (
              <CircularProgress size={24} className="mx-3 text-slate-200" />
            )}
            {loading ? "Loading" : " เพิ่มสินค้า!"}
            {/* เพิ่มสินค้า! */}
          </Button>
        </Box>
      </form>
      <CustomModal
        title={`รหัสโค้ด [ ${codes.length} ]`}
        handleClose={handleClose}
        open={open}
        sx={{ width: 800 }}
      >
        <Box className="py-5">
          {/* {JSON.stringify(codes)} */}
          {codes.map(({ code }, i) => (
            <List key={i} className="flex text-sm">
              <ListItemAvatar>
                <Avatar sizes="small">
                  <TerminalIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={code} />
            </List>
          ))}
        </Box>
      </CustomModal>
    </Box>
  );
};

export default AddProductForm;
