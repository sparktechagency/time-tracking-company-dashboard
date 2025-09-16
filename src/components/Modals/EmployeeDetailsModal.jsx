import { useState } from "react";

import { Button, Modal } from "@mui/material";

import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import EmployeeWorkingPieChart from "../Chart/EmployeeWorkingPieChart";
import EmployeeBreakPieChart from "../Chart/EmployeeBreakPieChart";
import EmployeeLineChart from "../Chart/EmployeeLineChart";

import { IoIosTrendingDown } from "react-icons/io";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdOutlineFileUpload } from "react-icons/md";

import { toast } from "sonner";
import { getImageUrl } from "../../utils/baseUrl";
import { useCreatePayrollMutation } from "../../Redux/api/employeeApi";
import Map from "../UI/Map";

const center = {
  lat: 23.8041,
  lng: 90.4152,
};

export default function EmployeeDetailsModal({
  openDetailsModal,
  handleCloseModal,
  selectedEmployee,
}) {
  const [activeButton, setActiveButton] = useState("list");
  const [showCalendar, setShowCalendar] = useState(false);

  const [openPayrollModal, setOpenPayrollModal] = useState(false);
  const [payrollEmployeeId, setPayrollEmployeeId] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const [createPayroll] = useCreatePayrollMutation();

  // console.log("selectedEmployee", selectedEmployee);

  const imageUrl = getImageUrl();

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  const handlePayrollModal = (employeeId) => {
    console.log("payroll employee", employeeId);
    setPayrollEmployeeId(employeeId);
    handleCloseModal();
    setOpenPayrollModal(true);
  };

  const handleClosePayrollModal = () => {
    setOpenPayrollModal(false);
  };

  const handleSelectDate = () => {
    setShowCalendar(true);
  };

  const handleCloseCalendar = (date) => {
    setShowCalendar(false);
    console.log("Selected Date:", date);
  };

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
    }
  };

  const handleUploadPayroll = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      console.log("Error", error);
      toast.error("Please select a file to upload.");
    }
    const formData = new FormData();
    if (file) formData.append("documents", file);
    console.log("create payroll", file, payrollEmployeeId);

    const data = {
      id: payrollEmployeeId,
      data: formData,
    };

    console.log(data);

    try {
      const response = await createPayroll(data).unwrap();

      console.log("Payroll file uploaded:", response);
      if (response.success) {
        toast.success("Payroll file uploaded successfully.");
        setOpenPayrollModal(false);
        setFile(null);
      }
    } catch (error) {
      console.error("Error uploading payroll:", error);
      toast.error("Failed to upload payroll file.");
    }
  };

  // const handleDateSelect = (date) => {
  //   setShowCalendar(false);
  //   console.log("Selected Date:", date);
  // };

  return (
    <div>
      <Modal
        open={openDetailsModal}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="bg-[#efefef] p-4 rounded-lg shadow-lg relative"
          style={{ width: "1200px" }}
        >
          {selectedEmployee && (
            <div>
              {/* Top */}
              <div className="flex flex-col gap-2 bg-white p-3 rounded-lg">
                <p className="font-medium mb-1">View Details</p>
                <div className="flex items-center gap-10">
                  <img
                    src={`${imageUrl}/${selectedEmployee?.profile}`}
                    alt={selectedEmployee.name}
                    style={{
                      width: "120px",
                      height: "120px",
                      marginBottom: "10px",
                      borderRadius: "10px",
                    }}
                  />
                  <div className="flex flex-col gap-2">
                    <div>
                      <strong>Name:</strong> {selectedEmployee.name}
                    </div>
                    <div>
                      <strong>Email:</strong> {selectedEmployee.email}
                    </div>
                    <div>
                      <strong>Contact:</strong> {selectedEmployee.phone}
                    </div>
                    {selectedEmployee.designation && (
                      <div>
                        <strong>Designation:</strong>{" "}
                        {selectedEmployee.designation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Mid */}
              <div className="flex items-center">
                <div
                  className={`flex items-center ${
                    activeButton === "map" ? "justify-between" : "justify-start"
                  } w-full`}
                >
                  {activeButton === "map" && (
                    <div>
                      <Button
                        sx={{
                          textTransform: "none",
                          bgcolor:
                            activeButton === "list" ? "#3F80AE" : "transparent",
                          border: "1px solid #3F80AE",
                          width: "100px",
                          color: activeButton === "list" ? "white" : "#3F80AE",
                        }}
                        onClick={handleSelectDate}
                      >
                        Select Date
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-3 my-2">
                    <Button
                      onClick={() => handlePayrollModal(selectedEmployee._id)}
                      sx={{
                        textTransform: "none",
                        border: "1px solid #3F80AE",
                        color: "#3F80AE",
                      }}
                    >
                      Upload Payroll
                    </Button>

                    <Button
                      sx={{
                        textTransform: "none",
                        bgcolor:
                          activeButton === "list" ? "#3F80AE" : "transparent",
                        border: "1px solid #3F80AE",
                        width: "100px",
                        color: activeButton === "list" ? "white" : "#3F80AE",
                      }}
                      onClick={() => handleButtonClick("list")}
                    >
                      List View
                    </Button>
                    <Button
                      sx={{
                        textTransform: "none",
                        bgcolor:
                          activeButton === "map" ? "#3F80AE" : "transparent",
                        border: "1px solid #3F80AE",
                        width: "100px",
                        color: activeButton === "map" ? "white" : "#3F80AE",
                      }}
                      onClick={() => handleButtonClick("map")}
                    >
                      Map View
                    </Button>
                  </div>
                </div>
              </div>
              {activeButton === "list" && (
                <div>
                  <div className=" mb-3 rounded-lg flex gap-3">
                    <div className="flex bg-white w-full p-4 rounded-lg h-[310px]">
                      <div className="flex flex-col gap-1">
                        <Button
                          sx={{
                            textTransform: "none",
                            color: "#545454",
                            fontSize: "10px",
                            width: "100%",
                          }}
                        >
                          Today
                        </Button>
                        <hr className="border-[#E6E6E6]" />
                        <Button
                          sx={{
                            textTransform: "none",
                            color: "#545454",
                            fontSize: "10px",
                            width: "100%",
                          }}
                        >
                          Yesterday
                        </Button>
                        <hr className="border-[#E6E6E6]" />
                        <Button
                          sx={{
                            textTransform: "none",
                            color: "#545454",
                            fontSize: "10px",
                            width: "100%",
                          }}
                        >
                          This Week
                        </Button>
                        <hr className="border-[#E6E6E6]" />
                        <Button
                          sx={{
                            textTransform: "none",
                            color: "#545454",
                            fontSize: "10px",
                          }}
                        >
                          Last Week
                        </Button>
                        <hr className="border-[#E6E6E6]" />
                        <Button
                          sx={{
                            textTransform: "none",
                            color: "#545454",
                            fontSize: "10px",
                          }}
                        >
                          This Month
                        </Button>
                        <hr className="border-[#E6E6E6]" />
                        <Button
                          sx={{
                            textTransform: "none",
                            color: "#545454",
                            fontSize: "10px",
                          }}
                        >
                          Next Month
                        </Button>
                        <hr className="border-[#E6E6E6]" />
                      </div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar sx={{ height: 280, width: "80%" }} />
                      </LocalizationProvider>
                    </div>
                    <div className="bg-white p-5 w-full rounded-lg h-[310px]">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar sx={{ height: 280, width: "80%" }} />
                      </LocalizationProvider>
                    </div>
                  </div>

                  {/* Low */}
                  <div className="flex items-center gap-3">
                    {/* left */}
                    <div className="bg-white w-1/2 p-4 flex flex-col items-center rounded-lg">
                      <p className="text-lg font-semibold text-[#3F80AE]">
                        Today Working
                      </p>

                      <EmployeeWorkingPieChart />

                      <div className="flex items-center gap-5">
                        <div className="flex items-center gap-2 text-red-500 font-semibold">
                          <p className="text-sm">-120 Min</p>
                          <IoIosTrendingDown className="bg-[#D7E8F3] size-8 p-1 rounded-full" />
                        </div>{" "}
                        <div className="flex items-center gap-2 text-red-500  font-semibold">
                          <p className="text-sm">-3.25%</p>
                          <IoIosTrendingDown className="bg-[#D7E8F3] size-8 p-1 rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* mid */}
                    <div className="bg-white w-1/2 p-4 flex flex-col items-center rounded-lg">
                      <p className="text-lg font-semibold text-[#3F80AE]">
                        Today Break
                      </p>

                      <EmployeeBreakPieChart />

                      <div className="flex items-center gap-5">
                        <div className="flex items-center gap-2 text-green-600 font-semibold">
                          <p className="text-sm">120 Min</p>
                          <FaArrowTrendUp className="bg-[#D7E8F3] size-8 p-1 rounded-full" />
                        </div>{" "}
                        <div className="flex items-center gap-2 text-green-600  font-semibold">
                          <p className="text-sm">3.25%</p>
                          <FaArrowTrendUp className="bg-[#D7E8F3] size-8 p-1 rounded-full" />
                        </div>
                      </div>
                    </div>
                    {/* chart */}
                    <div className="w-full bg-white p-4 rounded-lg">
                      <EmployeeLineChart />
                    </div>
                    <div>
                      <div></div>
                    </div>
                  </div>
                </div>
              )}
              {activeButton === "map" && (
                <div>
                  <Map center={center}></Map>
                </div>
              )}
            </div>
          )}
          {showCalendar && (
            <div className="flex justify-center mt-4 absolute bottom-32 left-32">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar sx={{ height: 280, width: "100%" }} />
                </LocalizationProvider>
                <div className="flex justify-center mt-3">
                  <Button
                    sx={{
                      bgcolor: "#3F80AE",
                      color: "white",
                      textTransform: "none",
                    }}
                    onClick={handleCloseCalendar}
                  >
                    Choose Date
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Payroll Upload Modal */}
      <Modal
        open={openPayrollModal}
        onClose={handleClosePayrollModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-[400px]"
          style={{ minWidth: "300px" }}
        >
          <h3 className="text-lg font-semibold mb-3">Upload Payroll</h3>

          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{
              height: "55px",
              width: "200px",
              textTransform: "none",
              outline: "none",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <div className="flex items-center gap-1 text-[#3F80AE]">
              <p>Upload Payroll</p>
              <MdOutlineFileUpload />
            </div>

            <input type="file" hidden onChange={handleFileUpload} />
          </Button>
          <div className="flex justify-between mt-4">
            <Button
              sx={{
                textTransform: "none",
                bgcolor: "#3F80AE",
                color: "white",
                width: "100px",
              }}
              onClick={handleUploadPayroll}
              disabled={!file}
            >
              Upload
            </Button>
            <Button
              sx={{
                textTransform: "none",
                color: "#3F80AE",
                border: "1px solid #3F80AE",
                width: "100px",
              }}
              onClick={handleClosePayrollModal}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
