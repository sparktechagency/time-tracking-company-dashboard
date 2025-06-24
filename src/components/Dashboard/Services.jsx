import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

// Sample data
const serviceData = [
  {
    id: 1,
    serviceName: "Laundry",
    image: "/public/Images/servicesImage/image.png",
  },
  {
    id: 2,
    serviceName: "Laundry",
    image: "/public/Images/servicesImage/laundry.png",
  },
  {
    id: 3,
    serviceName: "Car Wash",
    image: "/public/Images/servicesImage/carWash.png",
  },
  {
    id: 4,
    serviceName: "Home Clean",
    image: "/public/Images/servicesImage/homeClean.png",
  },
];

export default function Services() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditAddModal, setOpenEditAddModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [newServiceName, setNewServiceName] = useState("");

  // Open/close delete modal
  const handleDeleteClick = (service) => {
    setSelectedService(service);
    setOpenDeleteModal(true);
  };

  const handleDeleteService = () => {
    console.log(`Deleting service: ${selectedService.serviceName}`);
    setOpenDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
  };

  // Open/close add/edit modal
  const handleEditService = (service) => {
    setSelectedService(service);
    setNewServiceName(service ? service.serviceName : "");
    setOpenEditAddModal(true);
  };

  const handleAddService = () => {
    setSelectedService(null);
    setNewServiceName("");
    setOpenEditAddModal(true);
  };

  const handleSaveService = () => {
    if (selectedService) {
      console.log(`Editing service: ${newServiceName}`);
    } else {
      console.log(`Adding new service: ${newServiceName}`);
    }
    setOpenEditAddModal(false);
  };

  return (
    <div className="flex flex-col items-center gap-10 px-10 py-8 bg-[#FFF9E3] h-[92vh]">
      <div className="flex items-center gap-5">
        {serviceData.map((service) => {
          return (
            <div key={service.id} className="flex items-center">
              <Card sx={{ maxWidth: 300, padding: "10px" }}>
                <CardMedia
                  component="img"
                  alt={service.serviceName}
                  height="140"
                  image={service.image}
                />
                <CardContent>
                  <p className="text-center font-semibold text-lg">
                    {service.serviceName}
                  </p>
                </CardContent>
                <div className="flex items-center justify-center gap-3">
                  <Button
                    onClick={() => handleDeleteClick(service)}
                    size="small"
                    sx={{
                      textTransform: "none",
                      bgcolor: "white",
                      border: "2px solid transparent",
                      borderImage:
                        "linear-gradient(45deg, #F98108, #FFBD61, #EEDB07) 1",
                      color: "transparent",
                      background:
                        "linear-gradient(45deg, #F98108, #FFBD61, #EEDB07)",
                      backgroundClip: "text",
                      fontWeight: "500",
                    }}
                  >
                    Delete
                  </Button>

                  <Button
                    onClick={() => handleEditService(service)}
                    size="small"
                    sx={{
                      textTransform: "none",
                      background:
                        "linear-gradient(45deg,#F98108, #FFBD61, #EEDB07)",
                      border: "1px solid #EEDB07",
                      color: "white",
                      fontWeight: "500",
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Add More Button */}
      <Button
        onClick={handleAddService}
        sx={{
          textTransform: "none",
          bgcolor: "#FF9500",
          color: "white",
          paddingLeft: "15px",
          paddingRight: "15px",
          width: "15%",
          height: "45px",
          display: "flex",
          gap: "5px",
        }}
      >
        <IoMdAdd className="text-white text-lg" />
        <p>Add More</p>
      </Button>

      {/* Delete Confirmation Modal */}
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: 24,
            minWidth: "300px",
          }}
        >
          <Typography id="delete-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this service?
          </Typography>

          <div className="flex justify-end gap-5 mt-4">
            <Button
              onClick={handleCancelDelete}
              sx={{
                bgcolor: "white",
                border: "2px solid transparent",
                borderImage:
                  "linear-gradient(45deg, #F98108, #FFBD61, #EEDB07) 1",
                color: "transparent",
                background: "linear-gradient(45deg, #F98108, #FFBD61, #EEDB07)",
                backgroundClip: "text",
                textTransform: "none",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteService}
              sx={{
                background: "linear-gradient(45deg,#F98108, #FFBD61, #EEDB07)",
                border: "1px solid #EEDB07",
                color: "white",
                fontWeight: "500",
              }}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Edit/Add Modal */}
      <Modal
        open={openEditAddModal}
        onClose={() => setOpenEditAddModal(false)}
        aria-labelledby="edit-add-modal-title"
        aria-describedby="edit-add-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: 24,
            minWidth: "400px",
          }}
        >
          <Typography id="edit-add-modal-title" variant="h6" component="h2">
            {selectedService ? "Edit Service" : "Add New Service"}
          </Typography>
          <TextField
            label="Service Name"
            variant="outlined"
            fullWidth
            value={newServiceName}
            onChange={(e) => setNewServiceName(e.target.value)}
            sx={{ mt: 2 }}
          />
          <div className="flex justify-between mt-4">
            <Button
              onClick={handleSaveService}
              sx={{
                width: "100%",
                height: "45px",
                textTransform: "none",
                background: "linear-gradient(45deg,#F98108, #FFBD61, #EEDB07)",
                border: "1px solid #EEDB07",
                color: "white",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              {selectedService ? "Save Service" : "Add Service"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
