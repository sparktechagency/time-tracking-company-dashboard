import React from "react";
import { Button, TextField, Grid, Typography, Container } from "@mui/material";
import { MdOutlineLock } from "react-icons/md";
import { HiArrowLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
// import { useResetPasswordMutation } from "../../Redux/api/authApi";
// import { toast } from "sonner";

const UpdatePassword = () => {
  const navigate = useNavigate();
  // const [resetPassword] = useResetPasswordMutation();

  const onFinish = async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const values = {
      password: form.get("password"),
      confirmPassword: form.get("confirmPassword"),
    };

    console.log("Update Password Values", values);

    navigate("/sign-in", { replace: true });

    // try {
    //   const data = {
    //     newPassword: values.password,
    //     confirmPassword: values.confirmPassword,
    //   };

    //   const token = localStorage.getItem("verifiedOtpToken");
    //   if (!token) {
    //     toast.error("Session expired. Please start the reset process again.");
    //     navigate("/forgot-password");
    //     return;
    //   }

    //   const response = await resetPassword(data).unwrap();
    //   if (response.success) {
    //     toast.success("Password updated successfully!");
    //     navigate("/sign-in");
    //   }
    // } catch (error) {
    //   if (error.response) {
    //     toast.error(
    //       error.response.data.message ||
    //         "Failed to update password. Please try again."
    //     );
    //   } else {
    //     toast.error("An unexpected error occurred. Please try again.");
    //   }
    // }
  };

  return (
    <div className="bg-[#9e9e9e] min-h-[100vh]">
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "80vh" }}
        >
          <div className="bg-[#eeeeee] rounded-lg p-5 border border-[#707070]">
            <div className="mb-8">
              <div className="flex items-center gap-1 mb-4">
                <Link to="/verify-otp" style={{ textDecoration: "none" }}>
                  <HiArrowLeft style={{ fontSize: "24px" }} />
                </Link>
                <Typography variant="h5" style={{ fontWeight: 500 }}>
                  Set a new password
                </Typography>
              </div>
            </div>

            <form onSubmit={onFinish}>
              <TextField
                label="New Password"
                name="password"
                type="password"
                fullWidth
                required
                variant="outlined"
                placeholder="Enter new password"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <MdOutlineLock
                      style={{ fontSize: "24px", marginRight: "8px" }}
                    />
                  ),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    paddingLeft: "10px",
                  },
                }}
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                fullWidth
                required
                variant="outlined"
                placeholder="Confirm your password"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <MdOutlineLock
                      style={{ fontSize: "24px", marginRight: "8px" }}
                    />
                  ),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    paddingLeft: "10px",
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  marginTop: "20px",
                  backgroundColor: "#000",
                  padding: "8px",
                  fontWeight: "bold",
                  borderRadius: "30px",
                  fontSize: "16px",
                  textTransform: "none",
                }}
              >
                Update Password
              </Button>
            </form>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default UpdatePassword;
