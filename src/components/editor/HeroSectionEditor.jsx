import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import ApiReq from "@/util/axios";

const EditorQuill = dynamic(
  import("@/components/ui/DropImageFile/EditorQuill"),
  {
    ssr: false,
  }
);

const HeroSectionEditor = (props) => {
  const [text, setText] = useState(props.data || "");
  const handleTextChange = (content, delta, source, editor) => {
    setText(content);
  };

  const handleSave = async () => {
    try {
      await ApiReq.post("/api/website/hero-section", { rawHTML: text });
      toast.success("บันทึกสำเร็จ");
    } catch (error) {
      toast.error(error?.response?.data.message || "เกิดข้อผิดพลาด");
    }
  };
  return (
    <Box className="mt-5">
      <Typography className="font-semibold text-slate-700 inline-block mr-2">
        Note:
      </Typography>
      <Typography className="text-gray-500 text-sm inline-block">
        แก้ไขข้อมูลสำหรับการแสดงบนหน้าเว็บไซต์สินค้า โดยใส่รายละเอียดที่ต้องการ
      </Typography>
      <Box className="my-5">
        <EditorQuill
          handleTextChange={handleTextChange}
          text={text}
          uploadURL={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/upload/editor/website`}
        />
      </Box>
      <Box className="flex justify-end px-5">
        <Button
          className="bg-slate-700 hover:bg-slate-800 text-white"
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSectionEditor;
