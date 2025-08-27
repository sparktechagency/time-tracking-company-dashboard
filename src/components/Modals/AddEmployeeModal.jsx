import React, { useState } from "react";
import {
  Modal,
  TextField,
  Box,
  Button,
} from "@mui/material";

export default function AddEmployeeModal({
  openAddEmployeeModal,
  handleCloseAddEmployeeModal,
  handleAddEmployee,
}) {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeDesignation, setEmployeeDesignation] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = () => {
    const errors = {};

    // Simple validation
    if (!employeeName) errors.name = "Name is required";
    if (!employeeEmail) errors.email = "Email is required";
    if (!employeeDesignation) errors.designation = "Designation is required";
    if (!employeePhone) errors.phone = "Phone is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Submit the form data (passing it back to parent)
    handleAddEmployee({
      employeeName,
      employeeEmail,
      employeeDesignation,
      employeePhone,
    });

    // Reset form fields after submission
    setEmployeeName("");
    setEmployeeEmail("");
    setEmployeeDesignation("");
    setEmployeePhone("");
    setFormErrors({});
  };

  return (
    <Modal
      open={openAddEmployeeModal}
      onClose={handleCloseAddEmployeeModal}
      aria-labelledby="add-employee-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <p className="text-[#1c1c1c] font-medium text-2xl mb-4">Add Employee</p>
        <form className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              margin="normal"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              value={employeeEmail}
              onChange={(e) => setEmployeeEmail(e.target.value)}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
          </div>
          <div className="flex gap-4 items-center">
            <TextField
              label="Designation"
              fullWidth
              variant="outlined"
              margin="normal"
              value={employeeDesignation}
              onChange={(e) => setEmployeeDesignation(e.target.value)}
              error={!!formErrors.designation}
              helperText={formErrors.designation}
            />
            <TextField
              label="Phone"
              fullWidth
              variant="outlined"
              margin="normal"
              value={employeePhone}
              onChange={(e) => setEmployeePhone(e.target.value)}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={handleCloseAddEmployeeModal}
              sx={{
                bgcolor: "#f0f0f0",
                color: "black",
                textTransform: "none",
                width: "100px",
                padding: "10px",
                "&:hover": { bgcolor: "#e0e0e0" },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              sx={{
                bgcolor: "#3F80AE",
                color: "#fff",
                textTransform: "none",
                width: "130px",
                padding: "10px",
                "&:hover": { bgcolor: "#70a4c7" },
              }}
            >
              Add Employee
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
