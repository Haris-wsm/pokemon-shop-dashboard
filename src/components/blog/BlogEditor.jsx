import dynamic from "next/dynamic";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ApiReq from "@/util/axios";
import clsx from "clsx";

const EditorQuill = dynamic(
  import("@/components/ui/DropImageFile/EditorQuill"),
  {
    ssr: false,
  }
);

const BlogEditor = (props) => {
  const [text, setText] = useState(props.data || "");
  const handleTextChange = (content, delta, source, editor) => {
    setText(content);

    if (props?.setText) props.setText(content);
  };

  const handleSave = async () => {
    try {
      await ApiReq.post("/api/blog", { rawHTML: text });
      toast.success("สร้างสำเร็จ");
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
        เนื้อหา เพิ่มโดยข้อความ หรือ รูปภาพ ในกล่องข้อความ
      </Typography>
      <Box className="my-5">
        <EditorQuill
          handleTextChange={handleTextChange}
          text={text}
          uploadURL={`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/upload/editor/blog`}
        />
      </Box>
      <Box
        className={clsx({
          ["flex justify-end px-5"]: true,
          hidden: props.hiddenButton,
        })}
      >
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

export default BlogEditor;
