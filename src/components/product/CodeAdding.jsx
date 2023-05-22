import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";

import Papa from "papaparse";
import CustomModal from "../ui/Modal";
import TerminalIcon from "@mui/icons-material/Terminal";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ApiReq from "@/util/axios";

const CodeAdding = () => {
  const router = useRouter();

  const { id } = router.query;
  // File CSV
  const [codes, setCodes] = useState([]);
  const [files, setFiles] = useState(null);

  // Modal
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        let allCode = data.map((c) => ({ code: Object.values(c)[0] }));

        allCode = allCode.filter((c) => c.code !== "");
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

  const handleUploadCode = async () => {
    try {
      await ApiReq.post(`/api/products/${id}/codes`, { codes });
      toast.success("เพิ่มโค้ดสำเร็จ");
      router.back();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  return (
    <Box className="py-10">
      <Typography className="text-md px-5">เพิ่มโค้ดใหม่</Typography>
      <Divider className="my-3" />
      <Box>
        <Box className="flex mb-6 flex-wrap">
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
            <Typography noWrap className="text-xs text-gray-600 max-w-[150px]">
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
        <Box className="my-2">
          <Button
            size="small"
            onClick={handleUploadCode}
            className="bg-red-400 hover:bg-red-500 text-white disabled:bg-red-200"
            disabled={codes.length === 0}
          >
            ยืนยัน
          </Button>
        </Box>
      </Box>

      <CustomModal
        title={`รหัสโค้ด [ ${codes.length} ]`}
        handleClose={handleClose}
        open={open}
        sx={{ width: 800 }}
      >
        <Box className="py-5">
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

export default CodeAdding;
