import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import "./styles.scss";
import { useSelector } from "react-redux";
import { getCurrentCity } from "../../utils/helperFunc";
import MenuIcon from "@mui/icons-material/Menu";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import Calenders from "../../assets/Calenders.png";
import Calendar from "../../pages/Calender";

const PageHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currLocation, setCurrLocation] = useState({ city: "", town: "" });
  const count = useSelector((state) => state.cart.cart.length);
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleOpenCalender = () => {
    setIsCalendarOpen(true);
  };

  const handleCalendarClose = () => {
    setIsCalendarOpen(false);
  };

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const locationData = await getCurrentCity();
        setCurrLocation(locationData);
      } catch (error) {
        setCurrLocation(error);
      }
    };

    fetchCity();
  }, []);
  return (
    <>
      <Box className="header-main">
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
                placeholder="Search for services..."
                size="small"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "50px",
                  width: { xs: "200px", sm: "300px", md: "400px" },
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease-in-out",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.2)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#4caf50",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4caf50",
                      borderWidth: "2px",
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                disabled={!searchTerm.trim()}
                sx={{
                  marginLeft: "0.5rem",
                  background:
                    "linear-gradient(90deg, rgb(62, 0, 130) 98.88%), rgb(120, 1, 251) 38.59%, rgb(196, 70, 255) -14.33%",
                  color: "#fff",
                  padding: "0.5rem 1.5rem",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  textTransform: "none",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, rgb(196, 70, 255) -14.33%, rgb(120, 1, 251) 38.59%, rgb(62, 0, 130) 98.88%)",
                    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
                  },
                  "&:disabled": {
                    background: "#ccc",
                    cursor: "not-allowed",
                  },
                }}
              >
                Search
              </Button>

              {/* <span className="header-list">Events in Bengaluru</span> */}
              <div
                className="header-listing"
                style={{ display: "flex", alignItems: "center" }}
                onClick={handleOpenCalender}
              >
                <img
                  style={{ width: "4rem", height: "60px" }}
                  src="https://static.vecteezy.com/system/resources/previews/048/116/176/non_2x/deadline-timetable-schedule-meeting-appointment-outline-icon-free-png.png"
                  alt="Not Found"
                />
              </div>

              <span
                className="header-list"
                style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}
              >
                <FmdGoodOutlinedIcon />
                {currLocation.town}, {currLocation.city}
              </span>
            </Box>
          </Toolbar>
        </Toolbar>

        <AppBar
          position="static"
          sx={{
            background:
              "linear-gradient(90deg, rgb(196, 70, 255), rgb(62, 0, 130))",
            width: "100% !important",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Nithya
            </Typography>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: "1.5rem",
                alignItems: "center",
              }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Home
              </Link>
              <Link
                to="/about"
                style={{ textDecoration: "none", color: "white" }}
              >
                About
              </Link>
              <Link
                to="/categories"
                style={{ textDecoration: "none", color: "white" }}
              >
                Categories
              </Link>
              <Link to={"/booking"} style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    color: "white",
                  }}
                >
                  My Booking
                </Box>
              </Link>

              <Link
                to="/services"
                style={{ textDecoration: "none", color: "white" }}
              >
                Services
              </Link>
              <Link to={"/products"} style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    color: "white",
                  }}
                >
                  Products
                </Box>
              </Link>
              <Link to={"/cart"} style={{ textDecoration: "none" }}>
                <Box
                  sx={{
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
              <Link
                to="/account"
                style={{ textDecoration: "none", color: "white" }}
              >
                Account
              </Link>
            </Box>

            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>

          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            <Box
              sx={{
                width: 250,
                padding: "1rem",
              }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  marginBottom: "1rem",
                  fontWeight: "bold",
                  color: "rgb(196, 70, 255)",
                }}
              >
                Menu
              </Typography>
              <Divider />
              <List>
                <ListItem button component={Link} to="/">
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/about">
                  <ListItemText primary="About" />
                </ListItem>
                <ListItem button component={Link} to="/categories">
                  <ListItemText primary="Categories" />
                </ListItem>
                <ListItem button component={Link} to="/booking">
                  <ListItemText primary="Bookings" />
                </ListItem>
                <ListItem button component={Link} to="/services">
                  <ListItemText primary="Services" />
                </ListItem>
                <ListItem button component={Link} to="/cart">
                  <ListItemText primary="Cart" />
                </ListItem>
                <ListItem button component={Link} to="/account">
                  <ListItemText primary="Account" />
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </AppBar>
      </Box>
      <Modal open={isCalendarOpen} onClose={handleCalendarClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "16px",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
            p: 4,
            width: "450px",
            maxWidth: "95%",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              marginBottom: "20px",
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            <Calendar handleCalendarClose={handleCalendarClose} />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              onClick={handleCalendarClose}
              sx={{
                flex: 1,
                background: "linear-gradient(90deg, #ff6f61, #ff8a73)",
                color: "#fff",
                textTransform: "uppercase",
                fontWeight: "bold",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  background: "linear-gradient(90deg, #ff8a73, #ff6f61)",
                },
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default PageHeader;
