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
} from "@mui/material";

const businessData = [
  {
    businessName: "Spark Laundry",
    type: "Laundry Service",
    eiinNo: "EIIN12345",
    order: 150,
    ongoing: 20,
    completed: 130,
    earning: 3200,
  },
  {
    businessName: "Fresh Cleaners",
    type: "Home Cleaning",
    eiinNo: "EIIN67890",
    order: 90,
    ongoing: 15,
    completed: 70,
    earning: 2100,
  },
  {
    businessName: "OfficeShine",
    type: "Office Cleaning",
    eiinNo: "EIIN11223",
    order: 120,
    ongoing: 10,
    completed: 105,
    earning: 3500,
  },
  {
    businessName: "Quick Car Wash",
    type: "Car Wash",
    eiinNo: "EIIN44556",
    order: 180,
    ongoing: 25,
    completed: 150,
    earning: 4800,
  },
  {
    businessName: "Eco Laundry",
    type: "Laundry Service",
    eiinNo: "EIIN99887",
    order: 110,
    ongoing: 18,
    completed: 90,
    earning: 2800,
  },
  {
    businessName: "Bright Home Clean",
    type: "Home Cleaning",
    eiinNo: "EIIN22334",
    order: 80,
    ongoing: 12,
    completed: 60,
    earning: 1800,
  },
  {
    businessName: "Prime Office Care",
    type: "Office Cleaning",
    eiinNo: "EIIN55667",
    order: 140,
    ongoing: 20,
    completed: 110,
    earning: 4000,
  },
  {
    businessName: "Speedy Wash",
    type: "Car Wash",
    eiinNo: "EIIN77889",
    order: 200,
    ongoing: 30,
    completed: 160,
    earning: 5200,
  },
  {
    businessName: "Green Laundry Co.",
    type: "Laundry Service",
    eiinNo: "EIIN33445",
    order: 130,
    ongoing: 22,
    completed: 100,
    earning: 3100,
  },
  {
    businessName: "Clean Sweep Homes",
    type: "Home Cleaning",
    eiinNo: "EIIN66778",
    order: 95,
    ongoing: 14,
    completed: 75,
    earning: 2250,
  },
];

export default function ProviderStats() {
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("all"); // changed
  const [filteredUsers, setFilteredUsers] = useState(businessData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleFilterType = (e) => {
    setSelectedType(e.target.value);
    filterUsers(searchText, e.target.value);
  };

  const filterUsers = (search, type) => {
    let filtered = businessData;

    if (search) {
      filtered = filtered.filter((business) =>
        business.businessName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type && type !== "all") {
      filtered = filtered.filter((business) => business.type === type);
    }

    setFilteredUsers(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="px-10 py-8 bg-[#FFF9E3] h-[92vh]">
      <div className="flex items-center justify-between">
        <p className="text-[#1c1c1c] font-medium text-2xl">Provider Stats</p>{" "}
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel>Services</InputLabel>
          <Select
            label="Services"
            value={selectedType}
            onChange={handleFilterType}
            sx={{ height: "50px" }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Laundry Service">Laundry Service</MenuItem>
            <MenuItem value="Home Cleaning">Home Cleaning</MenuItem>
            <MenuItem value="Office Cleaning">Office Cleaning</MenuItem>
            <MenuItem value="Car Wash">Car Wash</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="mt-6">
        <TableContainer component={Paper} sx={{ border: "1px solid #e6e6e6" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#FF9500" }}>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  Business Name
                </TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  Type
                </TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  EIIN No
                </TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  Orders
                </TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  Ongoing
                </TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  Completed
                </TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  Earnings
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((business) => (
                  <TableRow key={business.eiinNo}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {business.businessName}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {business.type}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {business.eiinNo}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {business.order}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {business.ongoing}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {business.completed}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      ${business.earning}
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
    </div>
  );
}
