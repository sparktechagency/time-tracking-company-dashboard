import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMailOpen } from "react-icons/hi";
import { MdOutlineLock } from "react-icons/md";
// import { useSignInMutation } from "../../Redux/api/authApi";
// import { toast } from "sonner";

const SignIn = () => {
  const navigate = useNavigate();
  // const [login] = useSignInMutation();

  const onFinish = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const values = {
      email: form.get("email"),
      password: form.get("password"),
    };

    console.log("signIn Data", values);
    navigate("/", { replace: true });
    // try {
    //   const res = await login(data).unwrap();
    //   localStorage.setItem("accessToken", res?.data?.accessToken);
    //   localStorage.setItem("refreshToken", res?.data?.refreshToken);

    //   if (res.success) {
    //     toast.success("Login Successfully!");
    //     navigate("/");
    //   } else {
    //     toast.error("Login Error.");
    //   }
    // } catch (error) {
    //   console.error("Error user login:", error);
    //   if (error.data) {
    //     toast.error("Something went wrong while logging in.");
    //   }
    // }
  };

  return (
    <div className="bg-[#868686] min-h-[100vh]">
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "80vh" }}
        >
          <div className="bg-[#eeeeee] rounded-lg p-5 border border-[#707070]">
            <p className="text-3xl text-center font-semibold mb-7">
              Sign in to continue!
            </p>

            <form onSubmit={onFinish}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                margin="normal"
                variant="outlined"
                placeholder="Enter your email"
                InputProps={{
                  startAdornment: <HiOutlineMailOpen />,
                }}
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                required
                margin="normal"
                variant="outlined"
                placeholder="Enter your password"
                InputProps={{
                  startAdornment: <MdOutlineLock />,
                }}
              />

              <div className="flex items-center justify-between mt-2">
                <div>
                  <FormControlLabel
                    control={<Checkbox name="rememberMe" color="primary" />}
                    label="Remember me"
                  />
                </div>
                <div>
                  <Link
                    to="/forgot-password"
                    style={{
                      fontWeight: "bold",
                      textDecoration: "underline",
                      color: "#494949",
                    }}
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  marginTop: "20px",
                  backgroundColor: "#000000",
                  padding: "8px",
                  fontWeight: "bold",
                  borderRadius: "30px",
                  fontSize: "16px",
                  textTransform: "none",
                }}
              >
                Sign In
              </Button>
            </form>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default SignIn;
