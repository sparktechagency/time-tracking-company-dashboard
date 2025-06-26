/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import { GoEye } from "react-icons/go";
import { SlLock } from "react-icons/sl";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoIosTrendingDown } from "react-icons/io";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import EmployeeLineChart from "../Chart/EmployeeLineChart";
import EmployeeWorkingPieChart from "../Chart/EmployeeWorkingPieChart";
import EmployeeBreakPieChart from "../Chart/EmployeeBreakPieChart";

const employeeData = [
  {
    serial: 1,
    name: "John Doe",
    email: "johndoe@sparklaundry.com",
    contact: "+1234567890",
    designation: "Manager",
    status: "Active",
    image: "https://randomuser.me/api/portraits/men/1.jpg", // Example image URL
  },
  {
    serial: 2,
    name: "Jane Smith",
    email: "janesmith@freshcleaners.com",
    contact: "+1234567891",
    designation: "Operations Manager",
    status: "Active",
    image: "https://randomuser.me/api/portraits/women/2.jpg", // Example image URL
  },
  {
    serial: 3,
    name: "Robert Johnson",
    email: "robert.johnson@officeshine.com",
    contact: "+1234567892",
    designation: "Team Leader",
    status: "Blocked",
    image: "https://randomuser.me/api/portraits/men/3.jpg", // Example image URL
  },
  {
    serial: 4,
    name: "Michael Brown",
    email: "michaelbrown@quickcarwash.com",
    contact: "+1234567893",
    designation: "Branch Manager",
    status: "Active",
    image: "https://randomuser.me/api/portraits/men/4.jpg", // Example image URL
  },
  {
    serial: 5,
    name: "Emily Davis",
    email: "emily.davis@ecolaundry.com",
    contact: "+1234567894",
    designation: "Supervisor",
    status: "Active",
    image: "https://randomuser.me/api/portraits/women/5.jpg", // Example image URL
  },
  {
    serial: 6,
    name: "Alice Wilson",
    email: "alice.wilson@brighthomeclean.com",
    contact: "+1234567895",
    designation: "Cleaner",
    status: "Active",
    image: "https://randomuser.me/api/portraits/women/6.jpg", // Example image URL
  },
  {
    serial: 7,
    name: "James Taylor",
    email: "james.taylor@primeofficecare.com",
    contact: "+1234567896",
    designation: "Office Manager",
    status: "Blocked",
    image: "https://randomuser.me/api/portraits/men/7.jpg", // Example image URL
  },
  {
    serial: 8,
    name: "David Martinez",
    email: "david.martinez@speedywash.com",
    contact: "+1234567897",
    designation: "CEO",
    status: "Active",
    image: "https://randomuser.me/api/portraits/men/8.jpg", // Example image URL
  },
  {
    serial: 9,
    name: "Sophia Lee",
    email: "sophia.lee@greenlaundry.com",
    contact: "+1234567898",
    designation: "Manager",
    status: "Active",
    image: "https://randomuser.me/api/portraits/women/9.jpg", // Example image URL
  },
  {
    serial: 10,
    name: "Mason Harris",
    email: "mason.harris@cleansweephomes.com",
    contact: "+1234567899",
    designation: "Supervisor",
    status: "Active",
    image: "https://randomuser.me/api/portraits/men/10.jpg", // Example image URL
  },
];

