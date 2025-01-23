// React Related imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Third party library
import { Box, Typography, Button, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const [technicians, setTechnicians] = useState([]);
  const dispatch = useDispatch();

  console.log("Carttesss", cartItems);

  const getTechnicians = async () => {
    try {
      const res = await authService.getAllTechnicians();
      setTechnicians(res.data.tech);
      console.log(res.data.tech);
    } catch (error) {
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
    <>
      <Box className="Cart-container">
        <Box className="Cart-items">
          <Typography variant="h5" className="Cart-title">
            My Cart
          </Typography>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <Box className="Cart-card" key={item._id}>
                <img
                  src={item.product_image}
                  className="Cart-image"
                  alt={item.name}
                />
                <Box className="Cart-details">
                  <Typography variant="subtitle1">
                    {item.product_name}
                  </Typography>
                  <Typography variant="subtitle2">
                    {item.product_price}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "2rem",
                      alignItems: "center",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <AddIcon
                      variant="contained"
                      color="primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => dispatch(quantityIncrement(item.id))}
                    />

                    <Typography variant="subtitle2">{item.quantity}</Typography>

                    <RemoveIcon
                      variant="contained"
                      color="primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => dispatch(quantityDecrement(item.id))}
                    />
                  </Box>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className="Remove-btn"
                    onClick={() => dispatch(removeFromCart(item._id))}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="subtitle1">Your cart is empty.</Typography>
          )}
        </Box>

        {/* Billing Section */}
        <Box className="Billing-summary">
          <Typography variant="h6" className="Billing-title">
            Bill Details
          </Typography>
          <Box className="Billing-row">
            <Typography>Cart Value:</Typography>
            <Typography>₹{totalPrice.toLocaleString()}</Typography>
          </Box>
          <Box className="Billing-row">
            <Typography>Event Days:</Typography>
            <Typography>2 Days</Typography>
          </Box>
          <Box className="Billing-row">
            <Typography>Base Amount:</Typography>
            <Typography>₹{(totalPrice * 0.9).toLocaleString()}</Typography>
          </Box>
          <Box className="Billing-row">
            <Typography>TDS Charges (2%):</Typography>
            <Typography>-₹{(totalPrice * 0.02).toLocaleString()}</Typography>
          </Box>
          <Box className="Billing-row">
            <Typography>Amount After TDS Deduction:</Typography>
            <Typography>₹{(totalPrice * 0.98).toLocaleString()}</Typography>
          </Box>
          <Box className="Billing-row">
            <Typography>CGST 9%:</Typography>
            <Typography>₹{(totalPrice * 0.09).toLocaleString()}</Typography>
          </Box>
          <Box className="Billing-row">
            <Typography>SGST 9%:</Typography>
            <Typography>₹{(totalPrice * 0.09).toLocaleString()}</Typography>
          </Box>
          <Box className="Billing-row">
            <Typography>Total GST (CGST + SGST):</Typography>
            <Typography>₹{(totalPrice * 0.18).toLocaleString()}</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box className="Billing-total">
            <Typography variant="h6">Grand Total:</Typography>
            <Typography variant="h6">
              ₹{(totalPrice * 1.18 - totalPrice * 0.02).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Box>
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
    </>
  );
};

export default Cart;
