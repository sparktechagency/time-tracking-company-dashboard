import { useState } from "react";
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
} from "@mui/material";
import { FaEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

import RiderEditModal from "../Modals/RiderEditModal";
import RiderViewModal from "../Modals/RiderViewModal.jsx";

const riderData = [
  {
    name: "John Doe",
    vehicleNumber: "ABC-1234",
    licenceNumber: "LIC-567890",
    email: "john.doe@example.com",
    location: "New York, USA",
    status: "Active",
    totalRides: 120,
    ongoingRides: 5,
    completedRides: 115,
    charge: 1500, // total earning in USD
    duration: 4800, // total ride duration in minutes (e.g., 80 hours)
  },
  {
    name: "Emily Smith",
    vehicleNumber: "XYZ-5678",
    licenceNumber: "LIC-123456",
    email: "emily.smith@example.com",
    location: "Los Angeles, USA",
    status: "Inactive",
    totalRides: 80,
    ongoingRides: 0,
    completedRides: 80,
    charge: 900,
    duration: 3200,
  },
  {
    name: "Michael Brown",
    vehicleNumber: "DEF-9012",
    licenceNumber: "LIC-789012",
    email: "michael.brown@example.com",
    location: "Chicago, USA",
    status: "Active",
    totalRides: 150,
    ongoingRides: 7,
    completedRides: 143,
    charge: 1850,
    duration: 6000,
  },
  {
    name: "Jessica Lee",
    vehicleNumber: "GHI-3456",
    licenceNumber: "LIC-345678",
    email: "jessica.lee@example.com",
    location: "Houston, USA",
    status: "Pending",
    totalRides: 60,
    ongoingRides: 3,
    completedRides: 57,
    charge: 720,
    duration: 2400,
  },
  {
    name: "David Wilson",
    vehicleNumber: "JKL-7890",
    licenceNumber: "LIC-901234",
    email: "david.wilson@example.com",
    location: "Phoenix, USA",
    status: "Active",
    totalRides: 110,
    ongoingRides: 2,
    completedRides: 108,
    charge: 1400,
    duration: 4400,
  },
  {
    name: "Sophia Martinez",
    vehicleNumber: "MNO-2345",
    licenceNumber: "LIC-567890",
    email: "sophia.martinez@example.com",
    location: "Philadelphia, USA",
    status: "Inactive",
    totalRides: 75,
    ongoingRides: 0,
    completedRides: 75,
    charge: 950,
    duration: 3000,
  },
  {
    name: "James Anderson",
    vehicleNumber: "PQR-6789",
    licenceNumber: "LIC-123456",
    email: "james.anderson@example.com",
    location: "San Antonio, USA",
    status: "Active",
    totalRides: 140,
    ongoingRides: 6,
    completedRides: 134,
    charge: 1700,
    duration: 5600,
  },
  {
    name: "Olivia Thomas",
    vehicleNumber: "STU-0123",
    licenceNumber: "LIC-789012",
    email: "olivia.thomas@example.com",
    location: "San Diego, USA",
    status: "Active",
    totalRides: 130,
    ongoingRides: 4,
    completedRides: 126,
    charge: 1650,
    duration: 5200,
  },
  {
    name: "William Taylor",
    vehicleNumber: "VWX-4567",
    licenceNumber: "LIC-345678",
    email: "william.taylor@example.com",
    location: "Dallas, USA",
    status: "Pending",
    totalRides: 90,
    ongoingRides: 3,
    completedRides: 87,
    charge: 1100,
    duration: 3600,
  },
  {
    name: "Mia Harris",
    vehicleNumber: "YZA-8901",
    licenceNumber: "LIC-901234",
    email: "mia.harris@example.com",
    location: "San Jose, USA",
    status: "Active",
    totalRides: 125,
    ongoingRides: 5,
    completedRides: 120,
    charge: 1600,
    duration: 5000,
  },
];

export default function RiderDetails() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectedRider, setSelectedRider] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Open view modal
  const handleOpenViewModal = (provider) => {
    setSelectedRider(provider);
    setOpenViewModal(true);
  };

  // Open edit modal
  const handleOpenEditModal = (provider) => {
    setSelectedRider(provider);
    setOpenEditModal(true);
  };

  // Close both modals
  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setSelectedRider(null);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedRider(null);
  };

  return (
    <div className="px-10 py-8 bg-[#FFF9E3] h-[92vh]">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[#1c1c1c] font-medium text-2xl">Rider Details</p>
      </div>

      <TableContainer component={Paper} sx={{ border: "1px solid #e6e6e6" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FF9500" }}>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                Vehicle Number
              </TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                Licence Number
              </TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                Location
              </TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {riderData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((rider, index) => (
                <TableRow key={`${rider.email}-${index}`}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {rider.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {rider.vehicleNumber}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {rider.licenceNumber}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {rider.email}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {rider.location}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <span
                      style={{
                        padding: "10px 15px",
                        borderRadius: "5px",
                        color: "white",
                        backgroundColor:
                          rider.status.toLowerCase() === "active"
                            ? "#34C759"
                            : rider.status.toLowerCase() === "pending"
                            ? "#FFCC00"
                            : rider.status.toLowerCase() === "inactive"
                            ? "#FF3B30"
                            : "#9e9e9e",
                        fontWeight: "500",
                      }}
                    >
                      {rider.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-3">
                      <Button
                        onClick={() => handleOpenViewModal(rider)}
                        style={{
                          background: "none",
                          border: "1px solid #FF3B30",
                          cursor: "pointer",
                          color: "#FF9500",
                          fontSize: "20px",
                        }}
                      >
                        <FaEye />
                      </Button>
                      <Button
                        onClick={() => handleOpenEditModal(rider)}
                        style={{
                          background: "none",
                          border: "1px solid #FF3B30",
                          cursor: "pointer",
                          color: "#FF9500",
                          fontSize: "20px",
                        }}
                      >
                        <MdModeEdit />
                      </Button>
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
        count={riderData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* View Modal */}
      <RiderViewModal
        open={openViewModal}
        onClose={handleCloseViewModal}
        rider={selectedRider}
      />

      <RiderEditModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        rider={selectedRider}
      />
    </div>
  );
}
