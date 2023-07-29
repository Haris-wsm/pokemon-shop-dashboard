import MainLayout from "@/components/layout/MainLayout";
import PageLayout from "@/components/layout/PageLayout";
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import SaveIcon from "@mui/icons-material/Save";

import React, { useState } from "react";
import { toast } from "react-toastify";
import ApiReq from "@/util/axios";
import { useRouter } from "next/router";

const initalState = [{ name: "" }];

const TagAdd = () => {
  const [tags, setTags] = useState(initalState);

  const router = useRouter();

  const handleChange = (e, index) => {
    const { value } = e.target;

    const updatedTags = tags.map((tag, i) =>
      i === index ? { ...tag, name: value } : tag
    );
    setTags(updatedTags);
  };

  const addNewField = () => setTags([...tags, { name: "" }]);

  const removeSelf = (index) => {
    const updateTags = tags.filter((_, i) => i !== index);
    setTags(updateTags);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await ApiReq.post("/api/tags", { tags });
      router.push("/setting/tag");
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  const resetAllTags = () => setTags(initalState);

  return (
    <MainLayout>
      <PageLayout title="เพิ่มแท็ก">
        <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <form
              onSubmit={handleFormSubmit}
              className="mx-auto max-w-[1200px]"
            >
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Typography>รายการ แท็ก</Typography>
                  <FormHelperText>คำอธิบาย: รายชื่อ แท็กใหม่</FormHelperText>
                </Grid>
                <Grid item xs={12} md={6} justifyContent="flex-end">
                  <div className="space-x-2">
                    <Button
                      startIcon={<FormatPaintIcon />}
                      variant="outlined"
                      onClick={resetAllTags}
                    >
                      ล้าง
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      type="submit"
                      className="bg-slate-700 hover:bg-slate-600 text-white"
                    >
                      บันทึก
                    </Button>
                  </div>
                </Grid>
              </Grid>
              <Divider className="my-5 w-4/6" />
              <Box className="my-5 space-y-5">
                {tags.map((tag, i) => (
                  <Box className="flex items-center gap-3 mb-2" key={i}>
                    <Box className="mr-3 space-x-5">
                      <Typography className="text-sm inline-block text-slate-800">
                        {i + 1}
                      </Typography>
                    </Box>
                    <TextField
                      name={`tag[${i}]`}
                      size="small"
                      value={tag.name}
                      fullWidth
                      className="w-1/2"
                      onChange={() => handleChange(event, i)}
                      autoComplete="off"
                    />
                    {i > 0 && (
                      <Typography
                        className="text-xs text-red-400 cursor-pointer"
                        onClick={() => removeSelf(i)}
                      >
                        นำออก
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
              <Box className="flex justify-center">
                <Button
                  startIcon={<AddCircleOutlineOutlinedIcon />}
                  className="bg-main text-white"
                  variant="contained"
                  onClick={addNewField}
                >
                  เพิ่ม
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </PageLayout>
    </MainLayout>
  );
};

export default TagAdd;
