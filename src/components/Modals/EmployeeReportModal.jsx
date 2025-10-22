import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
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
import { useEmployeeReportQuery } from "../../Redux/api/employeeApi";
import { skipToken } from "@reduxjs/toolkit/query";

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
  const opts = [];
  const now = dayjs();
  for (let i = 0; i < n; i++) {
    const month = now.subtract(i, "month");
    opts.push({
      value: month.format("YYYY-MM"),
      label: month.format("MMMM YYYY"),
    });
  }
  return opts;
}

export default function EmployeeReportModal({ open, onClose, employee }) {
  console.log(employee);
  const [language, setLanguage] = useState("");
  const [month, setMonth] = useState("");
  const [blobUrl, setBlobUrl] = useState(null);
  const [filename, setFilename] = useState("");

  const monthOptions = lastNMonthsOptions(12);

  const {
    data: employeeReport,
    isLoading,
    isError,
  } = useEmployeeReportQuery(
    employee && month && language
      ? { employeeId: employee._id, month, language }
      : skipToken
  );

  console.log(employeeReport);

  // Convert data to blob URL
  useEffect(() => {
    if (!employeeReport) return;

    let url;
    if (employeeReport instanceof Blob) {
      url = URL.createObjectURL(employeeReport);
    } else if (employeeReport.url) {
      url = employeeReport.url;
    }

    if (url) {
      setBlobUrl(url);
      const safeName = (employee?.name || "report").replace(/\s+/g, "_");
      setFilename(`${safeName}_${month}_${language}.pdf`);
    }

    return () => {
      if (url) URL.revokeObjectURL(url);
      setBlobUrl(null);
    };
  }, [employeeReport, employee, month, language]);

  const handleDownload = () => {
    if (!blobUrl) return;
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleClose = () => {
    setBlobUrl(null);
    setLanguage("");
    setMonth("");
    onClose();
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
                variant="outlined"
                size="small"
                onClick={handleClose}
                sx={{
                  textTransform: "none",
                }}
              >
                Close
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleDownload}
                disabled={!blobUrl}
                sx={{
                  textTransform: "none",
                }}
              >
                Download PDF
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

          <Box sx={{ flex: 1, minHeight: 120, overflow: "hidden" }}>
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
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
