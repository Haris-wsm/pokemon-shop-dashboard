import React, { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Box, Button, TextField, Typography } from "@mui/material";
import ApiReq from "@/util/axios";
import { toast } from "react-toastify";

const AddNewCategory = () => {
  const [newCategory, setNewCategory] = useState("");
  const handleChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleAdd = async () => {
    if (!newCategory) {
      toast.warn("กรุณากรอกข้อมูล");
      return;
    }

    try {
      const res = await ApiReq.post("/api/categories", {
        name: newCategory.trim(),
      });
      toast.success(res.data.message);
      setNewCategory("");
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Box className="mt-5">
      <Box className="flex  gap-5 justify-center items-center mt-10  w-full ">
        <Box className="flex mr-5">
          <EditNoteIcon className=" text-slate-600 mr-2" />
          <Typography className="text-md xs:text-sm  text-slate-600">
            เพิ่มรายการใหม่
          </Typography>
        </Box>

        <TextField
          size="small"
          name="category"
          value={newCategory}
          onChange={handleChange}
          placeholder="รายการใหม่"
          fullWidth
          className="w-1/2 my-2"
        />
        <Button
          className="bg-slate-700 hover:bg-slate-800 text-white w-[100px] "
          onClick={handleAdd}
        >
          เพิ่ม!
        </Button>
      </Box>
    </Box>
  );
};

export default AddNewCategory;
