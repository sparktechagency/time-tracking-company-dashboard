import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { LuBookCheck } from "react-icons/lu";
import { MdOutlineThumbUp } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

const laundryServices = [
  {
    id: 1,
    name: "Fresh & Clean Laundry",
    service: "laundry",
    image: "/public/Images/servicesImage/laundry.png",
    location: "New York, NY",
    details:
      "Fresh & Clean Laundry provides high-quality laundry services with an emphasis on eco-friendly detergents and quick turnaround times.",
    experience: "10 years",
    activeTime: "8 AM - 9 PM",
    priceRange: "$1-$100",
    booking: 120,
    services: 4,
    serviceType: "Full-service laundry",
    likes: 1500,
    activeDays: "Monday-Saturday",
    url: "fresh-clean-laundry",
  },
  {
    id: 2,
    name: "Quick Wash Express",
    service: "laundry",
    image: "/public/Images/servicesImage/laundry.png",
    location: "Los Angeles, CA",
    details:
      "At Quick Wash Express, we focus on delivering fast laundry services with high efficiency and competitive pricing. We ensure all items are treated with care.",
    experience: "5 years",
    activeTime: "7 AM - 8 PM",
    priceRange: "$5-$20",
    booking: 80,
    services: 3,
    serviceType: "Self-service & full-service laundry",
    likes: 850,
    activeDays: "Monday-Friday",
    url: "quick-wash-express",
  },
  {
    id: 3,
    name: "Luxury Laundry Service",
    service: "laundry",
    image: "/public/Images/servicesImage/laundry.png",
    location: "San Francisco, CA",
    details:
      "Luxury Laundry Service offers premium care for your delicate clothing, including custom treatments and hand-finishing. We cater to high-end garments.",
    experience: "15+ years",
    activeTime: "10 AM - 7 PM",
    priceRange: "$2-$50",
    booking: 20,
    services: 4,
    serviceType: "Premium laundry service",
    likes: 3200,
    activeDays: "Monday, Wednesday, Friday",
    url: "luxury-laundry-service",
  },
  {
    id: 4,
    name: "EcoFresh Laundry",
    service: "laundry",
    image: "/public/Images/servicesImage/laundry.png",
    location: "Chicago, IL",
    details:
      "EcoFresh Laundry is committed to using eco-friendly detergents and energy-efficient machines to provide you with the freshest laundry experience.",
    experience: "7 years",
    activeTime: "9 AM - 6 PM",
    priceRange: "$10-$100",
    booking: 30,
    services: 3,
    serviceType: "Eco-friendly laundry",
    likes: 1200,
    activeDays: "Monday-Thursday, Saturday",
    url: "ecofresh-laundry",
  },
  {
    id: 5,
    name: "Speedy Laundry Solutions",
    service: "laundry",
    image: "/public/Images/servicesImage/laundry.png",
    location: "Miami, FL",
    details:
      "Speedy Laundry Solutions is the go-to laundry service for people in a hurry. We guarantee fast pickup and delivery with same-day service for urgent requests.",
    experience: "3 years",
    activeTime: "24 hours a day",
    priceRange: "$40-$200",
    booking: 50,
    services: 3,
    serviceType: "Express laundry service",
    likes: 500,
    activeDays: "Sunday-Saturday",
    url: "speedy-laundry-solutions",
  },
];

