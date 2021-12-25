import React from "react";

import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import CloseIcon from "@mui/icons-material/Close";

const ChartModal = ({ open, onClose, image, microregion = "" }) => {
  return (
    <Modal
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      keepMounted
      onClose={onClose}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "80%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "3px",
            p: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Gráfico do resultado para {microregion}
            </Typography>

            <CloseIcon
              sx={{ cursor: "pointer", fontSize: 40, p: "8px" }}
              onClick={onClose}
            />
          </Box>

          {!!image && (
            <img
              style={{ width: "100%" }}
              src={`data:image/png;base64, ${image}`}
              alt="gráfico do resultado"
              loading="lazy"
            />
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ChartModal;
