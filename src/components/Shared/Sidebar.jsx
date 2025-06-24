import { useState } from "react";

import { MdOutlineDashboard } from "react-icons/md";
import { LuHandPlatter } from "react-icons/lu";
import { PiUserCircle } from "react-icons/pi";
import { PiBookOpenLight } from "react-icons/pi";
import { RiShieldUserLine } from "react-icons/ri";
import { LuBookUser } from "react-icons/lu";
import { IoBicycle } from "react-icons/io5";
import { AiOutlineShop } from "react-icons/ai";
import { TfiAnnouncement } from "react-icons/tfi";

import { LuPiggyBank } from "react-icons/lu";
import { FaBarsProgress } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

import { Link, NavLink } from "react-router-dom";

import logo from "../../../public/Images/logo.png";

export default function Sidebar() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (path) => {
    setSelected(path);
  };

  return (
    <div className="bg-gradient-to-r from-[#F98108] via-[#FFBD61] to-[#EEDB07] h-screen w-full">
      <div className="flex flex-col items-center gap-4 py-5">
        <Link to="/" className="flex items-center text-[#FAFAFA]">
          <img src={logo} alt="" className="h-12 mx-auto" />
          <p>CleanaX</p>
        </Link>
        <hr className="w-24 border border-[#E0E1E2]" />
      </div>
      <div className="flex flex-col px-4 py-3 gap-1">
        {[
          {
            to: "/dashboard",
            icon: <MdOutlineDashboard fontSize={24} />,
            label: "Dashboard",
          },
          {
            to: "/provider-stats",
            icon: <LuHandPlatter fontSize={24} />,
            label: "Provider Stats",
          },
          {
            to: "/user-stats",
            icon: <PiUserCircle fontSize={24} />,
            label: "User Stats",
          },
          {
            to: "/order-details",
            icon: <PiBookOpenLight fontSize={24} />,
            label: "Order Details",
          },
          {
            to: "/user-details",
            icon: <RiShieldUserLine fontSize={24} />,
            label: "User Details",
          },
          {
            to: "/provider-details",
            icon: <LuBookUser fontSize={24} />,
            label: "Provider Details",
          },
          {
            to: "/rider-details",
            icon: <IoBicycle fontSize={24} />,
            label: "Rider Details",
          },
          {
            to: "/transactions",
            icon: <LuPiggyBank fontSize={24} />,
            label: "Transactions",
          },
          {
            to: "/services",
            icon: <FaBarsProgress fontSize={24} />,
            label: "Services",
          },
          {
            to: "/stores",
            icon: <AiOutlineShop fontSize={24} />,
            label: "Stores",
          },
          {
            to: "/advertisement",
            icon: <TfiAnnouncement fontSize={24} />,
            label: "Advertisement",
          },
          {
            to: "/settings",
            icon: <IoSettingsOutline fontSize={24} />,
            label: "Settings",
          },

          // {
          //   to: "/edit-profile",
          //   icon: <FaRegUserCircle fontSize={24} />,
          //   label: "Edit Profile",
          // },
        ].map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => handleSelect(to)}
            className={({ isActive }) =>
              `flex items-center font-medium gap-3 text-base py-2 px-2 rounded-md 
              ${
                isActive
                  ? "bg-[#fff] text-[#000]"
                  : selected === to
                  ? "bg-[#fff] text-black"
                  : "text-white"
              }
              hover:bg-[#ffffffb6] hover:text-[#000]`
            }
          >
            {icon}
            <p>{label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
