import { useState } from "react";
import dayjs from "dayjs";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";
import { toast } from "sonner";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 2,
  maxHeight: "90vh",
  display: "flex",
  flexDirection: "column",
};

function lastNMonthsOptions(n = 12) {
  const months = [];
  const now = dayjs();
  for (let i = 0; i < n; i++) {
    const month = now.subtract(i, "month");
    months.push({
      value: month.format("YYYY-MM"),
      label: month.format("MMMM YYYY"),
    });
  }
  return months;
}

export default function EmployeeReportModal({ open, onClose, employee }) {
  console.log(employee);
  const [language, setLanguage] = useState("");
  const [month, setMonth] = useState("");

  const monthOptions = lastNMonthsOptions(12);

  const handleClose = () => {
    setLanguage("");
    setMonth("");
    onClose();
  };

  const handleDownload = async () => {
    if (!employee || !month || !language) return;

    const token = sessionStorage.getItem("accessToken");
    const downloadUrl = `${
      import.meta.env.VITE_BASE_URL
    }/timetracker/reports/monthly?month=${month}&employee=${
      employee._id
    }&lang=${language}`;

    try {
      const response = await fetch(downloadUrl, {
        headers: {
          Authorization: `Bearer ${token}`, // This is the pre-header
        },
      });

      if (!response.ok) throw new Error("Failed to download report");

      toast.info("Preparing your download...", { duration: 2000 });

      const blob = await response.blob();
      setTimeout(() => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `report-${month}-${employee.name || "employee"}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        setLanguage("");
        setMonth("");
        onClose();
      }, 2000); // 2 seconds delay
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 300 } }}
      aria-labelledby="employee-report-modal-title"
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <p className="text-sm">Employee:</p>
              <p className="text-lg font-semibold">
                {employee?.name || "Employee"}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button
                onClick={handleClose}
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                }}
              >
                Close
              </Button>
              <Button
                onClick={handleDownload}
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                }}
              >
                Download
              </Button>
            </div>
          </div>

          <Grid container spacing={2} alignItems="center" sx={{ mb: 1 }}>
            <div>
              <FormControl fullWidth size="small">
                <InputLabel id="report-month-label">Month</InputLabel>
                <Select
                  labelId="report-month-label"
                  value={month}
                  label="Month"
                  fullWidth
                  sx={{
                    width: "180px",
                  }}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  {monthOptions.map((m) => (
                    <MenuItem key={m.value} value={m.value}>
                      {m.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl fullWidth size="small">
                <InputLabel id="report-lang-label">Language</InputLabel>
                <Select
                  labelId="report-lang-label"
                  value={language}
                  label="Language"
                  fullWidth
                  onChange={(e) => setLanguage(e.target.value)}
                  sx={{
                    width: "120px",
                  }}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="de">German</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>

          {/* <Box sx={{ flex: 1, minHeight: 120, overflow: "hidden" }}>
            {isLoading && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} />
                <Typography>Loading report...</Typography>
              </Box>
            )}

            {isError && (
              <Typography color="error" sx={{ mt: 1 }}>
                {"Failed to load report"}
              </Typography>
            )}

            {!isLoading && !isError && blobUrl && (
              <Box sx={{ height: "65vh", border: "1px solid #e6e6e6" }}>
                <iframe
                  title="report-preview"
                  src={blobUrl}
                  style={{ width: "100%", height: "100%", border: "none" }}
                />
              </Box>
            )}

            {!isLoading && !isError && !blobUrl && (
              <Typography variant="body2" color="text.secondary">
                No report available for the selected month/language.
              </Typography>
            )}
          </Box> */}
        </Box>
      </Fade>
    </Modal>
  );
}