export default function EmployeeStats() {
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all"); // changed
  const [filteredUsers, setFilteredUsers] = useState(employeeData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openBlockModal, setOpenBlockModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleFilterStatus = (e) => {
    setSelectedStatus(e.target.value);
    filterUsers(searchText, e.target.value);
  };

  const filterUsers = (search, type) => {
    let filtered = employeeData;

    if (type && type !== "all") {
      filtered = filtered.filter((employee) => employee.status === type);
    }

    setFilteredUsers(filtered);
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setOpenDetailsModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailsModal(false);
    setSelectedEmployee(null);
  };

  const handleOpenBlockModal = (employee) => {
    setSelectedEmployee(employee);
    setOpenBlockModal(true);
  };

  const handleCloseBlockModal = () => {
    setOpenBlockModal(false);
    setSelectedEmployee(null);
  };

  const handleOpenDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedEmployee(null);
  };

  const handleBlockEmployee = () => {
    console.log(`Blocked ${selectedEmployee.name}`);
    handleCloseBlockModal();
  };

  const handleDeleteEmployee = () => {
    console.log(`Deleted ${selectedEmployee.name}`);
    handleCloseDeleteModal();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="px-10 py-8 bg-[#efefef] h-[92vh]">
      <div className="flex items-center justify-between">
        <p className="text-[#1c1c1c] font-medium text-2xl capitalize">
          all employee
        </p>
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={selectedStatus}
            onChange={handleFilterStatus}
            sx={{ height: "50px" }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Blocked">Blocked</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="mt-6">
        <TableContainer component={Paper} sx={{ border: "1px solid #e6e6e6" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#C3D8E6" }}>
                <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                  Serial No.
                </TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                  Email Address
                </TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                  Contact No.
                </TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                  Designation
                </TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee) => (
                  <TableRow key={employee.eiinNo}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {employee.serial}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {employee.name}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {employee.email}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {employee.contact}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {employee.designation}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <div
                        style={{
                          backgroundColor:
                            employee.status === "Active"
                              ? "#008000"
                              : employee.status === "Blocked"
                              ? "#CC0505"
                              : "gray",
                          color: "white",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          textAlign: "center",
                        }}
                      >
                        {employee.status}
                      </div>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <div className="flex items-center justify-center gap-2">
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(employee)}
                          sx={{
                            color: "#fff",
                            fontSize: "20px",
                            bgcolor: "#658065",
                            width: "30px",
                            height: "30px",
                            borderRadius: "4px",
                          }}
                        >
                          <GoEye />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenBlockModal(employee)}
                          sx={{
                            color: "#fff",
                            fontSize: "20px",
                            bgcolor: "#3F80AE",
                            width: "30px",
                            height: "30px",
                            borderRadius: "4px",
                          }}
                        >
                          <SlLock />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDeleteModal(employee)}
                          sx={{
                            color: "#fff",
                            fontSize: "20px",
                            bgcolor: "#CC0505",
                            width: "30px",
                            height: "30px",
                            borderRadius: "4px",
                          }}
                        >
                          <AiTwotoneDelete />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      {/* Details Modal */}
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
          className="bg-[#efefef] p-6 rounded-lg shadow-lg"
          style={{ width: "1200px" }}
        >
          {selectedEmployee && (
            <div>
              {/* Top */}
              <div className="flex flex-col gap-2 bg-white p-4 rounded-lg">
                <p className="font-medium mb-1">View Details</p>
                <div className="flex gap-10">
                  <img
                    src={selectedEmployee.image}
                    alt={selectedEmployee.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      marginBottom: "10px",
                      borderRadius: "10px",
                    }}
                  />
                  <div className="flex flex-col gap-3">
                    <div>
                      <strong>Name:</strong> {selectedEmployee.name}
                    </div>
                    <div>
                      <strong>Email:</strong> {selectedEmployee.email}
                    </div>
                    <div>
                      <strong>Contact:</strong> {selectedEmployee.contact}
                    </div>
                    <div>
                      <strong>Designation:</strong>{" "}
                      {selectedEmployee.designation}
                    </div>
                  </div>
                </div>
              </div>
              {/* Mid */}
              <div className="my-3 rounded-lg flex gap-3">
                <div className="flex bg-white w-full p-5">
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
                    <DateCalendar sx={{ height: 300, width: "80%" }} />
                  </LocalizationProvider>
                </div>
                <div className="bg-white h-3/5 p-5 w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar sx={{ height: 300, width: "80%" }} />
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
                      <IoIosTrendingDown className="bg-[#D7E8F3] size-8 p-1 rounded-full" />
                    </div>{" "}
                    <div className="flex items-center gap-2 text-green-600  font-semibold">
                      <p className="text-sm">3.25%</p>
                      <IoIosTrendingDown className="bg-[#D7E8F3] size-8 p-1 rounded-full" />
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
        </div>
      </Modal>

      {/* Block Confirmation Modal */}
      <Modal open={openBlockModal} onClose={handleCloseBlockModal}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-40">
          <p className="mb-8">
            Are you sure you want to block{" "}
            <span className="font-medium text-lg">
              {selectedEmployee?.name}
            </span>
            ?
          </p>
          <Button
            onClick={handleBlockEmployee}
            variant="contained"
            sx={{ bgcolor: "#3F80AE", color: "white", marginRight: 2 }}
          >
            Yes, Block
          </Button>
          <Button
            onClick={handleCloseBlockModal}
            variant="outlined"
            sx={{ color: "#3F80AE", borderColor: "#3F80AE" }}
          >
            Cancel
          </Button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-40">
          <h3 className="mb-8">
            Are you sure you want to delete{" "}
            <span className="font-medium text-lg">
              {selectedEmployee?.name}
            </span>
            ?
          </h3>
          <Button
            onClick={handleDeleteEmployee}
            variant="contained"
            sx={{ bgcolor: "#CC0505", color: "white", marginRight: 2 }}
          >
            Yes, Delete
          </Button>
          <Button
            onClick={handleCloseDeleteModal}
            variant="outlined"
            sx={{ color: "#CC0505", borderColor: "#CC0505" }}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
