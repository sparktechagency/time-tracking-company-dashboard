import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#fff9e3",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function RiderEditModal({ open, onClose, rider }) {
  const [formData, setFormData] = useState({
    charge: "",
    duration: "",
  });

  useEffect(() => {
    if (rider) {
      setFormData(rider);
    }
  }, [rider]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saving edited data:", formData);
    onClose();
  };

  if (!rider) return null;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-modal-title">
      <Box sx={style}>
        <Typography id="edit-modal-title" variant="h6" mb={2}>
          Edit Rider Charge
        </Typography>

        <div className="flex flex-col gap-3">
          <TextField
            label="Rider's Charge"
            name="charge"
            value={formData.charge}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Time Limitaion"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              width: "100%",
              textTransform: "none",
              fontSize: "18px",
              background:
                "linear-gradient(90deg, #F98108 0%,#FFBD61 50%, #EEDB07 100%)",
              "&:hover": {
                background: "linear-gradient(90deg, #e08600 0%, #cc5d00 100%)",
              },
            }}
          >
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
