import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import SignIn from "../../pages/SignIn";
import ForgotPassword from "../../pages/ForgotPassword";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Dashboard/Dashboard";
import Notifications from "../Dashboard/Notifications";
import PrivacyPolicy from "../Dashboard/PrivacyPolicy";
import VerifyOtp from "../../pages/VeryfiOTP";
import UpdatePassword from "../../pages/UpdatePassword";
import ProviderStats from "../Dashboard/ProviderStats";
import UserStats from "../Dashboard/UserStats";
import OrderDetails from "../Dashboard/OrderDetails";
import UserDetails from "../Dashboard/UserDetails";
import ProviderDetails from "../Dashboard/ProviderDetails";
import RiderDetails from "../Dashboard/RiderDetails";
import Transactions from "../Dashboard/Transactions";
import Services from "../Dashboard/Services";
import Stores from "../Dashboard/Stores";
import StoreDetails from "../Dashboard/StoreDetails";
import Advertisement from "../Dashboard/Advertisement";
import Settings from "../Dashboard/Settings";
import Profile from "../Dashboard/Settings/Profile";
import ChangePassword from "../Dashboard/Settings/ChangePassword";

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
            element: <ProviderStats />,
          },
          {
            path: "create-project",
            element: <UserStats />,
          },
          {
            path: "running-project",
            element: <OrderDetails />,
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
