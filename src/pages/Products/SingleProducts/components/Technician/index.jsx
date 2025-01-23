import React, { useEffect, useState } from "react";
import "./styles.scss";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Typography,
  CircularProgress,
} from "@mui/material";
import authService from "../../../../../api/ApiService";

const Technician = ({
  productCategory,
  onSelectTechnician,
  selectedTechnicians,
}) => {
  const [technicians, setTechnicians] = useState([]);
  const [filteredTechnicians, setFilteredTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        setLoading(true);

        const res = await authService.getAllTechnicians();
        setTechnicians(res.data.tech);
      } catch (error) {
        console.error("Error fetching technicians:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  useEffect(() => {
    if (productCategory) {
      const filtered = technicians.filter(
        (tech) => tech.category === productCategory
      );
      setFilteredTechnicians(filtered);
    }
  }, [productCategory, technicians]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          color: "#333",
        }}
      >
        Select a Technician for {productCategory || "Product"}
      </Typography>
      {filteredTechnicians.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
          }}
        >
          {filteredTechnicians.map((tech) => (
            <Card
              key={tech._id}
              sx={{
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "1.5rem",
                }}
              >
                <img
                  src={
                    tech.image ||
                    "https://centrechurch.org/wp-content/uploads/2022/03/img-person-placeholder.jpeg"
                  }
                  alt={tech.service_name}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "1rem",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#333",
                    marginBottom: "0.5rem",
                  }}
                >
                  {tech.service_name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    marginBottom: "1rem",
                  }}
                >
                  Category: {tech.category || "N/A"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    color: "#007BFF",
                    marginBottom: "1rem",
                  }}
                >
                  ₹{tech.price?.toLocaleString()}
                </Typography>
                <Checkbox
                  checked={selectedTechnicians?.some((t) => t._id === tech._id)}
                  onChange={() => onSelectTechnician(tech)}
                  color="primary"
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: 30 },
                  }}
                />
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: "center", mt: 3 }}
        >
          No technicians available for this category.
        </Typography>
      )}
    </Box>
  );
};

export default Technician;
