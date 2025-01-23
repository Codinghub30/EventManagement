import { Box, Button, Typography } from "@mui/material";
import "./styles.scss";
import authService from "../../../../api/ApiService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ExploreService = () => {
  const navigate = useNavigate();
  const fetchApi = async () => {
    const res = await authService.getServices();
    console.log(res);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const services = [
    {
      id: 1,
      ServiceName: "Resort",
      image:
        "https://www.aquays.com/images/neil-island/outside/andaman-holiday-inn-resort.webp",
    },
    {
      id: 2,
      ServiceName: "Rooms",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKydMZxPp7ZSz-qBBTeD3WT4nh_yDb_Am2ng&s",
    },
    {
      id: 3,
      ServiceName: "Hotels",
      image:
        "https://www.gingerhotels.com/resourcefiles/hotelprofile/udaipur-0.jpg?version=1152025053419",
    },
    {
      id: 4,
      ServiceName: " Freelancer",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcCtv6bLcZPc_Ux301aMphk5fHYMvAG9JNnw&s",
    },
    {
      id: 5,
      ServiceName: " Photographers",
      image:
        "https://cdn.expertphotography.com/wp-content/uploads/2021/08/Become-Professional-Photographer-Colin-Lloyd.jpg",
    },
    {
      id: 6,
      ServiceName: "Stage Designer",
      image:
        "https://dean-www.s3.amazonaws.com/files/news/deancollegemarcom2018-218.jpg",
    },
  ];

  const handleService = () => {
    navigate("/services");
  };
  const colors = [
    // "#FFEBEE", // Light Red
    // "#E3F2FD", // Light Blue
    // "#E8F5E9", // Light Green
    // "#FFF3E0", // Light Orange
    // "#F3E5F5", // Light Purple
    // "#FBE9E7", // Light Pink
    "#32c0f0", // Light Red
    "#ff0064", // Light Blue
    "#00a89a", // Light Green
    "#0d162d", // Light Orange
    "#f44705", // Light Purple
    "#00a698", // Light Pink
  ];

  return (
    <Box className="Explore-container">
      <Box className="Service-header">
        <Box className="Service-header-content">
          <Typography variant="h5" className="header-title">
            Explore Services
          </Typography>
        </Box>

        <Button onClick={handleService}>view all</Button>
      </Box>
      <Box></Box>
      <Box className="service-container">
        {services.map((item, index) => (
          <Box
            className="service-card"
            key={item.id}
            sx={{
              backgroundColor: colors[index % colors.length],
            }}
          >
            <img src={item.image} alt={item.ServiceName} />
            <Typography variant="h6" className="service-name">
              {item.ServiceName}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ExploreService;
