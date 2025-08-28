import { Button, Modal } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EmployeeWorkingPieChart from "../Chart/EmployeeWorkingPieChart";
import EmployeeBreakPieChart from "../Chart/EmployeeBreakPieChart";
import EmployeeLineChart from "../Chart/EmployeeLineChart";
import { IoIosTrendingDown } from "react-icons/io";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useState } from "react";

export default function EmployeeDetailsModal({
  openDetailsModal,
  handleCloseModal,
  selectedEmployee,
}) {
  const [activeButton, setActiveButton] = useState("list");
  const [showCalendar, setShowCalendar] = useState(false);

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  const handleSelectDate = () => {
    setShowCalendar(true);
  };

  const handleCloseCalendar = (date) => {
    setShowCalendar(false);
    console.log("Selected Date:", date);
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
                <div className="flex gap-10">
                  <img
                    src={selectedEmployee.image}
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
                    <div>
                      <strong>Designation:</strong>{" "}
                      {selectedEmployee.designation}
                    </div>
                  </div>
                </div>
              </div>
              {/* Mid */}
              <div className="flex items-center">
                <div
                  className={`flex items-center ${
                    activeButton === "map" ? "justify-between" : "justify-end"
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
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14607.615220208161!2d90.42194549999999!3d23.7508095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b871c90f0b41%3A0x96f471c1e5d84060!2sKhilgaon%20Taltola%20City%20Corporation%20Market!5e0!3m2!1sen!2sbd!4v1750927194433!5m2!1sen!2sbd"
                    width="100%"
                    height="450"
                    style={{ border: "0" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
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
    </div>
  );
}
