import React, { useState } from "react";
import TransactionChart from "../Chart/TransactionChart";
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
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { FaEye } from "react-icons/fa";

const transactionData = [
  {
    user: "Alice Johnson",
    serviceProvider: "Spark Laundry",
    orderId: "ORD1001",
    totalCost: 150,
    myEarning: 45,
    date: "2025-01-10",
    accountNumber: "ACC123456789",
    tips: 10,
  },
  {
    user: "Bob Smith",
    serviceProvider: "Fresh Cleaners",
    orderId: "ORD1002",
    totalCost: 120,
    myEarning: 36,
    date: "2025-02-14",
    accountNumber: "ACC987654321",
    tips: 5,
  },
  {
    user: "Carol White",
    serviceProvider: "OfficeShine",
    orderId: "ORD1003",
    totalCost: 200,
    myEarning: 60,
    date: "2025-03-03",
    accountNumber: "ACC456789123",
    tips: 15,
  },
  {
    user: "David Lee",
    serviceProvider: "Quick Car Wash",
    orderId: "ORD1004",
    totalCost: 90,
    myEarning: 27,
    date: "2025-04-20",
    accountNumber: "ACC789123456",
    tips: 7,
  },
  {
    user: "Eva Green",
    serviceProvider: "Eco Laundry",
    orderId: "ORD1005",
    totalCost: 110,
    myEarning: 33,
    date: "2025-05-08",
    accountNumber: "ACC321654987",
    tips: 12,
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#fff9e3",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function Transactions() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="px-10 py-8 bg-[#FFF9E3] h-[92vh] overflow-auto">
      <div className="bg-white p-5 rounded-lg mb-5">
        <p className="text-lg font-semibold mb-5">Earning Stat</p>
        <TransactionChart />
      </div>

      <div className="bg-white p-5 rounded-lg">
        <p className="text-lg font-semibold mb-5">Transaction List</p>
        <TableContainer component={Paper} sx={{ maxHeight: 380 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#FF9500" }}>
                <TableCell
                  sx={{ color: "#fff", textAlign: "center", fontWeight: "600" }}
                >
                  User
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", textAlign: "center", fontWeight: "600" }}
                >
                  Service Provider
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", textAlign: "center", fontWeight: "600" }}
                >
                  Order ID
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", textAlign: "center", fontWeight: "600" }}
                >
                  Total Cost ($)
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", textAlign: "center", fontWeight: "600" }}
                >
                  My Earning ($)
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", textAlign: "center", fontWeight: "600" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((txn) => (
                  <TableRow key={txn.orderId}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {txn.user}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {txn.serviceProvider}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {txn.orderId}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {txn.totalCost}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {txn.myEarning}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        onClick={() => handleOpenModal(txn)}
                        sx={{
                          minWidth: 0,
                          padding: "6px",
                          backgroundColor: "transparent",
                          color: "#FF9500",
                          "&:hover": { backgroundColor: "#ffe3b8" },
                        }}
                        aria-label={`View details of order ${txn.orderId}`}
                      >
                        <FaEye size={20} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={transactionData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      {/* Modal for transaction details */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <p className="text-xl font-semibold text-center mb-6 text-[#FF9500]">
            Transaction Details
          </p>
          {selectedTransaction && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <p>Order Id:</p>
                <p className="font-semibold text-lg">
                  {selectedTransaction.orderId}
                </p>
              </div>
              <hr className="border-[#FFBD61]" />
              <div className="flex items-center justify-between">
                <p>Date:</p>
                <p className="font-semibold text-lg">
                  {selectedTransaction.date}
                </p>
              </div>
              <hr className="border-[#FFBD61]" />
              <div className="flex items-center justify-between">
                <p>User Name:</p>
                <p className="font-semibold text-lg">
                  {selectedTransaction.user}
                </p>
              </div>
              <hr className="border-[#FFBD61]" />
              <div className="flex items-center justify-between">
                <p>A/C Number:</p>
                <p className="font-semibold text-lg">
                  {selectedTransaction.accountNumber}
                </p>
              </div>
              <hr className="border-[#FFBD61]" />
              <div className="flex items-center justify-between">
                <p>Total Transaction Amount:</p>
                <p className="font-semibold text-lg">
                  {selectedTransaction.totalCost}
                </p>
              </div>{" "}
              <hr className="border-[#FFBD61]" />{" "}
              <div className="flex items-center justify-between">
                <p>Tips:</p>
                <p className="font-semibold text-lg">
                  {selectedTransaction.tips}
                </p>
              </div>
              <hr className="border-[#FFBD61]" />
              <div className="flex items-center justify-between">
                <p>Provider Name:</p>
                <p className="font-semibold text-lg">
                  {selectedTransaction.serviceProvider}
                </p>
              </div>
            </div>
          )}
          <Button
            variant="contained"
            onClick={handleCloseModal}
            sx={{
              mt: 3,
              backgroundColor: "#FF9500",
              "&:hover": { backgroundColor: "#e08600" },
              fontSize: "18px",
              textTransform: "none",
            }}
            fullWidth
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
