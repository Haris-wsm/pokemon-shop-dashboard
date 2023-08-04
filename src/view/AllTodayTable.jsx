import ApiReq from "@/util/axios";
import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

//
const AllTodayTable = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "รูปภาพ",
        headerAlign: "center",

        width: 200,
        renderCell: (params) => {
          const { image } = params.row;
          // for testing
          //   const imageUrl = "https://www.poke-api.online" + image;
          const imageUrl = process.env.NEXT_PUBLIC_BACKEND_DOMAIN + image;

          return (
            <Box className="my-3 mx-auto pl-5 cursor-pointer">
              <Image
                priority
                src={imageUrl}
                width={60}
                height={60}
                style={{ objectFit: "contain", aspectRatio: "1/2" }}
                alt="image-banner"
              />
            </Box>
          );
        },
      },
      {
        field: "productName",
        headerName: "สินค้า",
        headerAlign: "center",
        width: 200,
        renderCell: (params) => {
          const { productName } = params.row;
          return <Typography className="text-xs">{productName}</Typography>;
        },
      },
      {
        field: "total",
        headerName: "จำนวน",
        headerAlign: "center",
        width: 200,
        renderCell: (params) => {
          const { total } = params.row;
          return (
            <Box className="w-full text-center">
              <Typography className="text-xs  text-blue-800">
                {total}
              </Typography>
            </Box>
          );
        },
      },
      {
        field: "totalIncome",
        headerName: "เงินทั้งหมด (บาท)",
        headerAlign: "center",
        width: 200,
        renderCell: (params) => {
          const { totalIncome } = params.row;
          return (
            <Box className="w-full text-center">
              <Typography className="text-xs  text-blue-800">
                {totalIncome}
              </Typography>
            </Box>
          );
        },
      },
    ],
    []
  );

  const getData = async () => {
    try {
      const response = await ApiReq.get("/api/statistic/order/today");

      setOrders(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box className="w-full my-3">
      <Box className="w-full h-auto space-y-3">
        <Typography color="primary">รายการขายวันนี้</Typography>
        <DataGrid
          autoHeight
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          columns={columns}
          rows={orders}
          getRowId={(row) => row._id}
          getRowHeight={() => "auto"}
        />
      </Box>
    </Box>
  );
};

export default AllTodayTable;
