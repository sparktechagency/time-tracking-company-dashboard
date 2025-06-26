import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Chip,
  Box,
  InputAdornment,
} from "@mui/material";
import { LuImageUp } from "react-icons/lu";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectTime, setProjectTime] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [employeeInput, setEmployeeInput] = useState("");
  const [image, setImage] = useState(null);

  const handleAddEmployee = () => {
    if (employeeInput && !assignedEmployees.includes(employeeInput)) {
      setAssignedEmployees([...assignedEmployees, employeeInput]);
      setEmployeeInput("");
    }
  };

  const handleRemoveEmployee = (employee) => {
    setAssignedEmployees(assignedEmployees.filter((emp) => emp !== employee));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    console.log("Project Name:", projectName);
    console.log("Project Time:", projectTime);
    console.log("Project Description:", projectDescription);
    console.log("Assigned Employees:", assignedEmployees);
    console.log("Employee Input:", employeeInput);
  };

  return (
    <div className="px-10 py-8 bg-[#efefef] h-[92vh]">
      <p className="text-xl font-medium mb-5">Create New Projects Template</p>

      <div className="bg-white px-6 py-10 rounded-lg">
        <div className="flex items-center gap-5 mb-5">
          <div className="w-full flex flex-col gap-2">
            <p className="font-medium">Projects Name</p>
            <TextField
              label="Enter Project Name"
              variant="outlined"
              fullWidth
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="font-medium">Project Time</p>
            <TextField
              label="Enter Project Time"
              variant="outlined"
              value={projectTime}
              onChange={(e) => setProjectTime(e.target.value)}
              fullWidth
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="font-medium">Upload Project Photo</p>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                height: "55px",
                textTransform: "none",
                outline: "none",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <div className="flex items-center gap-1 text-[#3F80AE]">
                <p>Upload</p>
                <LuImageUp />
              </div>

              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
          </div>
          {image && (
            <div className="w-1/2">
              <img
                src={image}
                alt="Uploaded"
                style={{
                  marginTop: "10px",
                  width: "100%",
                  maxWidth: "200px",
                  height: "auto",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <p className="font-medium">Project Description</p>
          <TextField
            label="Enter Projects Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between bg-[#ECF2F7] rounded-lg">
          <div className="flex items-center gap-2">
            <p className="bg-[#C3D8E6] p-4 rounded-l-lg font-medium">
              Assigned To
            </p>
            <div className="flex gap-2">
              {assignedEmployees.map((employee, index) => (
                <Chip
                  key={index}
                  label={employee}
                  onDelete={() => handleRemoveEmployee(employee)}
                  deleteIcon={<span style={{ color: "#CC0505" }}>×</span>}
                  sx={{
                    paddingX: "5px",
                  }}
                />
              ))}
            </div>
            <div className="flex">
              <TextField
                label="Mention Employee"
                variant="outlined"
                fullWidth
                value={employeeInput}
                onChange={(e) => setEmployeeInput(e.target.value)}
              />
            </div>
          </div>
          <Button
            onClick={handleAddEmployee}
            disabled={!employeeInput}
            sx={{
              bgcolor: "#3F80AE",
              color: "white",
              padding: "10px",
              textTransform: "none",
              marginRight: "10px",
            }}
          >
            Mention Employee
          </Button>
        </div>
      </div>

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          float: "right",
          marginTop: "20px",
          width: "300px",
          height: "50px",
          textTransform: "none",
          fontSize: "18px",
          bgcolor: "#3F80AE",
        }}
      >
        Sent Now
      </Button>
    </div>
  );
};

export default CreateProject;
