import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper, Divider, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import authService from "../../../../api/ApiService";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../redux/slice/LoaderSlice";
import { getErrorMessage } from "../../../../utils/helperFunc";

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getBookingDetails = async () => {
      try {
        dispatch(setLoading(true));
        const res = await authService.getOrder(id);
        setBooking(res.data.orderId);
        console.log("The order Id", res.data);
        setProducts(res.data.orderId.product_data);
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        getErrorMessage(error);
      }
    };

    getBookingDetails();
  }, [id]);

  if (!booking) {
    return (
      <Typography variant="h6" className="loading-message">
        Loading booking details...
      </Typography>
    );
  }

  return (
    <Box className="booking-details-container">
      <Grid container spacing={2}>
        {/* Left Section */}
        <Grid item xs={12} md={8}>
          {/* Trip Summary */}
          <Paper className="booking-box" elevation={3}>
            <Typography variant="h6" className="section-title">
              Total: {products.length} items
            </Typography>
            <Box>
              <Box className="booking-product-container">
                {products.map((item) => (
                  <Box className="booking-products" key={item.id}>
                    {/* Product Image */}
                    {/* <Box className="product-image">
                        <img src={item.imageUrl} alt={item.productName} />
                      </Box> */}

                    {/* Product Details */}
                    <Box className="product-details">
                      <Typography className="product-name">
                        {item.productName}
                      </Typography>
                      <Typography className="product-dimensions">
                        Dimensions: {item.productDimension}
                      </Typography>
                      <Typography className="product-seller">
                        Seller: <strong>{item.sellerName}</strong>
                      </Typography>
                      <Typography className="product-store">
                        Store: {item.store}
                      </Typography>
                    </Box>

                    {/* Price and Quantity */}
                    <Box className="product-price-quantity">
                      <Typography className="product-price">
                        ₹{item.productPrice}
                      </Typography>
                      <Typography className="product-quantity">
                        Quantity: {item.quantity}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>

          {/* Traveller Details */}
          {/* <Paper className="traveller-details" elevation={3}>
            <Typography variant="h6" className="section-title">
              Traveller Details
            </Typography>
            <Box className="traveller-info">
              <Typography>{booking.traveller_name}</Typography>
              <Typography>
                {booking.traveller_age} yrs, {booking.traveller_gender}
              </Typography>
              <Typography>{booking.seat_type}</Typography>
            </Box>
          </Paper> */}

          {/* Contact Information */}
          <Paper className="booking-box" elevation={3}>
            <Typography variant="h6" className="section-title">
              Event Summary
            </Typography>
            <Divider className="divider" />
            <Box className="event-info">
              <Typography variant="p" className="event-info-details">
                <strong className="event-info-title">Event Name:</strong> &nbsp;{" "}
                <span>{booking.event_name}</span>
              </Typography>
              <Typography variant="p" className="event-info-details">
                <strong className="event-info-title">Location:</strong> &nbsp;{" "}
                {booking.event_location}
              </Typography>
              <Typography variant="p" className="event-info-details">
                <strong className="event-info-title">Date:</strong> &nbsp;{" "}
                {booking.event_date}
              </Typography>
              <Typography variant="p" className="event-info-details">
                <strong className="event-info-title">Start Time:</strong> &nbsp;{" "}
                {booking.event_start_time}
              </Typography>
              <Typography variant="p" className="event-info-details">
                <strong className="event-info-title">End Time:</strong> &nbsp;{" "}
                {booking.event_end_time}
              </Typography>
              <Typography variant="p" className="event-info-details">
                <strong className="event-info-title">Venue Name:</strong> &nbsp;{" "}
                {booking.venue_name}
              </Typography>
              <Typography variant="p" className="event-info-details">
                <strong className="event-info-title">Venue Open At:</strong>{" "}
                &nbsp; {booking.venue_open_time}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={4}>
          {/* Pricing Details */}
          <Paper className="pricing-details" elevation={3}>
            <Typography variant="h6" className="section-title">
              Pricing Breakdown
            </Typography>
            <Box>
              <Typography variant="p">
                Base Amount: ₹{booking.base_amount}
              </Typography>
              <Typography variant="p">
                TDS Charges ₹{booking.discount} {booking.tds_deduction}
              </Typography>
              <Typography variant="p">
                Amount After TDS Deduction ₹{booking.amount_after_deduction}
              </Typography>
              <Typography variant="p">
                Gst Applied Value ₹{booking.gst_applied_value}
              </Typography>
            </Box>
          </Paper>

          {/* Payment Details */}
          <Paper className="payment-details" elevation={3}>
            <Typography variant="h6" className="section-title">
              Payment Details
            </Typography>
            <Box>
              <Typography variant="p">
                Amount Paid: ₹{booking.paid_amount}
              </Typography>
              <Typography variant="p">
                Payment Method: {booking.payment_method}
              </Typography>
              <Typography variant="p">
                Payment Status: {booking.payment_status}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              className="invoice-button"
            >
              Download Invoice
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookingDetails;
