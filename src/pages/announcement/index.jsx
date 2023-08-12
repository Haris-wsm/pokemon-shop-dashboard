import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import ApiReq from "@/util/axios";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormHelperText,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Announcmennt = () => {
  const [status, setStatus] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleGetInitialAnnouncmennt();
  }, []);

  const handleGetInitialAnnouncmennt = async () => {
    ApiReq.get("/api/announcement")
      .then((response) => {
        const { data } = response.data;
        setText(data.data ?? "");
        setStatus(data.status ?? false);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "switch") {
      setStatus(checked);
    } else if (name === "text" && value.length <= 400) {
      setText(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    ApiReq.post("/api/announcement", {
      status,
      data: text,
    })
      .then(() => {
        toast.success("เพิ่มข้อมูลสำเร็จ");
        setLoading(false);
      })
      .catch(() => {
        toast.error("เกิดข้อผิดพลาด");
        setLoading(false);
      });
  };

  return (
    <MainLayout>
      <PageLayout title="Announcmennt">
        <Typography className="text-sm font-semibold text-slate-700 inline-block mr-2">
          Note:
        </Typography>
        <Typography className="text-sm text-gray-500 inline-block">
          เพิ่มประกาศสำคัญ บนหน้าเว็บไซต์
        </Typography>
        <Divider className="w-4/5 my-5" />
        <Box className="max-w-5xl mx-auto mt-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Box className="space-y-2">
              <Typography className="text-main text-md">
                ข้อความประกาศ
              </Typography>
              <TextField
                className="text-sm"
                fullWidth
                placeholder="ป้อนข้อความ"
                multiline
                // maxRows={4}
                rows={4}
                size="small"
                value={text}
                name="text"
                onChange={handleChange}
              />
              <Box className="flex justify-end">
                <FormHelperText>{text.length}/400</FormHelperText>
              </Box>
            </Box>
            <Box className="space-y-2">
              <Typography className="text-main text-md">เปิดประกาศ</Typography>
              <Switch checked={status} name="switch" onChange={handleChange} />
            </Box>
            <Box className="flex justify-end">
              <Button
                className="bg-main text-white px-2 min-w-[100px]"
                variant="contained"
                type="submit"
              >
                {loading ? (
                  <CircularProgress className="text-white" size={20} />
                ) : (
                  "เพิ่มประกาศ"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </PageLayout>
    </MainLayout>
  );
};

export default Announcmennt;
