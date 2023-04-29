import React, { useEffect, useMemo, useRef } from "react";
import EditorToolbar, { formats } from "./EditorToolbar";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import { toast } from "react-toastify";
import ApiReq from "@/util/axios";

const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "georgia",
  "helvetica",
  "lucida",
  "prompt",
];

window.Quill = Quill;

Quill.register("modules/imageResize", ImageResize);
Quill.register(Font, true);

const Editor = (props) => {
  const quillRef = useRef(null);
  const { handleTextChange, text } = props;

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.getEditor().enable(false); // disable editor to prevent content changes
      quillRef.current.getEditor().update(); // update editor
    }
  }, []);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.getEditor().enable(true); // enable editor after initial render
    }
  }, [quillRef]);

  const uploadImageToServer = async (file) => {
    const res = await ApiReq.post(props.uploadURL, file);

    return res.data.url;
  };

  const embedImageToEditor = (url) => {
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();

    editor.insertEmbed(
      range.index,
      "image",
      `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}${url}`
    );
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      var file = input.files[0];
      var formData = new FormData();

      formData.append("image", file);

      try {
        const imageUrl = await uploadImageToServer(formData);
        embedImageToEditor(imageUrl);
      } catch (error) {
        const { message } = error.response.data;
        toast.error(message);
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#toolbar",
        handlers: {
          image: handleImageUpload,
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },

      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
    }),
    []
  );

  return (
    <>
      <EditorToolbar />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={text}
        onChange={handleTextChange}
        placeholder={"Write article ..."}
        modules={modules}
        formats={formats}
        bounds={"#root"}
      />
    </>
  );
};

export default Editor;
