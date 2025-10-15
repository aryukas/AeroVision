import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 2,
  width: 400,
};

const PredictionDetailsModal = ({ open, onClose, data }) => {
  if (!data) return null;
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Details for {data.filename}
        </Typography>
        <Typography>Aircraft: {data.aircraft}</Typography>
        <Typography>Country: {data.country}</Typography>
        <Typography>Missile: {data.missile}</Typography>
        <Button onClick={onClose} sx={{ mt: 2 }} variant="contained">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default PredictionDetailsModal;
