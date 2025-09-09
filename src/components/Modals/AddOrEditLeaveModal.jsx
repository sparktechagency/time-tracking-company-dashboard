import React, { useState } from "react";
import { Modal, TextField, Box, Button } from "@mui/material";
import { toast } from "sonner";
import { useCreateLeaveMutation } from "../../Redux/api/leaveApi";

export default function AddOrEditLeaveModal({
  openAddOrEditModal,
  closeAddOrOpenModal,
}) {
  const [leaveBalance, setLeaveBalance] = useState({
    casualLeave: "",
    sickLeave: "",
    wpLeave: "",
    earnLeave: "",
    annualLeave: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const [createLeave] = useCreateLeaveMutation();

  const handleAddEmployee = async () => {
    const errors = {};

    Object.keys(leaveBalance).forEach((key) => {
      if (!leaveBalance[key]) {
        errors[key] = `${key} is required`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const leaveDetails = {
      casualLeave: Number(leaveBalance.casualLeave),
      sickLeave: Number(leaveBalance.sickLeave),
      wpLeave: Number(leaveBalance.wpLeave),
      earnLeave: Number(leaveBalance.earnLeave),
      annualLeave: Number(leaveBalance.annualLeave),
    };
    console.log("leave details", leaveDetails);

    try {
      const response = await createLeave(leaveDetails).unwrap();
      console.log("Employee created successfully:", response);
      if (response.success) {
        toast.success("Leave Created Successfully..!");

        // Reset form
        setLeaveBalance({
          casualLeave: "",
          sickLeave: "",
          wpLeave: "",
          earnLeave: "",
          annualLeave: "",
        });
        setFormErrors({});

        closeAddOrOpenModal();
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      toast.error("Failed to create employee");
      setFormErrors({
        submit: "Failed to create employee. Please try again later.",
      });
    }
  };

  return (
    <Modal
      open={openAddOrEditModal}
      onClose={closeAddOrOpenModal}
      aria-labelledby="add-employee-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <p className="text-[#3F80AE] font-medium text-2xl mb-4 text-center">
          Add Leave Category
        </p>
        <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 items-center">
            <TextField
              label="Casual Leave"
              fullWidth
              variant="outlined"
              margin="normal"
              value={leaveBalance.casualLeave}
              onChange={(e) =>
                setLeaveBalance({
                  ...leaveBalance,
                  casualLeave: e.target.value,
                })
              }
              // error={!!formErrors.casualLeave}
              // helperText={formErrors.casualLeave}
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px",
                },
              }}
            />
            <TextField
              label="Sick Leave"
              fullWidth
              variant="outlined"
              margin="normal"
              value={leaveBalance.sickLeave}
              onChange={(e) =>
                setLeaveBalance({
                  ...leaveBalance,
                  sickLeave: e.target.value,
                })
              }
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px",
                },
              }}
            />
            <TextField
              label="Leave Without Pay"
              fullWidth
              variant="outlined"
              margin="normal"
              value={leaveBalance.wpLeave}
              onChange={(e) =>
                setLeaveBalance({
                  ...leaveBalance,
                  wpLeave: e.target.value,
                })
              }
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px",
                },
              }}
            />
            <TextField
              label="Earn Leave"
              fullWidth
              variant="outlined"
              margin="normal"
              value={leaveBalance.earnLeave}
              onChange={(e) =>
                setLeaveBalance({
                  ...leaveBalance,
                  earnLeave: e.target.value,
                })
              }
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px",
                },
              }}
            />
            <TextField
              label="Annual Leave"
              fullWidth
              variant="outlined"
              margin="normal"
              value={leaveBalance.annualLeave}
              onChange={(e) =>
                setLeaveBalance({
                  ...leaveBalance,
                  annualLeave: e.target.value,
                })
              }
              error={!!formErrors.earnLeave}
              helperText={formErrors.earnLeave}
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px",
                },
              }}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={closeAddOrOpenModal}
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
              onClick={handleAddEmployee}
              sx={{
                bgcolor: "#3F80AE",
                color: "#fff",
                textTransform: "none",
                width: "130px",
                padding: "10px",
                "&:hover": { bgcolor: "#70a4c7" },
              }}
            >
              Submit Leave
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
