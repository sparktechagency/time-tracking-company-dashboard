import { Button, Card, CardContent, CardMedia } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { LuStickyNote } from "react-icons/lu";
import { LuBookCheck } from "react-icons/lu";
import { IoTimeOutline } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { TbWheel } from "react-icons/tb";
import { LuThumbsUp } from "react-icons/lu";
import { FaCalendarAlt } from "react-icons/fa";
import { LuTruck } from "react-icons/lu";
import { MdOutlineThumbUp } from "react-icons/md";

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

export default function StoreDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const storeDetails = location.state.store;
  console.log("state", storeDetails);

  const handleNavigateToDetails = (service) => {
    // console.log("service", service);
    navigate(`/store-details/${service.url}`, {
      state: { store: service },
    });
  };

  const getRelatedServices = (serviceType) => {
    switch (serviceType) {
      case "laundry":
        return laundryServices.filter(
          (service) => service.id !== storeDetails.id
        );
      case "home-cleaning":
        return homeCleaningServices.filter(
          (service) => service.id !== storeDetails.id
        );
      case "office-cleaning":
        return officeCleaningServices.filter(
          (service) => service.id !== storeDetails.id
        );
      case "car-wash":
        return carWashServices.filter(
          (service) => service.id !== storeDetails.id
        );
      default:
        return [];
    }
  };

  const relatedServices = getRelatedServices(storeDetails?.service);

  const serviceHeading = () => {
    switch (storeDetails?.service) {
      case "laundry":
        return "More Laundry";
      case "home-cleaning":
        return "More Home Cleaning";
      case "office-cleaning":
        return "More Office Cleaning";
      case "car-wash":
        return "More Car Wash";
      default:
        return "More Services";
    }
  };

  const deleteStore = () => {
    console.log("delete service");
  };

  return (
    <div className="bg-[#fff9e3] p-6 h-screen">
      <div className="bg-white p-6">
        <div className="flex items-center gap-5">
          <div>
            <img
              src={storeDetails.image}
              alt={storeDetails.name}
              className="w-80"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-3xl font-semibold text-[#002E54]">
                  {storeDetails?.name}
                </p>
                <div className="flex items-center gap-2 text-[#8A8A8A]">
                  <FaLocationDot />
                  <p>{storeDetails?.location}</p>
                </div>
              </div>
              <Button
                onClick={deleteStore}
                sx={{
                  textTransform: "none",
                  bgcolor: "white",
                  border: "1px solid transparent",
                  borderImage:
                    "linear-gradient(45deg, #F98108, #FFBD61, #EEDB07) 1",
                  color: "black",
                  background:
                    "linear-gradient(45deg, #F98108, #FFBD61, #EEDB07)",
                  backgroundClip: "text",
                  fontWeight: "500",
                  width: "120px",
                }}
              >
                Delete
              </Button>
            </div>
            <p className="text-lg text-[#333333]">{storeDetails.details}</p>
          </div>
        </div>
        <div className="flex items-start justify-between mt-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <LuStickyNote className="text-xl" />
              <p className="font-medium">
                Experience - {storeDetails?.experience}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <BiSolidOffer className="text-xl" />
              <p className="font-medium">
                Price Range- {storeDetails?.priceRange}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <LuThumbsUp className="text-xl" />
              <p className="font-medium">{storeDetails?.likes} Likes</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <LuBookCheck className="text-xl" />
              <p className="font-medium">{storeDetails?.booking} Bookings</p>
            </div>
            <div className="flex items-center gap-3">
              <TbWheel className="text-xl" />
              <p className="font-medium">Services- {storeDetails?.services}</p>
            </div>
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-xl" />
              <p className="font-medium">{storeDetails?.activeDays}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <IoTimeOutline className="text-xl" />
              <p className="font-medium">{storeDetails?.activeTime}</p>
            </div>
            <div className="flex items-center gap-3">
              <LuTruck className="text-xl" />
              <p className="font-medium">{storeDetails?.serviceType}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          <Button
            sx={{
              textTransform: "none",
              background: "linear-gradient(45deg,#F98108, #FFBD61, #EEDB07)",
              border: "1px solid #EEDB07",
              color: "white",
              fontWeight: "500",
              width: "150px",
            }}
          >
            Add Services
          </Button>
          <Button
            sx={{
              textTransform: "none",
              background: "linear-gradient(45deg,#F98108, #FFBD61, #EEDB07)",
              border: "1px solid #EEDB07",
              color: "white",
              fontWeight: "500",
              width: "100px",
            }}
          >
            Edit
          </Button>
        </div>
      </div>
      <div>
        <p className="text-2xl font-semibold text-[#002E54] my-4">
          {serviceHeading()}
        </p>
        {relatedServices.length > 0 ? (
          <div className="flex gap-5">
            {relatedServices.map((service) => {
              return (
                <div key={service.id}>
                  <Card sx={{ maxWidth: 300, padding: "10px" }}>
                    <CardMedia
                      component="img"
                      alt={service.name}
                      height="120"
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
        ) : (
          <p>No related services found.</p>
        )}
      </div>
    </div>
  );
}
