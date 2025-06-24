import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { MdEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";

const initialData = [
  {
    businessName: "Shine Time Car Wash",
    description: "Best Clean With Us For ....",
    cost: "$5",
    deadline: "17 Jan 2025",
    status: "Active",
  },
  {
    businessName: "Shine Time Car Wash",
    description: "Best Clean With Us For ....",
    cost: "$5",
    deadline: "17 Jan 2025",
    status: "Active",
  },
  {
    businessName: "Shine Time Car Wash",
    description: "Best Clean With Us For ....",
    cost: "$5",
    deadline: "17 Jan 2025",
    status: "Inactive",
  },
  {
    businessName: "Shine Time Car Wash",
    description: "Best Clean With Us For ....",
    cost: "$5",
    deadline: "17 Jan 2025",
    status: "Active",
  },
  {
    businessName: "Shine Time Car Wash",
    description: "Best Clean With Us For ....",
    cost: "$5",
    deadline: "17 Jan 2025",
    status: "Active",
  },
];

const MyTable = () => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false); // New state for details modal
  const [currentRow, setCurrentRow] = useState(null);
  const [formValues, setFormValues] = useState({
    businessName: "",
    description: "",
    cost: "",
    deadline: "",
    status: "",
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = (row) => {
    if (row) {
      setCurrentRow(row);
      setFormValues({ ...row });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRow(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {
    if (currentRow) {
      const updatedData = data.map((row) =>
        row.businessName === currentRow.businessName
          ? { ...row, ...formValues }
          : row
      );
      setData(updatedData);
    } else {
      setData([...data, { ...formValues, status: "Active" }]);
    }
    handleClose();
  };

  const handleDetailsOpen = (row) => {
    setCurrentRow(row);
    setDetailsOpen(true); // Open the details modal
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
    setCurrentRow(null);
  };

  return (
    <div className="bg-[#fff9e3] p-8 h-screen">
      <div className="flex justify-end mb-5">
        <Button
          sx={{
            bgcolor: "#FF9500",
            color: "white",
            textTransform: "none",
            width: "120px",
          }}
          onClick={() => handleOpen(null)}
        >
          + Add More
        </Button>
      </div>

      <div className="bg-white p-5">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#FF9500" }}>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  Business Name
                </TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  Description Of Ad
                </TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  Cost
                </TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  Deadline
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
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.businessName}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.description}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.cost}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.deadline}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor:
                            row.status === "Active" ? "#9BF8B8" : "#FF3B3066",
                          color: row.status === "Active" ? "#000" : "#fff",
                          "&:hover": {
                            backgroundColor:
                              row.status === "Active" ? "#77d8b7" : "#ff2b1f",
                          },
                        }}
                      >
                        {row.status}
                      </Button>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton onClick={() => handleDetailsOpen(row)}>
                        <IoEyeOutline />
                      </IconButton>{" "}
                      <IconButton onClick={() => handleOpen(row)}>
                        <MdEdit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>

      {/* Modal for editing and adding */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {currentRow ? "Edit Advertisement" : "Add New Advertisement"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Business Name"
            name="businessName"
            value={formValues.businessName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cost"
            name="cost"
            value={formValues.cost}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Deadline"
            name="deadline"
            value={formValues.deadline}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              name="status"
              value={formValues.status}
              onChange={handleInputChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              textTransform: "none",
              bgcolor: "white",
              border: "1px solid transparent",
              borderImage:
                "linear-gradient(45deg, #F98108, #FFBD61, #EEDB07) 1",
              color: "black",
              background: "linear-gradient(45deg, #F98108, #FFBD61, #EEDB07)",
              backgroundClip: "text",
              fontWeight: "500",
              width: "100px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            sx={{
              textTransform: "none",
              background: "linear-gradient(45deg,#F98108, #FFBD61, #EEDB07)",
              border: "1px solid #EEDB07",
              color: "white",
              fontWeight: "500",
              width: "100px",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Modal for viewing details */}
      <Dialog open={detailsOpen} onClose={handleDetailsClose}>
        <DialogTitle>Entry Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Business Name"
            value={currentRow?.businessName}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Description"
            value={currentRow?.description}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Cost"
            value={currentRow?.cost}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Deadline"
            value={currentRow?.deadline}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Status"
            value={currentRow?.status}
            fullWidth
            margin="normal"
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDetailsClose}
            sx={{
              textTransform: "none",
              background: "linear-gradient(45deg,#F98108, #FFBD61, #EEDB07)",
              border: "1px solid #EEDB07",
              color: "white",
              fontWeight: "500",
              width: "100px",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyTable;
