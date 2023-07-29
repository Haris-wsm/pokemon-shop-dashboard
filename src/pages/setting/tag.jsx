import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

import { toast } from "react-toastify";
import ApiReq from "@/util/axios";

const errorMessageReqFail = "เกิดข้อผิดพลาด";

const Tags = () => {
  const router = useRouter();

  const [tags, setTags] = useState([]);

  useEffect(() => {
    requestGetTasData();
  }, []);

  const requestGetTasData = async () => {
    try {
      const response = await ApiReq.get("/api/tags");
      setTags(response.data.data);
    } catch (error) {
      toast.error(errorMessageReqFail);
    }
  };

  const requestDeleteOne = async (id) => {
    try {
      const response = await ApiReq.post(`/api/tags/removal/${id}`);
      setTags(response.data.data);
    } catch (error) {
      toast.error(errorMessageReqFail);
    }
  };

  const columns = useMemo(() => [
    {
      field: "name",
      headerName: "ชื่อแท็ก",
      flex: 1,

      renderCell: (params) => {
        const { name } = params.row;

        return (
          <Typography className="text-slate-700 text-xs">{name}</Typography>
        );
      },
    },
    {
      field: "actions",
      headerName: "",
      // width: 180,
      flex: 1,
      align: "center",
      renderCell: (params) => (
        <Box>
          <Tooltip title="ลบออก">
            <IconButton
              className="text-red-500"
              onClick={() => requestDeleteOne(params.row._id)}
            >
              <DeleteSweepIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]);

  const [selectedTags, setSelectedTags] = useState([]);

  const addToDeletionList = (list) => {
    setSelectedTags(list);
  };

  const requestDeleteMany = async (id) => {
    try {
      const response = await ApiReq.post(`/api/tags/removal/list`, {
        tagsId: selectedTags,
      });
      setTags(response.data.data);
    } catch (error) {
      toast.error(errorMessageReqFail);
    }
  };

  return (
    <MainLayout>
      <PageLayout title="แท็ก บน เว็บไซต์">
        <Box className="flex flex-wrap gap-3 my-5">
          <Typography className="text-xs text-slate-700">Note:</Typography>
          <Typography className="text-xs text-slate-600">
            เพิ่มแก้ไข tag แสดงข้อมูลบนหน้าขายสินค้า
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Box className="flex justify-end">
              <Button
                variant="contained"
                className="bg-main text-white text-end"
                startIcon={<BookmarkAddOutlinedIcon />}
                onClick={() => router.push("/setting/tag-add")}
              >
                เพิ่ม แท็กใหม่
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box className="w-full md:w-4/5 mx-auto mt-10">
          {selectedTags.length > 0 && (
            <Box className="mb-5 px-5 py-5 bg-red-50 space-y-2 rounded-sm">
              <Button
                size="small"
                className="text-white bg-red-500 hover:bg-red-600"
                onClick={requestDeleteMany}
              >
                ลบทั้งหมด {selectedTags.length}
              </Button>
              <Typography className="text-xs text-slate-500">
                ลบแท็กทั้งหมดตามจำนวนที่ทำการกดเลือก
              </Typography>
            </Box>
          )}
          <Box className="w-full h-[650px]">
            <DataGrid
              autoHeight
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              onRowSelectionModelChange={(newRowSelectionModel) => {
                addToDeletionList(newRowSelectionModel);
              }}
              disableRowSelectionOnClick
              columns={columns}
              rows={tags}
              getRowId={(row) => row._id}
              getRowHeight={() => "auto"}
              checkboxSelection
            />
          </Box>
        </Box>
      </PageLayout>
    </MainLayout>
  );
};

export default Tags;
