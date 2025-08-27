import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AiTwotoneDelete } from "react-icons/ai";
import { GoEye } from "react-icons/go";
import { SlLock } from "react-icons/sl";

export default function EmployeeTable({
  filteredUsers,
  page,
  rowsPerPage,
  handleViewDetails,
  handleOpenBlockModal,
  handleOpenDeleteModal,
}) {
  return (
    <div>
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
                    {Number(employee.index) + 1}
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
    </div>
  );
}
