import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import NoRowOverlay from "../blog/NoRowOverlay";
import dayjs from "dayjs";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import { useRouter } from "next/router";
import CustomModal from "../ui/Modal";
import { toast } from "react-toastify";
import ApiReq from "@/util/axios";

const ProductTable = (props) => {
  const centerContent = (value) => (
    <Box className="my-3 flex justify-center w-full">
      <Typography className="text-xs text-slate-600">{value}</Typography>
    </Box>
  );
  const columns = useMemo(() => [
    {
      field: "image",
      headerName: "รูป",
      headerAlign: "center",
      minWidth: 220,
      renderCell: (params) => {
        const { image } = params.row;
        const imageUrl = process.env.NEXT_PUBLIC_BACKEND_DOMAIN + image;

        return (
          <Box className="my-3 flex justify-center w-full">
            <Image
              priority
              src={imageUrl}
              width={250}
              height={100}
              style={{ objectFit: "cover" }}
              alt="image-product"
            />
          </Box>
        );
      },
    },
    {
      field: "productName",
      headerName: "ชื่อสินค้า",
      headerAlign: "center",
      minWidth: 220,
      renderCell: (params) => {
        const { productName } = params.row;
        return centerContent(productName);
      },
    },
    {
      field: "category",
      headerName: "ประเภทสินค้า",
      headerAlign: "center",
      minWidth: 220,
      renderCell: (params) => {
        const { category } = params.row;
        return centerContent(category);
      },
    },
    {
      field: "totalCode",
      headerName: "จำนวนรหัส",
      headerAlign: "center",
      minWidth: 220,
      renderCell: (params) => {
        const { totalCode } = params.row;
        return centerContent(totalCode);
      },
    },
    {
      field: "updatedAt",
      headerName: "แก้ไขล่าสุด",
      headerAlign: "center",
      minWidth: 220,
      renderCell: (params) => {
        const { updatedAt } = params.row;

        return centerContent(dayjs(updatedAt).format("DD-MM-YYYY HH:mm"));
      },
    },
    {
      field: "actions",
      headerName: "",
      headerAlign: "center",
      minWidth: 220,
      renderCell: (params) => {
        const { _id: productId } = params.row;
        return (
          <Box className="my-3 flex gap-5 justify-center w-full">
            <Tooltip title="เรียกดู">
              <IconButton
                className="text-main"
                onClick={() => handleRedirectTo(productId)}
              >
                <ManageSearchIcon className="text-main" />
              </IconButton>
            </Tooltip>
            <Tooltip title="ลบออก">
              <IconButton
                className="text-slate-700"
                onClick={() => handleSetId(productId)}
              >
                <DeleteSweepTwoToneIcon className="text-slate-700" />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ]);

  const router = useRouter();

  const handleRedirectTo = (id) => {
    router.push(`/products/${id}`);
  };

  // Delete
  const [productId, setProductId] = useState(null);

  // Modal
  const [open, setOpen] = useState(false);

  const handleSetId = (id) => {
    setProductId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteProduct = async () => {
    try {
      await ApiReq.delete(`/api/products/${productId}`);
      toast.success("ลบข้อมูลสำเร็จ");
      setOpen(false);
      router.push("/products/all");
    } catch (error) {
      console.log(error);
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  return (
    <>
      <Box>
        <DataGrid
          autoHeight
          columns={columns}
          rows={props.products}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
          }}
          pageSizeOptions={[25, 50, 100]}
          getRowId={(row) => row._id}
          getRowHeight={() => "auto"}
          components={{
            NoRowsOverlay: NoRowOverlay,
          }}
        />
      </Box>
      <CustomModal title="ลบสินค้า" handleClose={handleClose} open={open}>
        <Box className="mt-10 mb-5 flex gap-5 justify-center">
          <Button
            className="bg-red-400 hover:bg-red-500 text-white"
            onClick={() => handleDeleteProduct()}
          >
            ยืนยัน
          </Button>
          <Button
            className="bg-slate-600 hover:bg-slate-700 text-white"
            onClick={() => {
              setOpen(false);
            }}
          >
            ยกเลิก
          </Button>
        </Box>
      </CustomModal>
    </>
  );
};

export default ProductTable;
