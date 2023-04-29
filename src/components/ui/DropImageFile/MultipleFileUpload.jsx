import React from "react";
import {
  Dropzone,
  FileMosaic,
  FullScreen,
  ImagePreview,
  VideoPreview,
} from "@files-ui/react";
import { Box, Typography } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const MultipleFileUpload = (props) => {
  // const [props.imageGallery, props.setFiles] = React.useState([]);
  const [imageSrc, setImageSrc] = React.useState(undefined);

  const handleStart = (filesToUpload) => {
    console.log("advanced demo start upload", filesToUpload);
  };

  const handleFinish = (uploadedFiles) => {
    console.log("advanced demo finish upload", uploadedFiles);
  };

  const onDelete = (id) => {
    props.onChange(props.imageGallery.filter((x) => x.id !== id));
    props.setFiles(props.imageGallery.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };

  const handleAbort = (id) => {
    props.onChange(
      props.imageGallery.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: "aborted" };
        } else return { ...ef };
      })
    );
    props.setFiles(
      props.imageGallery.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: "aborted" };
        } else return { ...ef };
      })
    );
  };
  const handleCancel = (id) => {
    props.setFiles(
      props.imageGallery.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: undefined };
        } else return { ...ef };
      })
    );
    props.onChange(
      props.imageGallery.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: undefined };
        } else return { ...ef };
      })
    );
  };

  const updateFiles = (incommingFiles) => {
    props.onChange(incommingFiles);
    props.setFiles(incommingFiles);
  };

  return (
    <>
      <Dropzone
        style={{
          border: props.error
            ? "1px dashed rgba(255, 0, 0, 1)"
            : "1px dashed rgba(93, 100, 117, 1)",
        }}
        onChange={updateFiles}
        minHeight="195px"
        value={props.imageGallery}
        accept="image/*"
        label={
          <Box className="cursor-pointer">
            <Typography className="text-xl">ลากไฟล์ หรือ กดเลือก</Typography>
            <FileUploadOutlinedIcon
              className="text-gray-300 mt-3"
              fontSize="large"
            />
          </Box>
        }
        onUploadStart={handleStart}
        onUploadFinish={handleFinish}
        fakeUpload
      >
        {props.imageGallery.map((file) => (
          <FileMosaic
            {...file}
            key={file.id}
            onDelete={onDelete}
            onSee={handleSee}
            onAbort={handleAbort}
            onCancel={handleCancel}
            resultOnTooltip
            alwaysActive
            preview
            info
          />
        ))}
      </Dropzone>
      <FullScreen
        open={imageSrc !== undefined}
        onClose={() => setImageSrc(undefined)}
      >
        <ImagePreview src={imageSrc} />
      </FullScreen>
    </>
  );
};

export default MultipleFileUpload;
