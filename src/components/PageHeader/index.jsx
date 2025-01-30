import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo2.png";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrencyIntl, getCurrentCity } from "../../utils/helperFunc";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import Calenders from "../../assets/Calenders.png";
import HomePage from "../../assets/homepage.png";
import AnalyticsImg from "../../assets/pieChart.png";
import Delivery from "../../assets/deliveryHome.png";
import Calendar from "../../pages/Calender";
import Settings from "../../assets/Settings.png";
import ShoppingCart from "../../assets/shoppingCart.png";
import Bell from "../../assets/bell.png";
import DeleteIcon from "@mui/icons-material/Delete";
import { logout } from "../../redux/slice/authSlice";

const PageHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currLocation, setCurrLocation] = useState({ city: "", town: "" });
  const [anchorEl, setAnchorEl] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const count = useSelector((state) => state.cart.cart.length);
  const cartItems = useSelector((state) => state.cart.cart);
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const dispatch = useDispatch();

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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close Profile Dropdown
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const totalPrice = cartItems.reduce((total, item) => {
    if (!item.product_price) return total;
    const price = item.product_price;
    return total + (price * item.quantity || 0);
  }, 0);
  // Logout User
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
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
                <Link
                  to={"/services"}
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
                  Services
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
                  Booking
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
                {isAuthenticated ? (
                  <>
                    <IconButton onClick={handleMenuOpen}>
                      {userDetails.profileImage ? (
                        <Avatar src={userDetails.profileImage} />
                      ) : (
                        <AccountCircleIcon fontSize="large" />
                      )}
                    </IconButton>

                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      PaperProps={{
                        sx: {
                          padding: "20px",
                          boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                          left: "1103px",
                          width: "26rem",
                        },
                      }}
                    >
                      {/* Profile Details */}
                      <Box className="profile-section">
                        <Typography variant="h6">
                          {userDetails.username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {userDetails.email}
                        </Typography>
                      </Box>
                      <Divider />

                      {/* Cart Details inside Profile Menu */}
                      <Box className="cart-dropdown">
                        <Typography variant="h6" sx={{ padding: "10px" }}>
                          Cart Items
                        </Typography>
                        {cartItems.length > 0 ? (
                          <List>
                            {cartItems.map((item) => (
                              <>
                                <ListItem
                                  key={item._id}
                                  className="cart-item"
                                  sx={{ display: "flex", gap: "2rem" }}
                                >
                                  <img
                                    src={item.product_image[0]}
                                    alt={item.product_name}
                                    style={{
                                      width: "41px",
                                      borderRadius: "2rem",
                                    }}
                                    className="cart-item-image"
                                  />
                                  <ListItemText
                                    primary={item.product_name}
                                    secondary={`$${item.product_price} x ${item.quantity}`}
                                  />
                                  <IconButton>
                                    <DeleteIcon color="error" />
                                  </IconButton>
                                </ListItem>
                                <Divider />
                              </>
                            ))}
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                                marginTop: "1rem",
                              }}
                            >
                              <Typography variant="p">
                                Total Tax:{" "}
                                {formatCurrencyIntl(totalPrice * 0.18)}
                              </Typography>
                              <Typography variant="p">
                                Total Price:{" "}
                                {formatCurrencyIntl(
                                  totalPrice * 1.18 - totalPrice * 0.02
                                )}
                              </Typography>
                            </Box>
                          </List>
                        ) : (
                          <Typography
                            textAlign="center"
                            sx={{ padding: "10px" }}
                          >
                            Your cart is empty.
                          </Typography>
                        )}
                      </Box>

                      <Divider />

                      {/* Buttons */}
                      <Box
                        className="profile-buttons"
                        sx={{
                          display: "flex",
                          width: "22rem",
                          gap: "4rem",
                          margin: "1rem",
                        }}
                      >
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          component={Link}
                          to="/cart"
                          onClick={handleMenuClose}
                        >
                          View Cart
                        </Button>
                        <Button
                          fullWidth
                          variant="contained"
                          color="error"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      </Box>
                    </Menu>
                  </>
                ) : (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => navigate("/signin")}
                  >
                    Signin
                  </Button>
                )}
              </Box>
            </Box>

            <IconButton
              edge="end"
              aria-label="menu"
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon fill="black" />
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
