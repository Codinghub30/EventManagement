// React Related Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Third party library
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  Paper,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Table,
  TableBody,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

// Custom Components
import authService from "../../api/ApiService";
import {
  addToCart,
  quantityDecrement,
  quantityIncrement,
  removeFromCart,
} from "../../redux/slice/CartSlice";
import { getErrorMessage } from "../../utils/helperFunc";
import EventDetails from "./components/EventDetails";

// Styles
import "./styles.scss";
import { setLoading } from "../../redux/slice/LoaderSlice";
import BreadCrumb from "../../components/BreadCrumb";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const [technicians, setTechnicians] = useState([]);
  const dispatch = useDispatch();
  const { startDate, endDate, numberOfDays } = useSelector(
    (state) => state.date
  );

  const breadcrumbPaths = [
    { label: "Home", link: "/" },
    { label: "Products", link: "/products" },
    { label: "Cart", link: "cart" },
  ];

  const getTechnicians = async () => {
    dispatch(setLoading(true));
    try {
      const res = await authService.getAllTechnicians();
      setTechnicians(res.data.tech);
      console.log(res.data.tech);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      getErrorMessage(error);
    }
  };
  const handleAddTechnicianToCart = (technician) => {
    const technicianItem = {
      _id: technician._id,
      product_image:
        "https://centrechurch.org/wp-content/uploads/2022/03/img-person-placeholder.jpeg",
      product_name: `${technician.service_name} (${technician.category})`,
      product_price: technician.price,
      quantity: 1,
      vendor_name: technician.vendor_name,
    };

    dispatch(addToCart(technicianItem));
  };
  const totalPrice = cartItems.reduce((total, item) => {
    if (!item.product_price) return total;
    const price = item.product_price;
    return total + (price * item.quantity || 0);
  }, 0);

  useEffect(() => {
    getTechnicians();
  }, []);

  return (
    <Box sx={{ padding: "2rem" }}>
      <BreadCrumb paths={breadcrumbPaths} />

      <Typography
        variant="h4"
        sx={{ fontWeight: 600, marginBottom: "1rem", color: "#1a365d" }}
      >
        Cart
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Product Section */}
        <Grid item xs={12} md={8}>
          {/* <Paper elevation={3} sx={{ padding: "1.5rem" }}> */}
          {cartItems.length > 0 ? (
            <TableContainer sx={{ width: "90%" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Product Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Qty</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Subtotal</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <img
                          src={item.product_image[0]}
                          alt={item.product_name}
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: "cover",
                            borderRadius: 4,
                          }}
                        />
                        <Box>
                          <Typography fontWeight="bold">
                            {item.product_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.vendor_name || "Leather Coach Bag"}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>${item.product_price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "5px",
                            width: "7rem",
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              dispatch(quantityDecrement(item._id))
                            }
                            disabled={item.quantity === 1}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography sx={{ margin: "0 10px" }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() =>
                              dispatch(quantityIncrement(item._id))
                            }
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell>
                        ${(item.product_price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => dispatch(removeFromCart(item._id))}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography textAlign="center" sx={{ marginTop: "3rem" }}>
              Your cart is empty.
            </Typography>
          )}
          {/* </Paper> */}
        </Grid>

        {/* Order Summary Section */}
        <Grid item xs={12} md={4}>
          {/* <Paper elevation={3} sx={{ padding: "1.5rem", borderRadius: "8px" }}> */}
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, marginBottom: "1rem" }}
          >
            Order Summery
          </Typography>
          <Divider sx={{ marginBottom: "1rem" }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="p" sx={{ color: "#626262" }}>
              Cart Value:
            </Typography>
            <Typography>₹{totalPrice.toLocaleString()}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="p" sx={{ color: "#626262" }}>
              Event Days:
            </Typography>
            <Typography>{totalPrice > 0 ? numberOfDays : 0}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="p" sx={{ color: "#626262" }}>
              Base Amount:
            </Typography>
            <Typography>₹{(totalPrice * 0.9).toLocaleString()}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="p" sx={{ color: "#626262" }}>
              TDS Charges (2%):
            </Typography>
            <Typography>-₹{(totalPrice * 0.02).toLocaleString()}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="p" sx={{ color: "#626262" }}>
              CGST (9%):
            </Typography>
            <Typography>₹{(totalPrice * 0.09).toLocaleString()}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="p" sx={{ color: "#626262" }}>
              SGST (9%):
            </Typography>
            <Typography>₹{(totalPrice * 0.09).toLocaleString()}</Typography>
          </Box>
          <Divider sx={{ margin: "1rem 0" }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
            }}
          >
            <Typography variant="p" sx={{ fontWeight: 500 }}>
              Grand Total:
            </Typography>
            <Typography>
              ₹{(totalPrice * 1.18 - totalPrice * 0.02).toLocaleString()}
            </Typography>
          </Box>
          {/* </Paper> */}
        </Grid>
      </Grid>

      {/* Event Details */}
      <EventDetails
        cartItems={cartItems}
        billingDetails={{
          cartValue: totalPrice,
          eventDays: 2,
          baseAmount: totalPrice * 0.9,
          tdsCharges: totalPrice * 0.02,
          amountAfterTds: totalPrice * 0.98,
          cgst: totalPrice * 0.09,
          sgst: totalPrice * 0.09,
          totalGst: totalPrice * 0.18,
          grandTotal: totalPrice * 1.18 - totalPrice * 0.02,
        }}
      />
    </Box>
  );
};

export default Cart;
