/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TablePagination,
} from "@mui/material";
import EmployeeDetailsModal from "../Modals/EmployeeDetailsModal";
import BlockConfirmationModal from "../Modals/BlockConfirmationModal";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import EmployeeTable from "../UI/EmployeeTable";

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
  const [selectedStatus, setSelectedStatus] = useState("all");
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
        <EmployeeTable
          filteredUsers={filteredUsers}
          page={page}
          rowsPerPage={rowsPerPage}
          handleViewDetails={handleViewDetails}
          handleOpenBlockModal={handleOpenBlockModal}
          handleOpenDeleteModal={handleOpenDeleteModal}
        />

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
      <EmployeeDetailsModal
        openDetailsModal={openDetailsModal}
        handleCloseModal={handleCloseModal}
        selectedEmployee={selectedEmployee}
      />

      {/* Block Confirmation Modal */}
      <BlockConfirmationModal
        openBlockModal={openBlockModal}
        handleCloseBlockModal={handleCloseBlockModal}
        handleBlockEmployee={handleBlockEmployee}
        selectedEmployee={selectedEmployee}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        openDeleteModal={openDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        selectedEmployee={selectedEmployee}
        handleDeleteEmployee={handleDeleteEmployee}
      />
    </div>
  );
}
