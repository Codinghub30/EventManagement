import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import HotelIcon from "@mui/icons-material/Hotel";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  DesignServicesOutlined,
  VideoLibraryOutlined,
} from "@mui/icons-material";
import "./styles.scss";

const ExploreService = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Placeholder for API integration
  }, []);

  const services = [
    { id: 1, name: "Resort", icon: <HomeWorkIcon /> },
    { id: 2, name: "Rooms", icon: <PeopleAltIcon /> },
    { id: 3, name: "Hotels", icon: <HotelIcon /> },
    { id: 4, name: "Freelancer", icon: <PeopleAltIcon /> },
    { id: 5, name: "Photographers", icon: <VideoLibraryOutlined /> },
    { id: 6, name: "Stage Designers", icon: <DesignServicesOutlined /> },
  ];

  return (
    <Box sx={{ padding: "2rem", textAlign: "center" }}>
      <Typography
        sx={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#6a0dad",
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
        {services.map((service) => (
          <Box
            key={service.id}
            sx={{
              background: "linear-gradient(135deg, #e3cae4, #e35fea)",
              borderRadius: "12px",
              boxShadow: "0px 5px 15px rgba(160, 32, 240, 0.5)",
              padding: "2rem",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              color: "#fff",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 8px 20px rgba(160, 32, 240, 0.7)",
              },
            }}
            onClick={() => navigate(`/service/${service.name}`)}
          >
            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.2)",
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                marginBottom: "1rem",
                boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.3)",
              }}
            >
              {service.icon}
            </Box>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                marginBottom: "0.5rem",
              }}
            >
              {service.name}
            </Typography>
          </Box>
        ))}
      </Box>

      <Button
        variant="contained"
        onClick={() => navigate("/services")}
        sx={{
          marginTop: "2rem",
          padding: "0.7rem 2rem",
          fontWeight: "bold",
          fontSize: "1rem",
          background: "linear-gradient(90deg, #8a2be2, #4b0082)",
          color: "#fff",
          borderRadius: "8px",
          "&:hover": {
            background: "linear-gradient(90deg, #4b0082, #8a2be2)",
          },
        }}
      >
        View All
      </Button>
    </Box>
  );
};

export default ExploreService;
