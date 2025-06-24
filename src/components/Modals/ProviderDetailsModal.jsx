import { Modal, Box, Typography, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#fff9e3",
  boxShadow: "0 8px 24px rgba(255, 149, 0, 0.4)",
  p: 5,
  borderRadius: 4,
  outline: "none",
  border: "1px solid #FF9500",
};

export default function ProviderDetailsModal({ open, onClose, provider }) {
  if (!provider) return null;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="provider-modal-title">
      <Box sx={style}>
        <Typography
          id="provider-modal-title"
          variant="h5"
          component="h2"
          mb={3}
          color="#FF6D00" // orange heading color
          fontWeight="700"
        >
          Provider Details
        </Typography>
        <Typography mb={1}>
          <strong>Business Name:</strong> {provider.businessName}
        </Typography>
        <Typography mb={1}>
          <strong>EIIN No:</strong> {provider.eiinNo}
        </Typography>
        <Typography mb={1}>
          <strong>Licence Number:</strong> {provider.licenceNumber}
        </Typography>
        <Typography mb={1}>
          <strong>Email:</strong> {provider.email}
        </Typography>
        <Typography mb={1}>
          <strong>Location:</strong> {provider.location}
        </Typography>
        <Typography mb={3}>
          <strong>Status:</strong> {provider.status}
        </Typography>

        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            mt: 1,
            backgroundColor: "#FF9500",
            "&:hover": { backgroundColor: "#e08600" },
            fontWeight: "600",
          }}
          fullWidth
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}
