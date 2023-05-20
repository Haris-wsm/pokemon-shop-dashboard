import {
  Box,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import PushPinIcon from "@mui/icons-material/PushPin";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ApiReq from "@/util/axios";
import NoRowOverlay from "./NoRowOverlay";
import CustomModal from "../ui/Modal";

const BlogTable = (props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState("");

  // Category

  const [category, setCategory] = useState(null);

  const handleRedirectTo = (url) => {
    router.push(url);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenModal = (slug) => {
    setSlug(slug);
    setOpen(true);
  };

  const handleDeleteBlog = async (slug) => {
    try {
      await ApiReq.delete(`/api/blog/${slug}`);

      toast.success("ลบบล็อกสำเร็จ");
      handleClose();
      window.location.reload(true);
    } catch (error) {
      toast.error(error.resposne?.data?.message || "เกิดข้อผิดพลาด");
    }
  };

  const columns = useMemo(
    () => [
      {
        field: "title",
        headerName: "หัวข้อเรื่อง",
        headerAlign: "center",
        minWidth: 250,
        renderCell: (params) => {
          const { title } = params.row;
          return (
            <Box className="flex justify-center w-full">
              <Typography noWrap className="text-xs text-slate-700">
                {title}
              </Typography>
            </Box>
          );
        },
      },
      {
        field: "image",
        headerName: "รูปหน้าปก",
        headerAlign: "center",
        minWidth: 250,
        renderCell: (params) => {
          const { image } = params.row;
          const bannerImageUrl = process.env.NEXT_PUBLIC_BACKEND_DOMAIN + image;
          return (
            <Box className="my-3 flex justify-center w-full">
              <Image
                priority
                src={bannerImageUrl}
                width={250}
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
        headerName: "สร้างวันที่",
        headerAlign: "center",
        minWidth: 220,
        renderCell: (params) => {
          const { createdAt } = params.row;
          return (
            <Box className="flex justify-center w-full">
              <Typography className="text-xs text-slate-700 ">
                {dayjs(createdAt).format("DD-MM-YY HH:mm")}
              </Typography>
            </Box>
          );
        },
      },
      {
        field: "updatedAt",
        headerName: "แก้ไขล่าสุด",
        headerAlign: "center",
        minWidth: 220,
        renderCell: (params) => {
          const { updatedAt } = params.row;
          return (
            <Box className="flex justify-center w-full">
              <Typography className="text-xs text-slate-700 ">
                {dayjs(updatedAt).format("DD-MM-YY HH:mm")}
              </Typography>
            </Box>
          );
        },
      },
      {
        field: "pin",
        headerName: "ปักหมุด",
        headerAlign: "center",
        minWidth: 120,
        renderCell: (params) => {
          const { pin } = params.row;

          return (
            <Box className="flex justify-center w-full">
              {pin && (
                <Tooltip title="บล็อกถูกปักหมุด จะแสดงบนหน้าหลัก">
                  <PushPinIcon className="text-red-500" />
                </Tooltip>
              )}
            </Box>
          );
        },
      },
      {
        field: "publish",
        headerName: "สถานะ",
        headerAlign: "center",
        minWidth: 120,
        renderCell: (params) => {
          const { publish } = params.row;

          const labelTitle = publish ? "เผยแพร่" : "ยังไม่เผยแพร่";
          const color = publish ? "text-main" : "text-slate-800";
          return (
            <Box className="flex justify-center w-full">
              <Chip label={labelTitle} className={color} variant="outlined" />
            </Box>
          );
        },
      },
      {
        field: "actions",
        headerName: "",
        headerAlign: "center",
        minWidth: 220,
        renderCell: (params) => {
          const redirectURL = `/blog/edit/${params.row.slug}`;
          return (
            <Box className="flex justify-center gap-5 w-full">
              <Tooltip title="แก้ไขบล็อค">
                <IconButton
                  className="text-main"
                  onClick={() => handleRedirectTo(redirectURL)}
                >
                  <EditTwoToneIcon className="text-main" />
                </IconButton>
              </Tooltip>
              <Tooltip title="ลบบล็อค">
                <IconButton
                  className="text-red-500"
                  onClick={() => {
                    handleOpenModal(params.row.slug);
                    // handleDeleteBlog(params.row.slug);
                  }}
                >
                  <DeleteSweepTwoToneIcon className="text-slate-700" />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    ],
    []
  );
  return (
    <Box className="">
      <DataGrid
        autoHeight
        pageSizeOptions={[5, 10, 25]}
        columns={columns}
        rows={props.blogs}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        getRowId={(row) => row._id}
        getRowHeight={() => "auto"}
        components={{
          NoRowsOverlay: NoRowOverlay,
        }}
      />
      <CustomModal open={open} handleClose={handleClose} title="ลบบล็อก">
        <Box className="flex gap-5 justify-evenly pt-10 pb-2">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={() => handleDeleteBlog(slug)}
          >
            ยืนยัน
          </Button>
          <Button
            className="bg-slate-700 hover:bg-slate-700 text-white"
            onClick={() => setOpen(false)}
          >
            ยกเลิก
          </Button>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default BlogTable;
