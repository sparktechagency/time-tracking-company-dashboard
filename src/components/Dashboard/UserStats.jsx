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
  InputBase,
  InputAdornment,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";

const userStatsData = [
  {
    userName: "Alice Johnson",
    email: "alice.johnson@example.com",
    order: 25,
    ongoing: 3,
    completed: 20,
    cost: 1200,
  },
  {
    userName: "Bob Smith",
    email: "bob.smith@example.com",
    order: 40,
    ongoing: 5,
    completed: 34,
    cost: 2150,
  },
  {
    userName: "Carol White",
    email: "carol.white@example.com",
    order: 15,
    ongoing: 2,
    completed: 13,
    cost: 850,
  },
  {
    userName: "David Lee",
    email: "david.lee@example.com",
    order: 30,
    ongoing: 4,
    completed: 25,
    cost: 1600,
  },
  {
    userName: "Eva Green",
    email: "eva.green@example.com",
    order: 22,
    ongoing: 1,
    completed: 20,
    cost: 1100,
  },
  {
    userName: "Frank Moore",
    email: "frank.moore@example.com",
    order: 28,
    ongoing: 6,
    completed: 20,
    cost: 1350,
  },
  {
    userName: "Grace Kim",
    email: "grace.kim@example.com",
    order: 35,
    ongoing: 7,
    completed: 27,
    cost: 1750,
  },
  {
    userName: "Henry Clark",
    email: "henry.clark@example.com",
    order: 18,
    ongoing: 3,
    completed: 14,
    cost: 900,
  },
  {
    userName: "Isabel Turner",
    email: "isabel.turner@example.com",
    order: 26,
    ongoing: 5,
    completed: 20,
    cost: 1300,
  },
  {
    userName: "Jackie Adams",
    email: "jackie.adams@example.com",
    order: 33,
    ongoing: 2,
    completed: 30,
    cost: 1650,
  },
];

export default function UserStats() {
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(userStatsData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchText(search);
    const filtered = userStatsData.filter(
      (user) =>
        user.userName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
    setPage(0);
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
      <div className="flex items-center justify-between mb-4">
        <p className="text-[#1c1c1c] font-medium text-2xl">User Stats</p>
        <InputBase
          sx={{
            ml: 1,
            width: 300,
            height: 40,
            px: 2,
            border: "1px solid #ccc",
            borderRadius: 1,
          }}
          placeholder="Search by name or email"
          value={searchText}
          onChange={handleSearchChange}
          startAdornment={
            <InputAdornment position="start">
              <FaSearch />
            </InputAdornment>
          }
        />
      </div>

      <TableContainer component={Paper} sx={{ border: "1px solid #e6e6e6" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FF9500" }}>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                User Name
              </TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                Email
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
                Cost ($)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.email}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.userName}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.email}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.order}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.ongoing}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.completed}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.cost}
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
  );
}
