/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
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
  IconButton,
  Modal,
  Button,
  CircularProgress,
} from "@mui/material";
import { GoEye } from "react-icons/go";
import { AiTwotoneDelete } from "react-icons/ai";
import { PiNotepadBold } from "react-icons/pi";
import { useAllProjectsQuery } from "../../Redux/api/projectApi";
import { getImageUrl } from "../../utils/baseUrl";

export default function RunningProjects() {
  const { data: allProjectsData, isLoading } = useAllProjectsQuery();
  const allProjects = allProjectsData?.data?.data || [];
  console.log("allProjectsData", allProjects);

  const [selectedStatus, setSelectedStatus] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const imageUrl = getImageUrl();

  const handleFilterStatus = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
  };

  const filterProjects = () => {
    let filtered = allProjects;

    if (selectedStatus && selectedStatus !== "all") {
      filtered = filtered.filter(
        (project) =>
          project.status.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    return filtered;
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (project) => {
    console.log(project);
    setSelectedProject(project);
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => setOpenDetailsModal(false);

  const handleViewNote = (project) => {
    setSelectedProject(project);
    setOpenNoteModal(true);
  };

  const handleCloseNoteModal = () => setOpenNoteModal(false);

  const handleOpenDeleteModal = (project) => {
    setSelectedProject(project);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDeleteProject = () => {
    console.log("Project deleted: ", selectedProject);
    setOpenDeleteModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  const filteredProjects = filterProjects();
  return (
    <div className="px-10 py-8 bg-[#efefef] h-[92vh]">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[#1c1c1c] font-medium text-2xl">Running Projects</p>

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
            <MenuItem value="pending">Ongoing</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper} sx={{ border: "1px solid #e6e6e6" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#C3D8E6" }}>
              <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                Serial No
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                Project Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                Assigned Employee
              </TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                Company
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
            {filteredProjects.length > 0 ? (
              filteredProjects
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((project, index) => (
                  <TableRow key={project.serialNo}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {index + 1 + page * rowsPerPage}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {project.title}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {project.assignedEmployee ?? "N/A"}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {project.company.name}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <span
                        style={{
                          padding: "10px 15px",
                          borderRadius: "8px",
                          color: "white",
                          backgroundColor:
                            project.status.toLowerCase() === "completed"
                              ? "#008000"
                              : project.status.toLowerCase() === "pending"
                              ? "#3F80AE"
                              : project.status.toLowerCase() === "cancelled"
                              ? "#f44336"
                              : "#9e9e9e",
                          fontWeight: "600",
                        }}
                      >
                        {project.status}
                      </span>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <div className="flex items-center justify-center gap-2">
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(project)}
                          sx={{
                            color: "#fff",
                            fontSize: "20px",
                            bgcolor: "#658065",
                            width: "30px",
                            height: "30px",
                            borderRadius: "4px",
                            "&:hover": {
                              color: "#658065",
                              border: "1px solid #658065",
                            },
                          }}
                        >
                          <GoEye />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleViewNote(project)}
                          sx={{
                            color: "#fff",
                            fontSize: "20px",
                            bgcolor: "#3F80AE",
                            width: "30px",
                            height: "30px",
                            borderRadius: "4px",
                            "&:hover": {
                              color: "#3F80AE",
                              border: "1px solid #3F80AE",
                            },
                          }}
                        >
                          <PiNotepadBold />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDeleteModal(project)}
                          sx={{
                            color: "#fff",
                            fontSize: "20px",
                            bgcolor: "#CC0505",
                            width: "30px",
                            height: "30px",
                            borderRadius: "4px",
                            "&:hover": {
                              color: "#CC0505",
                              border: "1px solid #CC0505",
                            },
                          }}
                        >
                          <AiTwotoneDelete />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                  No projects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredProjects.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* View Details Modal */}
      <Modal open={openDetailsModal} onClose={handleCloseDetailsModal}>
        <div className="w-[900px] bg-white p-10 m-auto mt-20 rounded-lg">
          <div>
            <h3 className="font-medium mb-5">View Details</h3>
            <img
              src={`${imageUrl}/${selectedProject?.images[0]}`}
              alt={selectedProject?.title}
              className="h-40 w-72"
            />
            <div className="flex flex-col gap-2 mt-5">
              <p className="text-[#333333] font-semibold text-lg">
                {selectedProject?.title}
              </p>
              {/* <p className="text-[#545454] text-lg">
                {selectedProject?.assignedEmployee}
              </p> */}
              <div>
                <p className="font-medium">Description:</p>
                <p className="text-sm">{selectedProject?.description}</p>
              </div>
              {/* <div>
                <p className="font-medium mb-2">Key Features</p>
                <ul className="ml-8">
                  {selectedProject?.keyFeatures.map((feature, index) => {
                    return (
                      <li className="list-disc text-sm" key={index}>
                        {feature}
                      </li>
                    );
                  })}
                </ul>
              </div> */}
              {/* <div>
                <p className="font-medium mb-2">Working Time</p>
                <div className="w-1/3">
                  <Table sx={{ border: "1px solid #ddd", borderRadius: "8px" }}>
                    <TableHead>
                      <TableRow>
                        {selectedProject?.workingTime.map((time, index) => (
                          <TableCell
                            key={index}
                            sx={{
                              border: "1px solid #ddd",
                              textAlign: "center",
                              fontWeight: "600",
                            }}
                          >
                            {time?.type}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        {selectedProject?.workingTime.map((time, index) => (
                          <TableCell
                            key={index}
                            sx={{
                              border: "1px solid #ddd",
                              textAlign: "center",
                            }}
                          >
                            {time?.time}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div> */}
            </div>
          </div>

          {/* <Button
            onClick={handleCloseDetailsModal}
            variant="outlined"
            sx={{ marginTop: 2 }}
          >
            Close
          </Button> */}
        </div>
      </Modal>
      {/* View Note Modal */}
      <Modal open={openNoteModal} onClose={handleCloseNoteModal}>
        <div className="w-[400px] bg-white p-8 m-auto mt-36 rounded-lg">
          <h3 className="font-medium mb-4 text-sm:">Project Note:</h3>
          <p className="text-lg">{selectedProject?.note}</p>
          {/* <Button
            onClick={handleCloseNoteModal}
            variant="outlined"
            sx={{
              bgcolor: "#3F80AE",
              color: "white",
              marginTop: "5px",
              textTransform: "none",
            }}
          >
            Close
          </Button> */}
        </div>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <div className="w-[400px] h-36 bg-white m-auto mt-40 p-6 rounded-lg flex flex-col items-center">
          <p className="mb-5">Are you sure you want to delete this project?</p>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleDeleteProject}
              variant="contained"
              sx={{
                bgcolor: "#CC0505",
              }}
            >
              Delete
            </Button>
            <Button
              onClick={handleCloseDeleteModal}
              sx={{
                border: "1px solid #CC0505",
                color: "#CC0505",
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
