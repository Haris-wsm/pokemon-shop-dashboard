import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
// import "react-multi-carousel/lib/styles.css";

import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { useRouter } from "next/router";
import CouroselGallery from "../CouroselGallery";

const ViewProduct = ({ product }) => {
  const getImageBaseURL = (path) =>
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}${path}`;

  const router = useRouter();
  const { id } = router.query;

  const redirectTo = (url) => {
    router.push(url);
  };

  return (
    <Box>
      {/* <Box className="xs:w-[100%] md:w-[90%] lg:w-4/5 mx-auto px-5 md:px-0"> */}
      <Box className="flex items-center gap-4 border-gray-300 rounded-md border w-fit px-2 py-2 mb-5 mx-auto text-slate-500">
        <Box
          className="cursor-pointer hover:text-slate-700 flex items-center gap-2 group"
          onClick={() => redirectTo(`/products/edit/${id}`)}
        >
          <AutoFixHighIcon
            fontSize="small"
            className="group-hover:animate-bounce transition"
          />
          <Typography className="text-xs  ">แก้ไขสินค้า</Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box
          className="cursor-pointer hover:text-slate-700 flex items-center gap-2 group"
          onClick={() => redirectTo(`/products/edit/code/${id}`)}
        >
          <QrCodeIcon
            fontSize="small"
            className="group-hover:animate-bounce transition"
          />
          <Typography className="text-xs ">แก้ไขรหัสโค้ด</Typography>
        </Box>
      </Box>
      <Divider className="mb-10 w-1/2 mx-auto" />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <Box className="flex flex-col justify-center items-center my-5">
            <Image
              src={getImageBaseURL(product.image)}
              alt="product-title"
              width={200}
              height={200}
              priority
            />
            <Typography className="text-slate-600 text-sm my-5">
              รูปภาพปก
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box className="my-5 relative mx-10 md:mx-0">
            <Box className="w-[350px] md:w-[450px] mx-auto">
              <CouroselGallery gallery={product.gallery} />
            </Box>
            <Typography className="text-slate-600 text-sm text-center my-5">
              รูปภาพแกลลอรี่
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider className="my-5" />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <Card className="mt-5">
            <CardHeader
              title={
                <Typography className="text-md text-white">
                  ข้อมูลทั่วไป
                </Typography>
              }
              className="bg-main"
            />

            <CardContent className="py-10 px-10">
              <Box className="flex mb-4 border-dotted border-b-2 border-gray-300 pb-4">
                <Typography className="min-w-[120px] text-slate-600 text-sm">
                  ชื่อ:
                </Typography>
                <Typography className="text-slate-500 text-sm font-semibold">
                  {product.name}
                </Typography>
              </Box>
              <Box className="flex mb-4 items-center  border-dotted border-b-2 border-gray-300 py-4">
                <Typography className="min-w-[120px] text-slate-600 text-sm">
                  ราคา:
                </Typography>
                <Typography className="text-slate-500 text-sm  font-semibold">
                  {product.price}
                </Typography>
              </Box>
              <Box className="flex mb-4 items-center border-dotted border-b-2 border-gray-300 py-4">
                <Typography className="min-w-[120px] text-slate-600 text-sm">
                  ประเภทสินค้า:
                </Typography>
                <Typography className="text-slate-500 text-sm  font-semibold">
                  {product?.category?.name}
                </Typography>
              </Box>
              <Box className="flex mb-4 items-center border-dotted border-b-2 border-gray-300 py-4">
                <Typography className="min-w-[120px] text-slate-600 text-sm">
                  รูปแบบการขาย:
                </Typography>
                <Typography className="text-slate-500 text-sm  font-semibold">
                  {product.isSetPackage ? "ขายเป็นแพ็ค" : "ขายเป็นรายชิ้น"}
                </Typography>
              </Box>
              <Box className="flex mb-4 items-center border-dotted border-b-2 border-gray-300 py-4">
                <Typography className="min-w-[120px] text-slate-600 text-sm">
                  สินค้า Sale:
                </Typography>
                <Typography className="text-slate-500 text-sm  font-semibold">
                  {product.sale ? "ใช่" : "ไม่"}
                </Typography>
              </Box>
              <Box className="flex items-center my-8 border-dotted border-b-2 border-gray-300 pb-4 ">
                <Typography className="min-w-[120px] text-slate-600 text-sm">
                  ส่วนลด:
                </Typography>
                <Typography className="text-slate-500 text-sm  font-semibold">
                  {product.discount} บาท
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Card className="mt-5">
            <CardHeader
              title={
                <Typography className="text-md text-white">
                  รายละเอียด Code สินค้า
                </Typography>
              }
              className="bg-main"
            />
            <CardContent className="py-10 pl-10">
              <Box className="flex mb-8 border-dotted border-b-2 border-gray-300 pb-4">
                <Typography className="min-w-[120px] text-slate-600 text-sm">
                  ทั้งหมด:
                </Typography>
                <Typography className="text-slate-500 font-semibold text-sm">
                  {product.used + product.unused}
                </Typography>
              </Box>
              <Box className="flex mb-8 border-dotted border-b-2 border-gray-300 pb-4">
                <Typography className="min-w-[120px] text-slate-600 text-sm">
                  ถูกซื้อไป:
                </Typography>
                <Typography className="text-slate-500 font-semibold text-sm">
                  {product.used}
                </Typography>
              </Box>
              <Box className="flex mb-8 border-dotted border-b-2 border-gray-300 pb-4">
                <Typography className="min-w-[120px] text-slate-600 text-sm">
                  คงเหลือ:
                </Typography>
                <Typography className="text-slate-500 font-semibold text-sm">
                  {product.unused}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box className="my-10">
        <Card className="mt-5">
          <CardHeader
            title={
              <Typography className="text-md text-white">
                คำอธิบายสินค้า
              </Typography>
            }
            className="bg-main"
          />
          <CardContent className="py-10 pl-10">
            <div dangerouslySetInnerHTML={{ __html: product.desc }} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ViewProduct;
