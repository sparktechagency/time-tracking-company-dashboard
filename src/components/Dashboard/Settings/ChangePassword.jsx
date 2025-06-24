import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    setError("");
    console.log("Password change request submitted");
  };

  return (
    <div className="bg-[#fff9e3] h-screen p-20">
      <Box sx={{ maxWidth: 500, margin: "auto", padding: 2 }}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <div>
              <TextField
                label="Current Password"
                type="password"
                fullWidth
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <TextField
                label="New Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div>
                <Typography color="error">{error}</Typography>
              </div>
            )}
            <div>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#232323",
                  color: "white",
                  fontSize: "16px",
                  textTransform: "none",
                  padding: "10px",
                  float: "right",
                }}
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Box>
    </div>
  );
}
