import React, { useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, TextField, Typography } from "@mui/material";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import CustomModal from "../ui/Modal";
import { toast } from "react-toastify";
import ApiReq from "@/util/axios";
import { useRouter } from "next/router";

const TableCategory = (props) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  // Category
  const [category, setCategory] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDel = () => {
    setOpenDel(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!isValidUpdate()) {
      toast.error("กรุณาป้อนข้อมูล");
      return;
    }
    try {
      await ApiReq.put(`api/categories/${category._id}`, {
        name: category.name,
      });
      toast.success("แก้ไขสำเร็จ");
      setOpen(false);
      router.push("/products/catergories");
    } catch (error) {
      toast.error(error?.response?.data.message || "เกิดข้อผิดพลาด");
    }
  };

  const handleDeleteCat = async () => {
    try {
      await ApiReq.delete(`api/categories/${category._id}`);
      toast.success("ลบสำเร็จ");
      setOpenDel(false);
      router.push("/products/catergories");
    } catch (error) {
      toast.error(error?.response?.data.message || "เกิดข้อผิดพลาด");
    }
  };

  const isValidUpdate = () => {
    if (category.name === "") return false;

    return true;
  };

  const getActionButtons = (params) => (
    <Box className="flex gap-5">
      <Button
        size="small"
        endIcon={<CreateTwoToneIcon />}
        onClick={() => selectCategory(params.row)}
      >
        แก้ไข
      </Button>
      <Button
        className="text-slate-700 "
        size="small"
        endIcon={<DeleteTwoToneIcon />}
        onClick={() => selectCategory(params.row, "delete")}
      >
        ลบ
      </Button>
    </Box>
  );

  const columns = useMemo(
    () => [
      {
        field: "_id",
        headerName: "หมายเลขไอดี",
        flex: 1,
        renderCell: (params) => (
          <Typography className="text-slate-600 text-xs">
            {params.row._id}
          </Typography>
        ),
      },
      {
        field: "name",
        headerName: "ชื่อประเภท",
        flex: 2,
        renderCell: (params) => (
          <Typography className="text-slate-600 text-xs">
            {params.row.name}
          </Typography>
        ),
      },
      {
        field: "actions",
        headerName: "",
        flex: 1,
        renderCell: getActionButtons,
      },
    ],
    []
  );

  const selectCategory = (cat, type = "edit") => {
    setCategory(cat);

    type === "edit" ? setOpen(true) : setOpenDel(true);
  };

  return (
    <Box>
      <Box className="w-4/5 mx-auto">
        <Box className="flex my-10 gap-3 items-center justify-center">
          <Typography className="text-xl  text-slate-600 underline underline-offset-2 ">
            ราการทั้งหมด
          </Typography>
        </Box>
        <Box className="w-full h-[500px]">
          <DataGrid
            columns={columns}
            autoHeight
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            rows={props.data}
            getRowId={(row) => row._id}
          />
        </Box>

        {/* Modal Edit */}
        <CustomModal
          title="แก้ไข"
          handleClose={handleClose}
          open={open}
          sx={{ width: 600 }}
        >
          <Box className="my-10 space-y-3">
            <Typography className="text-slate-700 text-xs">
              ชื่อประเภท
            </Typography>

            <TextField
              name="name"
              size="small"
              fullWidth
              value={category?.name || ""}
              onChange={handleChange}
            />
          </Box>
          <Box className="flex gap-3 justify-evenly pt-10 pb-2">
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => handleUpdate()}
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

        <CustomModal title="ลบออก" open={openDel} handleClose={handleCloseDel}>
          <Box className="flex gap-3 justify-evenly pt-10 pb-2">
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => handleDeleteCat()}
            >
              ยืนยัน
            </Button>
            <Button
              className="bg-slate-700 hover:bg-slate-700 text-white"
              onClick={() => setOpenDel(false)}
            >
              ยกเลิก
            </Button>
          </Box>
        </CustomModal>
      </Box>
    </Box>
  );
};

export default TableCategory;
