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
import Logo from "../../assets/logo2.png";
import "./styles.scss";
import { useSelector } from "react-redux";
import { getCurrentCity } from "../../utils/helperFunc";
import MenuIcon from "@mui/icons-material/Menu";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import Calenders from "../../assets/Calenders.png";
import HomePage from "../../assets/homepage.png";
import AnalyticsImg from "../../assets/pieChart.png";
import Delivery from "../../assets/deliveryHome.png";
import Calendar from "../../pages/Calender";
import Settings from "../../assets/Settings.png";
import ShoppingCart from "../../assets/shoppingCart.png";
import Bell from "../../assets/bell.png";

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
        <AppBar
          position="static"
          sx={{
            background: "#eaf7fe",
            width: "100% !important",
            borderRadius: "10px",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              gap: "3rem",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", gap: "3rem" }}>
              {/* <Typography
                variant="h5"
                component={Link}
                to="/"
                sx={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              > */}
              <img src={Logo} alt="Logo" />
              {/* </Typography> */}

              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: "1.5rem",
                  alignItems: "center",
                }}
              >
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <img
                    src={HomePage}
                    alt="Not found"
                    style={{ width: "18px", marginTop: "1px" }}
                  />
                  <Typography variant="p">Home</Typography>
                </Link>
                <Link
                  to="/about"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <img
                    src={AnalyticsImg}
                    alt="Not found"
                    style={{ width: "17px", marginTop: "1.5px" }}
                  />
                  Analytics
                </Link>
                <Link
                  to="/products"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <img
                    src={Delivery}
                    alt="Not found"
                    style={{ width: "17px", marginTop: "1.5px" }}
                  />
                  Products
                </Link>
                <Link
                  to={"/booking"}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <img
                    src={Settings}
                    alt="Not found"
                    style={{ width: "17px", marginTop: "1.5px" }}
                  />
                  Setting
                </Link>
              </Box>
            </Box>
            <Box>
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Link
                  to={"/cart"}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <img
                    src={ShoppingCart}
                    alt="Not found"
                    style={{ width: "17px", marginTop: "1.5px" }}
                  />
                </Link>

                <Link
                  to={"/cart"}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <img
                    src={Bell}
                    alt="Not found"
                    style={{ width: "17px", marginTop: "1.5px" }}
                  />
                </Link>
                <Button color="primary" variant="contained">
                  Signin
                </Button>
              </Box>
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
