import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import HotelIcon from "@mui/icons-material/Hotel";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  BuildOutlined,
  DesignServicesOutlined,
  CodeOutlined,
  VideoLibraryOutlined,
  BrushOutlined,
  AppsOutlined,
} from "@mui/icons-material";
import "./styles.scss";

const ExploreService = () => {
  const navigate = useNavigate();

  const fetchApi = async () => {
    // Placeholder for API integration
    // const res = await authService.getServices();
    // console.log(res);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const services = [
    {
      id: 1,
      ServiceName: "Resort",
      image: <HomeWorkIcon style={{ width: "4rem", height: "37px" }} />,
    },
    {
      id: 2,
      ServiceName: "Rooms",
      image: <PeopleAltIcon style={{ width: "4rem", height: "37px" }} />,
    },
    {
      id: 3,
      ServiceName: "Hotels",
      image: <HotelIcon style={{ width: "4rem", height: "37px" }} />,
    },
    {
      id: 4,
      ServiceName: " Freelancer",
      image: <PeopleAltIcon style={{ width: "4rem", height: "37px" }} />,
    },
    {
      id: 5,
      ServiceName: "Photographers",
      image: <VideoLibraryOutlined style={{ width: "4rem", height: "37px" }} />,
    },
    {
      id: 6,
      ServiceName: "Stage Designers",
      image: (
        <DesignServicesOutlined style={{ width: "4rem", height: "37px" }} />
      ),
    },
  ];

  const handleService = () => {
    navigate("/services");
  };

  const handleServiceClick = (serviceName) => {
    navigate(`/service/${serviceName}`);
  };

  return (
    <Box sx={{ padding: "2rem", textAlign: "center" }}>
      <Typography
        sx={{
          color: "#17a2b8",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        Future
      </Typography>
      <Typography
        sx={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#343a40",
          marginBottom: "2rem",
        }}
      >
        Services
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(3, 1fr)",
          },
          gap: "1.5rem",
        }}
      >
        {services.map((item) => (
          <Box
            key={item.id}
            sx={{
              backgroundColor: "#f1f8ff",
              borderRadius: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "1.5rem",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => handleServiceClick(item.ServiceName)}
          >
            <Box
              src={item.image}
              alt={item.ServiceName}
              style={{
                width: "115px",
                height: "87px",
                objectFit: "contain",
                marginBottom: "1rem",
                borderRadius: "1rem",
              }}
              className="icon-container"
            >
              {item.image}
            </Box>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                marginBottom: "0.5rem",
                color: "#343a40",
              }}
            >
              {item.ServiceName}
            </Typography>
            <Typography
              sx={{
                color: "#6c757d",
                fontSize: "0.9rem",
              }}
            >
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>

      <Button
        variant="contained"
        onClick={handleService}
        sx={{
          marginTop: "2rem",
          padding: "0.5rem 2rem",
          textTransform: "capitalize",
          fontWeight: "bold",
          backgroundColor: "#007bff",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#0056b3",
          },
        }}
      >
        View All
      </Button>
    </Box>
  );
};

export default ExploreService;
