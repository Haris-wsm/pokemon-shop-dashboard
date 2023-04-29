import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const CustomModal = (props) => {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, ...props.sx }}>
          <Typography
            id="modal-modal-title"
            className="text-xl text-slate-700 text-center"
          >
            {props.title}
          </Typography>
          {props.children}
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
