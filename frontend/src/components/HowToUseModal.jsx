import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const HowToUseModal = ({ open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      p: 4,
      borderRadius: 2,
      width: 400
    }}>
      <Typography variant="h6" mb={2}>How to Use</Typography>
      <Typography variant="body2">
        1. Click "Upload Images" button or drag & drop images.<br/>
        2. Max 4 images at a time.<br/>
        3. Supported formats: JPG, PNG.<br/>
        4. Click "Predict" to see aircraft details.<br/>
      </Typography>
      <Button sx={{ mt: 2 }} variant="contained" onClick={onClose}>Close</Button>
    </Box>
  </Modal>
);

export default HowToUseModal;
