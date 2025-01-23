import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import "./styles.scss";
import { useSelector } from "react-redux";
import { getCurrentCity } from "../../utils/helperFunc";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

const PageHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentLocation, setCurrentLocation] = useState(
    "Fetching location..."
  );
  const count = useSelector((state) => state.cart.cart.length);
  const location = useLocation();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log("Search term:", event.target.value);
  };

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const city = await getCurrentCity();
        setCurrentLocation(city);
      } catch (error) {
        setCurrentLocation(error);
      }
    };

    fetchCity();
  }, []);
  return (
    <>
      <Container maxWidth="xl" className="header-main">
        <Toolbar disableGutters className="header-container">
          <span className="header-lists">Nithya</span>

          <Toolbar disableGutters className="header-container">
            <Box
              className="header-nav"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "0.6rem",
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Search events..."
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  width: "200px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.2)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#c026d3",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#c026d3",
                    },
                  },
                }}
              />
              <span className="header-list">Events in Bengaluru</span>

              <span
                className="header-list"
                style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}
              >
                <FmdGoodOutlinedIcon />
                {currentLocation}
              </span>
            </Box>
          </Toolbar>
        </Toolbar>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "9px 18px",
            color: "white",
            width: "95rem",
            marginLeft: "-24px",
            background:
              "linear-gradient(90deg, rgb(196, 70, 255) -14.33%, rgb(120, 1, 251) 38.59%, rgb(62, 0, 130) 98.88%)",
          }}
        >
          <Typography variant="h5">Nithya</Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                gap: "2.6rem",
                alignItems: "center",
                justifyContent: "end",
                marginLeft: "1rem",
              },
            }}
          >
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  // color: location.pathname === "/" ? "black" : "white",
                  color: "white",
                }}
                className="header-list"
              >
                Home
              </Box>
            </Link>

            <Link to={"/about"} style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  // color: location.pathname === "/about" ? "black" : "white",
                  color: "white",
                }}
                className="header-list"
              >
                About
              </Box>
            </Link>

            <Box
              sx={{
                // color: location.pathname === "/about#testimonials" ? "black" : "white",
                color: "white",
              }}
              className="header-list"
            >
              <a
                href="/about#testimonials"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Testimonials
              </a>
            </Box>

            <Box
              sx={{
                // color: location.pathname === "/testimonials" ? "black" : "white",
                color: "white",
              }}
              className="header-list"
            >
              <a
                href="/#faq"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                FAQ
              </a>
            </Box>

            <Box
              sx={{
                // color: location.pathname === '/categories' ? "black" : "white",
                color: "white",
              }}
              className="header-list"
            >
              <a
                href="/categories "
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Categories
              </a>
            </Box>

            <Link to={"/booking"} style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  // color: location.pathname === "/booking" ? "black" : "white",
                  color: "white",
                }}
                className="header-list"
              >
                My Booking
              </Box>
            </Link>

            <Link to={"/services"} style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  // color: location.pathname === "/booking" ? "black" : "white",
                  color: "white",
                }}
                className="header-list"
              >
                Services
              </Box>
            </Link>

            <Link to={"/cart"} style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  // color: location.pathname === "/cart" ? "black" : "white",
                  color: "white",
                }}
                className="header-list"
              >
                Cart
                <Box
                  sx={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: "-10px",
                    right: "-18px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {count}
                </Box>
              </Box>
            </Link>
            <Link to={"/account"} style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  // color: location.pathname === "/account" ? "black" : "white",
                  color: "white",
                }}
                className="header-list"
              >
                Account
              </Box>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default PageHeader;
