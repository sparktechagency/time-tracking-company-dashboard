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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputBase,
  Button,
} from "@mui/material";
import { FaEye } from "react-icons/fa";
import ProviderDetailsModal from "../Modals/ProviderDetailsModal";

const providersData = [
  {
    businessName: "Spark Laundry",
    eiinNo: "EIIN12345",
    licenceNumber: "LIC-987654",
    email: "contact@sparklaundry.com",
    location: "New York, USA",
    status: "Active",
  },
  {
    businessName: "Fresh Cleaners",
    eiinNo: "EIIN67890",
    licenceNumber: "LIC-123456",
    email: "info@freshcleaners.com",
    location: "Los Angeles, USA",
    status: "Active",
  },
  {
    businessName: "OfficeShine",
    eiinNo: "EIIN11223",
    licenceNumber: "LIC-456789",
    email: "support@officeshine.com",
    location: "Chicago, USA",
    status: "Pending",
  },
  {
    businessName: "Quick Car Wash",
    eiinNo: "EIIN44556",
    licenceNumber: "LIC-654321",
    email: "service@quickcarwash.com",
    location: "Houston, USA",
    status: "Active",
  },
  {
    businessName: "Eco Laundry",
    eiinNo: "EIIN99887",
    licenceNumber: "LIC-789123",
    email: "contact@ecolaundry.com",
    location: "Phoenix, USA",
    status: "Inactive",
  },
  {
    businessName: "Bright Home Clean",
    eiinNo: "EIIN22334",
    licenceNumber: "LIC-321987",
    email: "info@brighthomeclean.com",
    location: "Philadelphia, USA",
    status: "Active",
  },
  {
    businessName: "Prime Office Care",
    eiinNo: "EIIN55667",
    licenceNumber: "LIC-147258",
    email: "support@primeofficecare.com",
    location: "San Antonio, USA",
    status: "Active",
  },
  {
    businessName: "Speedy Wash",
    eiinNo: "EIIN77889",
    licenceNumber: "LIC-369258",
    email: "service@speedywash.com",
    location: "San Diego, USA",
    status: "Active",
  },
  {
    businessName: "Green Laundry Co.",
    eiinNo: "EIIN33445",
    licenceNumber: "LIC-258147",
    email: "contact@greenlaundryco.com",
    location: "Dallas, USA",
    status: "Pending",
  },
  {
    businessName: "Clean Sweep Homes",
    eiinNo: "EIIN66778",
    licenceNumber: "LIC-963852",
    email: "info@cleansweephomes.com",
    location: "San Jose, USA",
    status: "Active",
  },
];

export default function ProviderDetails() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectedProvider, setSelectedProvider] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (provider) => {
    setSelectedProvider(provider);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProvider(null);
  };

  return (
    <div className="px-10 py-8 bg-[#FFF9E3] h-[92vh]">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[#1c1c1c] font-medium text-2xl">Provider Details</p>
      </div>

      <TableContainer component={Paper} sx={{ border: "1px solid #e6e6e6" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FF9500" }}>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                Business Name
              </TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                EIIN No
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
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {providersData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((provider) => (
                <TableRow key={provider.eiinNo}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {provider.businessName}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {provider.eiinNo}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {provider.licenceNumber}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {provider.email}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {provider.location}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <span
                        style={{
                          padding: "6px 12px",
                          borderRadius: "12px",
                          color: "white",
                          backgroundColor:
                            provider.status.toLowerCase() === "active"
                              ? "#34C759"
                              : provider.status.toLowerCase() === "pending"
                              ? "#FFCC00"
                              : provider.status.toLowerCase() === "inactive"
                              ? "#FF3B30"
                              : "#9e9e9e",
                          fontWeight: "600",
                        }}
                      >
                        {provider.status}
                      </span>
                      <Button
                        onClick={() => handleOpenModal(provider)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#FF9500",
                          fontSize: "20px",
                        }}
                        aria-label={`View details of ${provider.businessName}`}
                      >
                        <FaEye />
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
        count={providersData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <ProviderDetailsModal
        open={openModal}
        onClose={handleCloseModal}
        provider={selectedProvider}
      />
    </div>
  );
}