const homeCleaningServices = [
  {
    id: 1,
    name: "Sparkling Home Cleaning",
    service: "home-cleaning",
    image: "/public/Images/servicesImage/homeClean.png",
    location: "New York, NY",
    details:
      "Sparkling Home Cleaning offers thorough cleaning services with a focus on environmentally friendly cleaning solutions for your home. We guarantee a spotless result every time.",
    experience: "8 years",
    activeTime: "8 AM - 6 PM",
    priceRange: "$1-$50",
    booking: 950,
    services: 5,
    serviceType: "Residential home cleaning",
    likes: 1300,
    activeDays: "Monday-Saturday",
    url: "sparkling-home-cleaning",
  },
  {
    id: 2,
    name: "Crystal Clear Home Cleaners",
    service: "home-cleaning",
    image: "/public/Images/servicesImage/homeClean.png",
    location: "Miami, FL",
    details:
      "Crystal Clear Home Cleaners specializes in deep cleaning, offering comprehensive cleaning services for every corner of your home with a special focus on bathrooms and kitchens.",
    experience: "10 years",
    activeTime: "9 AM - 6 PM",
    priceRange: "$2-$20",
    booking: 1500,
    services: 6,
    serviceType: "Deep cleaning for homes",
    likes: 1750,
    activeDays: "Monday-Sunday",
    url: "crystal-clear-home-cleaners",
  },
  {
    id: 3,
    name: "EcoClean Home Services",
    service: "home-cleaning",
    image: "/public/Images/servicesImage/homeClean.png",
    location: "Austin, TX",
    details:
      "EcoClean Home Services is dedicated to providing environmentally friendly home cleaning solutions with non-toxic products and a strong emphasis on sustainability.",
    experience: "5 years",
    activeTime: "8 AM - 5 PM",
    priceRange: "$10-$100",
    booking: 800,
    services: 4,
    serviceType: "Eco-friendly home cleaning",
    likes: 900,
    activeDays: "Monday-Saturday",
    url: "ecoclean-home-services",
  },
  {
    id: 4,
    name: "Pristine Home Care",
    service: "home-cleaning",
    image: "/public/Images/servicesImage/homeClean.png",
    location: "Chicago, IL",
    details:
      "Pristine Home Care focuses on delivering luxury home cleaning services, providing a personalized experience with high-end cleaning supplies and meticulous care.",
    experience: "15 years",
    activeTime: "10 AM - 7 PM",
    priceRange: "$5-$150",
    booking: 400,
    services: 5,
    serviceType: "Luxury residential cleaning",
    likes: 1200,
    activeDays: "Tuesday-Sunday",
    url: "pristine-home-care",
  },
];

const officeCleaningServices = [
  {
    id: 5,
    name: "Pro Office Cleaners",
    service: "office-cleaning",
    image: "/public/Images/servicesImage/image.png",
    location: "Dallas, TX",
    details:
      "Pro Office Cleaners offers reliable commercial office cleaning, including floor care, dusting, and sanitation of workspaces, ensuring a clean and productive environment.",
    experience: "8 years",
    activeTime: "7 AM - 6 PM",
    priceRange: "$1-$10",
    booking: 600,
    services: 4,
    serviceType: "Commercial office cleaning",
    likes: 1100,
    activeDays: "Monday-Friday",
    url: "pro-office-cleaners",
  },
  {
    id: 6,
    name: "Shine On Office Cleaning",
    service: "office-cleaning",
    image: "/public/Images/servicesImage/image.png",
    location: "Seattle, WA",
    details:
      "Shine On Office Cleaning provides detailed cleaning services for offices, including carpet cleaning, trash removal, and surface disinfecting to keep your workspace fresh and organized.",
    experience: "4 years",
    activeTime: "9 AM - 5 PM",
    priceRange: "$2-$20",
    booking: 450,
    services: 3,
    serviceType: "Office space maintenance",
    likes: 650,
    activeDays: "Monday-Saturday",
    url: "shine-on-office-cleaning",
  },
  {
    id: 7,
    name: "CleanSweep Office Solutions",
    service: "office-cleaning",
    image: "/public/Images/servicesImage/image.png",
    location: "Los Angeles, CA",
    details:
      "CleanSweep Office Solutions offers complete cleaning packages for commercial spaces, focusing on creating a healthy and productive work environment with sanitization and regular upkeep.",
    experience: "6 years",
    activeTime: "8 AM - 7 PM",
    priceRange: "$5-$80",
    booking: 1000,
    services: 5,
    serviceType: "Full-service office cleaning",
    likes: 1250,
    activeDays: "Monday-Friday",
    url: "cleansweep-office-solutions",
  },
];

