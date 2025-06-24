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
  InputAdornment,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";

const usersData = [
  {
    name: "Alice Johnson",
    userName: "alicej",
    email: "alice.johnson@example.com",
    location: "New York, USA",
    status: "Active",
  },
  {
    name: "Bob Smith",
    userName: "bobsmith",
    email: "bob.smith@example.com",
    location: "Los Angeles, USA",
    status: "Inactive",
  },
  {
    name: "Carol White",
    userName: "carolw",
    email: "carol.white@example.com",
    location: "Chicago, USA",
    status: "Active",
  },
  {
    name: "David Lee",
    userName: "davidl",
    email: "david.lee@example.com",
    location: "Houston, USA",
    status: "Pending",
  },
  {
    name: "Eva Green",
    userName: "evagreen",
    email: "eva.green@example.com",
    location: "Phoenix, USA",
    status: "Active",
  },
  {
    name: "Frank Moore",
    userName: "frankm",
    email: "frank.moore@example.com",
    location: "Philadelphia, USA",
    status: "Active",
  },
  {
    name: "Grace Kim",
    userName: "gracek",
    email: "grace.kim@example.com",
    location: "San Antonio, USA",
    status: "Inactive",
  },
  {
    name: "Henry Clark",
    userName: "henryc",
    email: "henry.clark@example.com",
    location: "San Diego, USA",
    status: "Active",
  },
  {
    name: "Isabel Turner",
    userName: "isabelt",
    email: "isabel.turner@example.com",
    location: "Dallas, USA",
    status: "Pending",
  },
  {
    name: "Jackie Adams",
    userName: "jackiea",
    email: "jackie.adams@example.com",
    location: "San Jose, USA",
    status: "Active",
  },
];

export default function UserDetails() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="px-10 py-8 bg-[#FFF9E3] h-[92vh]">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[#1c1c1c] font-medium text-2xl">User Details</p>
      </div>

      <TableContainer
        component={Paper}
        sx={{ border: "1px solid #e6e6e6", padding: "20px" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FF9500" }}>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                Username
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
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.email}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.userName}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.email}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.location}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <span
                      style={{
                        padding: "10px 12px",
                        borderRadius: "12px",
                        color: "white",
                        backgroundColor:
                          user.status.toLowerCase() === "active"
                            ? "#34C759"
                            : user.status.toLowerCase() === "inactive"
                            ? "#FF3B30"
                            : user.status.toLowerCase() === "pending"
                            ? "#FFCC00"
                            : "#9e9e9e",
                        fontWeight: "600",
                      }}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={usersData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
