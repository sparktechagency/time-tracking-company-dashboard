import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div className="bg-[#fff9e3] p-8 h-[93vh]">
      <div className="bg-white p-8 rounded-lg flex flex-col gap-4">
        <Link
          to="profile"
          className="flex items-center justify-between bg-[#fff9e3] p-4 rounded-lg w-3/4 hover:font-medium"
        >
          <p>Personal Information</p>
          <FaChevronRight />
        </Link>
        <Link
          to="change-password"
          className="flex items-center justify-between bg-[#fff9e3] p-4 rounded-lg w-3/4 hover:font-medium"
        >
          <p>Change Password</p>
          <FaChevronRight />
        </Link>
        <Link
          to="/"
          className="flex items-center justify-between bg-[#fff9e3] p-4 rounded-lg w-3/4 hover:font-medium"
        >
          <p>Price Settings</p>
          <FaChevronRight />
        </Link>
        <Link
          to="/"
          className="flex items-center justify-between bg-[#fff9e3] p-4 rounded-lg w-3/4 hover:font-medium"
        >
          <p>Support Request</p>
          <FaChevronRight />
        </Link>
        <Link
          to="/"
          className="flex items-center justify-between bg-[#fff9e3] p-4 rounded-lg w-3/4 hover:font-medium"
        >
          <p>Terms & Condition</p>
          <FaChevronRight />
        </Link>
        <Link
          to="/"
          className="flex items-center justify-between bg-[#fff9e3] p-4 rounded-lg w-3/4 hover:font-medium"
        >
          <p>Return Policy</p>
          <FaChevronRight />
        </Link>
      </div>
    </div>
  );
}
