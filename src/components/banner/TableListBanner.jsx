import React, { useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import dayjs from "dayjs";

import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import ApiReq from "@/util/axios";
import { toast } from "react-toastify";
import Modal from "../ui/Modal";

const TableListBanner = ({ banners }) => {
  const [localBanners, setLocalBanners] = useState(banners || []);

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "รูปภาพ",
        headerAlign: "center",
        width: 700,
        // flex: 2,
        renderCell: (params) => {
          const { image } = params.row;
          const bannerImageUrl = process.env.NEXT_PUBLIC_BACKEND_DOMAIN + image;
          return (
            <Box className="my-3 mx-auto pl-5 cursor-pointer">
              <Image
                priority
                src={bannerImageUrl}
                width={300}
                height={100}
                style={{ objectFit: "cover" }}
                alt="image-banner"
              />
            </Box>
          );
        },
      },
      {
        field: "createdAt",
        headerName: "วันที่เพิ่ม",
        width: 180,
        // flex: 1,

        renderCell: (params) => {
          const { createdAt } = params.row;

          return (
            <Typography className="text-slate-700 text-xs">
              {dayjs(createdAt).format("DD-MM-YYYY")}
            </Typography>
          );
        },
      },
      {
        field: "actions",
        headerName: "",
        width: 180,
        // flex: 1,
        align: "center",
        renderCell: (params) => (
          <Box>
            <Tooltip title="ลบออก">
              <IconButton
                className="text-red-500"
                onClick={() => handleOpenModleDelete(params.row._id)}
              >
                <DeleteSweepIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    []
  );

  const handleDelete = async () => {
    try {
      const res = await ApiReq.delete(`/api/banner/${deleteId}`);
      toast.success(res.data.message);

      const response = await ApiReq.get("/api/banner");
      setLocalBanners(response.data.data);
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data.message || "เกิดข้อผิดพลาด");
    }
  };

  const handleOpenModleDelete = (id) => {
    handleOpen();
    setDeleteId(id);
  };

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [deleteId, setDeleteId] = React.useState(null);

  return (
    <Box className="w-full md:w-4/5 mx-auto">
      <Box className="w-full h-[650px]">
        <DataGrid
          autoHeight
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          columns={columns}
          rows={localBanners}
          getRowId={(row) => row._id}
          getRowHeight={() => "auto"}
        />
      </Box>
      <Modal open={open} handleClose={handleClose} title="ลบรูปภาพ Banner">
        <Box className="flex gap-5 justify-center mt-10 mb-5">
          <Button
            className="bg-red-400 hover:bg-red-500 text-white"
            onClick={handleDelete}
          >
            ยืนยัน
          </Button>
          <Button
            className="bg-slate-600 hover:bg-slate-700 text-white"
            onClick={handleClose}
          >
            ยกเลิก
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default TableListBanner;
