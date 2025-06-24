/* eslint-disable no-unused-vars */
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
} from "@mui/material";

const orderDetailsData = [
  {
    date: "2025-05-01",
    email: "alice.johnson@example.com",
    orderId: "ORD1001",
    serviceProvider: "Spark Laundry",
    category: "Laundry Service",
    status: "Completed",
  },
  {
    date: "2025-05-03",
    email: "bob.smith@example.com",
    orderId: "ORD1002",
    serviceProvider: "Fresh Cleaners",
    category: "Home Cleaning",
    status: "Ongoing",
  },
  {
    date: "2025-05-04",
    email: "carol.white@example.com",
    orderId: "ORD1003",
    serviceProvider: "OfficeShine",
    category: "Office Cleaning",
    status: "Completed",
  },
  {
    date: "2025-05-05",
    email: "david.lee@example.com",
    orderId: "ORD1004",
    serviceProvider: "Quick Car Wash",
    category: "Car Wash",
    status: "Ongoing",
  },
  {
    date: "2025-05-06",
    email: "eva.green@example.com",
    orderId: "ORD1005",
    serviceProvider: "Eco Laundry",
    category: "Laundry Service",
    status: "Completed",
  },
  {
    date: "2025-05-07",
    email: "frank.moore@example.com",
    orderId: "ORD1006",
    serviceProvider: "Bright Home Clean",
    category: "Home Cleaning",
    status: "Cancelled",
  },
  {
    date: "2025-05-08",
    email: "grace.kim@example.com",
    orderId: "ORD1007",
    serviceProvider: "Prime Office Care",
    category: "Office Cleaning",
    status: "Completed",
  },
  {
    date: "2025-05-09",
    email: "henry.clark@example.com",
    orderId: "ORD1008",
    serviceProvider: "Speedy Wash",
    category: "Car Wash",
    status: "Ongoing",
  },
  {
    date: "2025-05-10",
    email: "isabel.turner@example.com",
    orderId: "ORD1009",
    serviceProvider: "Green Laundry Co.",
    category: "Laundry Service",
    status: "Completed",
  },
  {
    date: "2025-05-11",
    email: "jackie.adams@example.com",
    orderId: "ORD1010",
    serviceProvider: "Clean Sweep Homes",
    category: "Home Cleaning",
    status: "Completed",
  },
];

export default function OrderDetails() {
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState(orderDetailsData);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleFilterStatus = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    filterOrders(searchText, status);
  };

  const filterOrders = (search, status) => {
    let filtered = orderDetailsData;

    if (search) {
      filtered = filtered.filter(
        (order) =>
          order.orderId.toLowerCase().includes(search.toLowerCase()) ||
          order.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status && status !== "all") {
      filtered = filtered.filter(
        (order) => order.status.toLowerCase() === status.toLowerCase()
      );
    }

    setFilteredOrders(filtered);
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
        <p className="text-[#1c1c1c] font-medium text-2xl">Order Details</p>

        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={selectedStatus}
            onChange={handleFilterStatus}
            sx={{ height: "50px" }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="ongoing">Ongoing</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper} sx={{ border: "1px solid #e6e6e6" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FF9500" }}>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                Date
              </TableCell>{" "}
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                Order ID
              </TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                Service Provider
              </TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                Category
              </TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {order.date}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {order.email}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {order.orderId}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {order.serviceProvider}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {order.category}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <span
                      style={{
                        padding: "10px 15px",
                        borderRadius: "8px",
                        color: "white",
                        backgroundColor:
                          order.status.toLowerCase() === "completed"
                            ? "#34C759"
                            : order.status.toLowerCase() === "ongoing"
                            ? "#FFCC00"
                            : order.status.toLowerCase() === "cancelled"
                            ? "#f44336"
                            : "#9e9e9e",
                        fontWeight: "600",
                      }}
                    >
                      {order.status}
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
        count={filteredOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
