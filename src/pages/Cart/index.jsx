// React Related imports
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

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const [technicians, setTechnicians] = useState([]);
  const dispatch = useDispatch();
  const { startDate, endDate, numberOfDays } = useSelector(
    (state) => state.date
  );

  console.log("Carttesss", cartItems);

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
      <Grid container spacing={4}>
        {/* Product Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: "1.5rem", height: "315px" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, marginBottom: "1rem" }}
            >
              My Cart
            </Typography>
            {cartItems.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Price (₹)</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Total (₹)</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <img
                            src={item.product_image}
                            alt={item.product_name}
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: "cover",
                              borderRadius: 4,
                            }}
                          />
                        </TableCell>
                        <TableCell>{item.product_name}</TableCell>
                        <TableCell>
                          {item.product_price.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <IconButton
                              onClick={() =>
                                dispatch(quantityDecrement(item._id))
                              }
                              color="primary"
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography>{item.quantity}</Typography>
                            <IconButton
                              onClick={() =>
                                dispatch(quantityIncrement(item._id))
                              }
                              color="primary"
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {(
                            item.product_price * item.quantity
                          ).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => dispatch(removeFromCart(item._id))}
                            color="secondary"
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
              <Typography
                variant="p"
                sx={{
                  textAlign: "center",
                  display: "block",
                  marginTop: "3rem",
                }}
              >
                Your cart is empty.
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Billing Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: "1.5rem" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, marginBottom: "1rem" }}
            >
              Billing Summary
            </Typography>
            <Divider sx={{ marginBottom: "1rem" }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Cart Value:</Typography>
              <Typography>₹{totalPrice.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Event Days:</Typography>
              <Typography>{totalPrice > 0 ? numberOfDays : 0}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Base Amount:</Typography>
              <Typography>₹{(totalPrice * 0.9).toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>TDS Charges (2%):</Typography>
              <Typography>-₹{(totalPrice * 0.02).toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>CGST (9%):</Typography>
              <Typography>₹{(totalPrice * 0.09).toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>SGST (9%):</Typography>
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
              <Typography>Grand Total:</Typography>
              <Typography>
                ₹{(totalPrice * 1.18 - totalPrice * 0.02).toLocaleString()}
              </Typography>
            </Box>
          </Paper>
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

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Box,
//   Typography,
//   Button,
//   Divider,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
// } from "@mui/material";

// import authService from "../../api/ApiService";
// import {
//   addToCart,
//   quantityDecrement,
//   quantityIncrement,
//   removeFromCart,
// } from "../../redux/slice/CartSlice";
// import EventDetails from "./components/EventDetails";

// const Cart = () => {
//   const cartItems = useSelector((state) => state.cart.cart);
//   const dispatch = useDispatch();

//   const totalPrice = cartItems.reduce((total, item) => {
//     if (!item.product_price) return total;
//     return total + item.product_price * item.quantity;
//   }, 0);

//   useEffect(() => {
//     // Fetch technicians or other required data if needed
//   }, []);