const carWashServices = [
  {
    id: 8,
    name: "Ultimate Shine Car Wash",
    service: "car-wash",
    image: "/public/Images/servicesImage/carWash.png",
    location: "Atlanta, GA",
    details:
      "Ultimate Shine Car Wash specializes in providing thorough cleaning services for vehicles, with options for exterior washing, waxing, and full detailing, all performed by our expert team.",
    experience: "7 years",
    activeTime: "8 AM - 9 PM",
    priceRange: "$-10-$250",
    booking: 400,
    services: 4,
    serviceType: "Complete car wash & detailing",
    likes: 950,
    activeDays: "Monday-Sunday",
    url: "ultimate-shine-car-wash",
  },
  {
    id: 9,
    name: "EcoWash Car Detailing",
    service: "car-wash",
    image: "/public/Images/servicesImage/carWash.png",
    location: "Denver, CO",
    details:
      "EcoWash Car Detailing uses eco-friendly products to wash and detail your vehicle. We focus on sustainability while providing a premium car cleaning experience.",
    experience: "4 years",
    activeTime: "9 AM - 7 PM",
    priceRange: "$1-$50",
    booking: 350,
    services: 3,
    serviceType: "Eco-friendly car wash & detailing",
    likes: 800,
    activeDays: "Monday-Saturday",
    url: "ecowash-car-detailing",
  },
  {
    id: 10,
    name: "Spotless Car Wash",
    service: "car-wash",
    image: "/public/Images/servicesImage/carWash.png",
    location: "San Diego, CA",
    details:
      "Spotless Car Wash is known for offering quick and efficient exterior cleaning services, with a focus on high-quality finishes that leave your car looking flawless.",
    experience: "5 years",
    activeTime: "8 AM - 6 PM",
    priceRange: "$5-$160",
    booking: 500,
    services: 2,
    serviceType: "Basic exterior car wash",
    likes: 1200,
    activeDays: "Monday-Sunday",
    url: "spotless-car-wash",
  },
];

