import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import NoRowOverlay from "../blog/NoRowOverlay";
import clsx from "clsx";
import dayjs from "dayjs";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { DataGrid } from "@mui/x-data-grid";
import CustomModal from "../ui/Modal";
import { toast } from "react-toastify";
import ApiReq from "@/util/axios";

const searchingType = ["สถานะ", "รหัสโค้ด", "วันที่เพิ่ม", "ทั้งหมด"];

const CodeTable = ({ codes: codesData }) => {
  // Colums

  const columns = useMemo(
    () => [
      {
        field: "code",
        minWidth: 250,
        headerName: "รหัสโค้ด",
        headerAlign: "center",
        renderCell: (params) => (
          <Box className="w-full">
            <Typography noWrap className="text-xs text-slate-600">
              {params.row.code}
            </Typography>
          </Box>
        ),
      },
      {
        field: "status",
        minWidth: 250,
        headerName: "สถานะ",
        headerAlign: "center",
        renderCell: (params) => {
          const { status } = params.row;

          return (
            <Box className="w-full flex justify-center">
              <Chip
                label={params.row.status}
                className={clsx({
                  ["text-white "]: true,
                  ["bg-main"]: status === "unused",
                  ["bg-red-500"]: status === "used",
                })}
              />
            </Box>
          );
        },
      },
      {
        field: "createdAt",
        minWidth: 250,
        headerName: "เพิ่มเมื่อ",
        headerAlign: "center",
        renderCell: (params) => {
          const { createdAt } = params.row;

          return (
            <Box className="w-full flex justify-center">
              <Typography className="text-xs text-slate-600">
                {dayjs(createdAt).format("DD-MM-YYYY")}
              </Typography>
            </Box>
          );
        },
      },
      {
        field: "actions",
        minWidth: 250,
        headerName: "",
        headerAlign: "center",
        renderCell: (params) => (
          <Box className="w-full flex gap-5 justify-center">
            <Tooltip title="แก้ไข">
              <EditTwoToneIcon
                className="cursor-pointer text-main"
                fontSize="small"
                onClick={() => handleGetEditData(params.row)}
              />
            </Tooltip>
            <Tooltip title="ลบออก">
              <DeleteSweepTwoToneIcon
                className="cursor-pointer "
                onClick={() => handleGetDeleteId(params.row._id)}
                fontSize="small"
              />
            </Tooltip>
          </Box>
        ),
      },
    ],
    []
  );
  const [codes, setCodes] = useState(codesData);
  const [search, setSearch] = useState("รหัสโค้ด");
  const [searchInput, setSearchInput] = useState("");

  // Modal
  const [openModalDel, setOpenModalDel] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [deleteId, setDeleteId] = useState("");
  const [editCode, setEditCode] = useState(null);

  const handleGetDeleteId = (id) => {
    setDeleteId(id);
    setOpenModalDel(true);
  };
  const handleGetEditData = (data) => {
    setEditCode(data);
    setOpenModalEdit(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCode((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteCode = async () => {
    try {
      await ApiReq.delete(`/api/products/code/${deleteId}`);
      setCodes(codes.filter((code) => code._id !== deleteId));
      toast.success("ลบข้อมูลสำเร็จ");
      setOpenModalDel(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response.data?.message || "เกิดข้อผิดพลาด");
    }
  };

  const handleEditCode = async () => {
    try {
      await ApiReq.put(`/api/products/code/${editCode._id}`);

      setCodes(codes.filter((code) => code._id !== deleteId));
      const updateCode = codes.find((code) => code._id === editCode._id);
      updateCode.code = editCode.code;
      toast.success("แก้ไขข้อมูลสำเร็จ");
      setOpenModalEdit(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response.data?.message || "เกิดข้อผิดพลาด");
    }
  };

  const handleSelectSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSearch = () => {
    let filteredCodes = codesData;

    if (search === "รหัสโค้ด" && searchInput !== "") {
      filteredCodes = filteredCodes.filter((code) =>
        code.code.includes(searchInput)
      );
    } else if (search === "สถานะ" && searchInput !== "") {
      filteredCodes = filteredCodes.filter(
        (code) => code.status === searchInput
      );
    } else if (search === "วันที่เพิ่ม" && searchInput !== "") {
      filteredCodes = filteredCodes.filter(
        (code) => dayjs(code.createdAt).format("DD-MM-YYYY") === searchInput
      );
    }

    setCodes(filteredCodes);
  };
  return (
    <Box className="mt-10">
      <Typography className="text-md px-5">รหัสทั้งหมด</Typography>
      <Divider className="my-3 w-4/5" />

      {/* Searching */}
      <Box className="my-10 flex gap-5">
        <TextField
          size="small"
          placeholder="ค้นหา"
          InputProps={{
            style: {
              fontSize: "14px",
            },
          }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <FormControl>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select-search"
            value={search}
            onChange={handleSelectSearch}
            size="small"
            className="min-w-[220px] text-sm"
          >
            {searchingType.map((type, i) => (
              <MenuItem key={i} value={type} className="text-sm">
                {type}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>เลือกประเภทการค้นหา</FormHelperText>
        </FormControl>
        <Box>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={handleSearch}
          >
            ค้นหา
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <Box className="my-10">
        <DataGrid
          columns={columns}
          rows={codes}
          autoHeight
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
          }}
          pageSizeOptions={[25, 50, 100]}
          getRowId={(row) => row._id}
          components={{
            NoRowsOverlay: NoRowOverlay,
          }}
        />
      </Box>

      {/* Modal Delete */}
      <CustomModal
        title="ต้องการการลบโค้ดนี้"
        open={openModalDel}
        handleClose={() => {
          setOpenModalDel(false);
        }}
      >
        <Box className="mt-10 mb-5 flex gap-5 justify-center">
          <Button
            className="bg-red-400 hover:bg-red-500 text-white"
            onClick={() => handleDeleteCode()}
          >
            ยืนยัน
          </Button>
          <Button
            className="bg-slate-600 hover:bg-slate-700 text-white"
            onClick={() => {
              setOpenModalDel(false);
            }}
          >
            ยกเลิก
          </Button>
        </Box>
      </CustomModal>

      {/* Modal Edit */}
      <CustomModal
        title="แก้ไขข้อมูล"
        open={openModalEdit}
        handleClose={() => {
          setOpenModalEdit(false);
        }}
        sx={{ width: 700 }}
      >
        <Box className="py-5">
          <Box className="space-y-3">
            <Typography className="text-xs text-slate-700">รหัสโค้ด</Typography>
            <TextField
              id="outlined-textarea"
              placeholder="Placeholder"
              multiline
              value={editCode?.code || ""}
              fullWidth
              InputProps={{ style: { fontSize: "14px" } }}
              name="code"
              onChange={handleEditChange}
            />
          </Box>
          <Box className="mt-10 mb-5 flex gap-5 justify-center">
            <Button
              className="bg-red-400 hover:bg-red-500 text-white"
              onClick={() => handleEditCode()}
            >
              ยืนยัน
            </Button>
            <Button
              className="bg-slate-600 hover:bg-slate-700 text-white"
              onClick={() => {
                setOpenModalEdit(false);
              }}
            >
              ยกเลิก
            </Button>
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default CodeTable;
