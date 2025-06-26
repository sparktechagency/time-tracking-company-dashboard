import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import SignIn from "../../pages/SignIn";
import ForgotPassword from "../../pages/ForgotPassword";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Dashboard/Dashboard";
import VerifyOtp from "../../pages/VeryfiOTP";
import UpdatePassword from "../../pages/UpdatePassword";
import UserStats from "../Dashboard/CreateProject";
import UserDetails from "../Dashboard/UserDetails";
import ProviderDetails from "../Dashboard/ProviderDetails";
import RiderDetails from "../Dashboard/RiderDetails";
import EmployeeStats from "../Dashboard/EmployeeStats";
import RunningProjects from "../Dashboard/RunningProjects";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "/update-password",
        element: <UpdatePassword />,
      },
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "all-employee",
            element: <EmployeeStats />,
          },
          {
            path: "create-project",
            element: <UserStats />,
          },
          {
            path: "running-project",
            element: <RunningProjects />,
          },
          {
            path: "change-password",
            element: <UserDetails />,
          },
          {
            path: "privacy-policy",
            element: <ProviderDetails />,
          },
          {
            path: "add-break-time",
            element: <RiderDetails />,
          },
        ],
      },
    ],
  },
]);

export default router;