export default function Stores() {
  const [openAddModal, setOpenAddModal] = useState(false);

  const [newStoreName, setNewStoreName] = useState("");
  const [newStoreMotto, setNewStoreMotto] = useState("");
  const [newStoreDescription, setNewStoreDescription] = useState("");
  const [newStoreEmail, setNewStoreEmail] = useState("");
  const [newStorePhone, setNewStorePhone] = useState("");
  const [newStoreLocation, setNewStoreLocation] = useState("");
  const [newStoreCity, setNewStoreCity] = useState("");
  const [newStoreCountry, setNewStoreCountry] = useState("");
  const [newStoreExperience, setNewStoreExperience] = useState("");
  const [newStorePriceRange, setNewStorePriceRange] = useState("");
  const [newStoreBusinessTime, setNewStoreBusinessTime] = useState("");
  const [newStoreBusinessDays, setNewStoreBusinessDays] = useState("");
  const [newStoreProfilePic, setNewStoreProfilePic] = useState(null);
  const [newStoreGallery, setNewStoreGallery] = useState([]);

  const navigate = useNavigate();

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleSaveStore = () => {
    const newService = {
      id: Math.random(),
      name: newStoreName,
      motto: newStoreMotto,
      description: newStoreDescription,
      email: newStoreEmail,
      phone: newStorePhone,
      location: newStoreLocation,
      city: newStoreCity,
      country: newStoreCountry,
      experience: newStoreExperience,
      priceRange: newStorePriceRange,
      businessTime: newStoreBusinessTime,
      businessDays: newStoreBusinessDays,
      profilePic: newStoreProfilePic,
      gallery: newStoreGallery,
      url: newStoreName.toLowerCase().replace(/\s+/g, "-"),
    };
    console.log("laundry service", newService);
    laundryServices.push(newService);
    setOpenAddModal(false);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewStoreProfilePic(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => URL.createObjectURL(file));
    setNewStoreGallery(images);
  };

  const handleNavigateToDetails = (service) => {
    // console.log("service", service);
    navigate(`/store-details/${service.url}`, {
      state: { store: service },
    });
  };

  return (
    <div className="bg-[#fff9e3] px-20 py-8">
      <div className="flex flex-col gap-10 ">
        <div>
          <p className="text-4xl font-semibold text-[#002E54] mb-8">Laundry</p>
          <div className="flex items-center gap-5">
            {laundryServices.map((laundry) => {
              return (
                <div key={laundry.id}>
                  <Card sx={{ maxWidth: 300, padding: "10px" }}>
                    <CardMedia
                      component="img"
                      alt={laundry.name}
                      height="140"
                      image={laundry.image}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <p className="font-semibold text-lg">{laundry.name}</p>
                      <div className="flex items-center gap-1">
                        <FaLocationDot fontSize={14} color="#545454" />
                        <p className="text-sm text-[#545454]">
                          {laundry.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <LuBookCheck fontSize={14} color="#545454" />
                        <p className="text-sm text-[#545454]">
                          {laundry.booking} booking
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <MdOutlineThumbUp fontSize={14} color="#545454" />
                        <p className="text-sm text-[#545454]">
                          {laundry.likes} likes
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <BiSolidOffer fontSize={14} color="#545454" />
                        <p className="text-sm text-[#545454]">
                          Price Range ({laundry.priceRange})
                        </p>
                      </div>
                    </CardContent>
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        onClick={() => handleNavigateToDetails(laundry)}
                        size="small"
                        sx={{
                          textTransform: "none",
                          width: "100%",
                          background:
                            "linear-gradient(45deg,#F98108, #FFBD61, #EEDB07)",
                          border: "1px solid #EEDB07",
                          color: "white",
                          fontWeight: "500",
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center my-8">
            <Button
              onClick={handleOpenAddModal}
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
          </div>
        </div>
        <div>
          <p className="text-4xl font-semibold text-[#002E54] mb-8">
            Home Cleaning Service
          </p>
          <div className="flex items-center gap-5">
            {homeCleaningServices.map((service) => {
              return (
                <div key={service.id}>
                  <Card sx={{ maxWidth: 300, padding: "10px" }}>
                    <CardMedia
                      component="img"
                      alt={service.name}
                      height="140"
                      image={service.image}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <p className="font-semibold text-lg">{service.name}</p>
                      <div className="flex items-center gap-1">
                        <FaLocationDot fontSize={14} color="#545454" />
                        <p className="text-sm text-[#545454]">
                          {service.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <LuBookCheck fontSize={14} color="#545454" />
                        <p className="text-sm text-[#545454]">
                          {service.booking} booking
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <MdOutlineThumbUp fontSize={14} color="#545454" />
                        <p className="text-sm text-[#545454]">
                          {service.likes} likes
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <BiSolidOffer fontSize={14} color="#545454" />
                        <p className="text-sm text-[#545454]">
                          Price Range ({service.priceRange})
                        </p>
                      </div>
                    </CardContent>
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        onClick={() => handleNavigateToDetails(service)}
                        size="small"
                        sx={{
                          textTransform: "none",
                          width: "100%",
                          background:
                            "linear-gradient(45deg,#F98108, #FFBD61, #EEDB07)",
                          border: "1px solid #EEDB07",
                          color: "white",
                          fontWeight: "500",
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center my-8">
            <Button
              onClick={handleOpenAddModal}
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
          </div>
        </div>
        <div>
          <p className="text-4xl font-semibold text-[#002E54] mb-8">
            Office Cleaning Service
          </p>
          <div className="flex items-center gap-5">
            {officeCleaningServices.map((service) => {
              return (
                <div key={service.id}>
                  <Card sx={{ maxWidth: 300, padding: "10px" }}>
                    <CardMedia
                      component="img"
                      alt={service.name}
                      height="140"
                      image={service.image}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <p className="font-semibold text-lg">{service.name}</p>
                      <div className="flex items-center gap-1">
                        <FaLocationDot fontSize={14} color="#545454" />
                        <p className="text-sm text-[#545454]">
                          {service.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <LuBookCheck fontSize={14} color="#545454" />
                        <p className="text-sm text-[#545454]">
                          {service.booking} booking
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <MdOutlineThumbUp fontSize={14} color="#545454" />
                        <p className="text-sm text-[#545454]">
                          {service.likes} likes
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <BiSolidOffer fontSize={14} color="#545454" />
                        <p className="text-sm text-[#545454]">
                          Price Range ({service.priceRange})
                        </p>
                      </div>
                    </CardContent>
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        onClick={() => handleNavigateToDetails(service)}
                        size="small"
                        sx={{
                          textTransform: "none",
                          width: "100%",
                          background:
                            "linear-gradient(45deg,#F98108, #FFBD61, #EEDB07)",
                          border: "1px solid #EEDB07",
                          color: "white",
                          fontWeight: "500",
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center my-8">
            <Button
              onClick={handleOpenAddModal}
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
          </div>
        </div>
        <div>
          <p className="text-4xl font-semibold text-[#002E54] mb-8">
            Car Wash Service
          </p>
          <div className="flex items-center gap-5">
            {carWashServices.map((service) => {
              return (
                <div key={service.id}>
                  <Card sx={{ maxWidth: 300, padding: "10px" }}>
                    <CardMedia
                      component="img"
                      alt={service.name}
                      height="140"
                      image={service.image}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <p className="font-semibold text-lg">{service.name}</p>
                      <div className="flex items-center gap-1">
                        <FaLocationDot fontSize={14} color="#545454" />
                        <p className="text-sm text-[#545454]">
                          {service.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <LuBookCheck fontSize={14} color="#545454" />
                        <p className="text-sm text-[#545454]">
                          {service.booking} booking
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <MdOutlineThumbUp fontSize={14} color="#545454" />
                        <p className="text-sm text-[#545454]">
                          {service.likes} likes
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <BiSolidOffer fontSize={14} color="#545454" />
                        <p className="text-sm text-[#545454]">
                          Price Range ({service.priceRange})
                        </p>
                      </div>
                    </CardContent>
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        onClick={() => handleNavigateToDetails(service)}
                        size="small"
                        sx={{
                          textTransform: "none",
                          width: "100%",
                          background:
                            "linear-gradient(45deg,#F98108, #FFBD61, #EEDB07)",
                          border: "1px solid #EEDB07",
                          color: "white",
                          fontWeight: "500",
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center my-8">
            <Button
              onClick={handleOpenAddModal}
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
          </div>
        </div>
      </div>

      <Modal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        aria-labelledby="add-store-modal-title"
        aria-describedby="add-store-modal-description"
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
            minWidth: "600px",
          }}
        >
          <Typography id="add-store-modal-title" variant="h6" component="h2">
            Add New Store
          </Typography>

          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center border border-dashed">
            <p>Profile Picture</p>
            <Input
              type="file"
              onChange={handleProfilePicChange}
              sx={{ mt: 1 }}
            />
            {newStoreProfilePic && (
              <img
                src={newStoreProfilePic}
                alt="Profile Preview"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
              />
            )}
          </div>
          <div className="flex items-center gap-3">
            <TextField
              label="Store Name"
              variant="outlined"
              fullWidth
              value={newStoreName}
              onChange={(e) => setNewStoreName(e.target.value)}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Store Motto"
              variant="outlined"
              fullWidth
              value={newStoreMotto}
              onChange={(e) => setNewStoreMotto(e.target.value)}
              sx={{ mt: 2 }}
            />
          </div>
          <TextField
            label="Store Description"
            variant="outlined"
            fullWidth
            value={newStoreDescription}
            onChange={(e) => setNewStoreDescription(e.target.value)}
            sx={{ mt: 2 }}
          />
          <div className="flex items-center gap-3">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={newStoreEmail}
              onChange={(e) => setNewStoreEmail(e.target.value)}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={newStorePhone}
              onChange={(e) => setNewStorePhone(e.target.value)}
              sx={{ mt: 2 }}
            />
          </div>
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            value={newStoreLocation}
            onChange={(e) => setNewStoreLocation(e.target.value)}
            sx={{ mt: 2 }}
          />
          <div className="flex items-center gap-3">
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              value={newStoreCity}
              onChange={(e) => setNewStoreCity(e.target.value)}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Country"
              variant="outlined"
              fullWidth
              value={newStoreCountry}
              onChange={(e) => setNewStoreCountry(e.target.value)}
              sx={{ mt: 2 }}
            />
          </div>
          <div className="flex items-center gap-3">
            <TextField
              label="Business Time"
              variant="outlined"
              fullWidth
              value={newStoreBusinessTime}
              onChange={(e) => setNewStoreBusinessTime(e.target.value)}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Business Days"
              variant="outlined"
              fullWidth
              value={newStoreBusinessDays}
              onChange={(e) => setNewStoreBusinessDays(e.target.value)}
              sx={{ mt: 2 }}
            />
          </div>
          <div className="flex items-center gap-3">
            <TextField
              label="Experience (Years)"
              variant="outlined"
              fullWidth
              value={newStoreExperience}
              onChange={(e) => setNewStoreExperience(e.target.value)}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Price Range"
              variant="outlined"
              fullWidth
              value={newStorePriceRange}
              onChange={(e) => setNewStorePriceRange(e.target.value)}
              sx={{ mt: 2 }}
            />
          </div>

          {/* Gallery Upload */}
          <div>
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Gallery
            </Typography>
            <Input
              type="file"
              multiple
              onChange={handleGalleryChange}
              sx={{ mt: 1 }}
            />
            {newStoreGallery.length > 0 && (
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                {newStoreGallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Gallery ${index}`}
                    style={{ width: "100px", height: "100px" }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-5 justify-end mt-4">
            <Button
              onClick={handleSaveStore}
              sx={{
                width: "20%",
                height: "45px",
                textTransform: "none",
                background: "linear-gradient(45deg,#F98108, #FFBD61, #EEDB07)",
                border: "1px solid #EEDB07",
                color: "white",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveStore}
              sx={{
                width: "25%",
                height: "45px",
                textTransform: "none",
                background: "linear-gradient(45deg,#F98108, #FFBD61, #EEDB07)",
                border: "1px solid #EEDB07",
                color: "white",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              Save Changes
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
