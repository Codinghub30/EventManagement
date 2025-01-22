// React related imports
import React, { useState } from "react";

// Third party library
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
  Modal,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  renderTimeViewClock,
} from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Custom Components
import authService from "../../../../api/ApiService";
import Terms from "../Terms";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../../redux/slice/CartSlice";
import CustomAlert from "../../../../components/CustomAlerts";

const FieldLabel = ({ label }) => (
  <Typography component="span">
    {label}
    <Typography component="span" sx={{ color: "red", marginLeft: "4px" }}>
      *
    </Typography>
  </Typography>
);

const EventDetails = ({ cartItems, billingDetails }) => {
  const [eventDetails, setEventDetails] = useState({
    eventDate: null,
    // venueStart:null,
    startTime: null,
    endTime: null,
    eventName: "",
    eventVenue: "",
    receiverName: "",
    receiverMobile: "",
    address: null,
    upload_invitation: "",
    upload_gatepass: "",
  });
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isCheckoutAllowed, setIsCheckoutAllowed] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const dispatch = useDispatch();

  console.log("Theee cartt", cartItems);

  const handleOpenAddressModal = () => {
    setIsAddressModalOpen(true);
  };

  const handleCloseAddressModal = () => {
    setIsAddressModalOpen(false);
  };

  const handleProceedToTerms = () => {
    setShowTerms(true);
  };

  const handleAcceptTerms = () => {
    setShowTerms(false);
    setIsCheckoutAllowed(true);
  };

  const handleAddressChange = (value) => {
    setEventDetails({ ...eventDetails, address: value });
    setIsAddressModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };
  const productData = cartItems?.map(
    (item, index) => (
      console.log("product data items", item),
      {
        orderId: `${Date.now()}${index}`,
        id: item._id || "undefined",
        productName: item.product_name || "Unknown",
        productPrice: item.product_price || 0,
        totalPrice: (item.product_price || 0) * (item.quantity || 1),
        quantity: item.quantity || 1,
        context: "product",
        sellerName: cartItems.vendor_name || "Unknown",
        sellerId: cartItems.vendor_id || "Unknown",
        eventStartDate: eventDetails.eventDate?.format("YYYY-MM-DD"),
        eventEndDate: eventDetails.eventDate
          ?.add(3, "days")
          .format("YYYY-MM-DD"),
      }
    )
  );

  const handleDateChange = (newDate) => {
    setEventDetails({ ...eventDetails, eventDate: newDate });
  };

  const handleTimeChange = (field, newTime) => {
    setEventDetails({ ...eventDetails, [field]: newTime });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setEventDetails({ ...eventDetails, [name]: files[0] });
  };

  const handleCheckout = async () => {
    if (
      !eventDetails.eventDate ||
      !eventDetails.startTime ||
      !eventDetails.endTime ||
      !eventDetails.eventName.trim() ||
      !eventDetails.eventVenue.trim() ||
      !eventDetails.receiverName.trim() ||
      !eventDetails.receiverMobile.trim()
    ) {
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();
    const userData = JSON.parse(sessionStorage.getItem("userDetails"));

    formData.append("event_date", eventDetails.eventDate?.format("YYYY-MM-DD"));
    // formData.append(
    //   "venue_start",
    //   eventDetails.eventDate?.format("YYYY-MM-DD")
    // );
    formData.append(
      "event_start_date",
      eventDetails.eventDate?.format("YYYY-MM-DD")
    );
    formData.append(
      "event_end_date",
      eventDetails.eventDate?.add(3, "days").format("YYYY-MM-DD") //static.....................
    );
    formData.append("event_name", eventDetails.eventName);
    formData.append("number_of_days", "4"); // static.........................

    formData.append("upload_invitation", eventDetails.upload_invitation);

    formData.append("upload_gatepass", eventDetails.upload_gatepass);

    formData.append("receiver_name", eventDetails.receiverName);
    formData.append("receiver_mobilenumber", eventDetails.receiverMobile);
    formData.append("product_data", JSON.stringify(productData));
    formData.append("user_id", userData?._id);
    formData.append("user_name", userData?.username);
    formData.append("user_mailid", userData?.email);
    formData.append("venue_name", eventDetails.eventVenue);
    formData.append(
      "venue_open_time",
      eventDetails.startTime?.format("hh:mm A")
    );
    formData.append("location_lat", "12.900526");
    formData.append("location_long", "77.5231878");
    formData.append("event_location", "Nakshatra Namaha Creations, Bangalore"); //static..............
    formData.append(
      "event_start_time",
      eventDetails.startTime?.format("hh:mm A")
    );
    formData.append("event_end_time", eventDetails.endTime?.format("hh:mm A"));
    formData.append(
      "cart_total",
      cartItems.reduce(
        (total, item) =>
          total + (item.product_price || 0) * (item.quantity || 1),
        0
      )
    );
    formData.append("base_amount", billingDetails?.baseAmount);
    formData.append("gst_applied_value", "15120");
    formData.append("tds_deduction", billingDetails.tdsCharges);
    formData.append("amount_after_deduction", billingDetails.amountAfterTds);
    formData.append("paid_amount", billingDetails.grandTotal);
    formData.append("payment_method", "offline"); //Need to change once I get api
    formData.append("order_status", "Order Placed"); //Need to change once I get api
    formData.append("payment_status", "success"); //Need to change once I get api
    formData.append("vendors_message", "Test");

    try {
      const response = await authService.createOrder(formData);
      console.log("Order Created Successfully:", response.data);
      alert("Order created successfully!");
    } catch (error) {
      console.error(
        "Error creating order:",
        error.response?.data || error.message
      );
      alert("Failed to create order. Please check console for details.");
    }

    dispatch(clearCart());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: "100%" }}>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Event Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DatePicker
                label={<FieldLabel label="Event Date" />}
                value={eventDetails.eventDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TimePicker
                label={<FieldLabel label="Venue Start Time" />}
                value={eventDetails.venueStart}
                onChange={(newTime) => handleTimeChange("venueStart", newTime)}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TimePicker
                label={<FieldLabel label="Event Start Time" />}
                value={eventDetails.startTime}
                onChange={(newTime) => handleTimeChange("startTime", newTime)}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <TimePicker
                label={<FieldLabel label="Event End Time" />}
                value={eventDetails.endTime}
                onChange={(newTime) => handleTimeChange("endTime", newTime)}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={<FieldLabel label="Event Name" />}
                name="eventName"
                value={eventDetails.eventName}
                onChange={handleChange}
                placeholder="Enter event name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={<FieldLabel label="Event Venue Name" />}
                name="eventVenue"
                value={eventDetails.eventVenue}
                onChange={handleChange}
                placeholder="Enter event venue"
                fullWidth
              />
            </Grid>
            <Grid container spacing={3}>
              {/* Select Address Field */}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={handleOpenAddressModal}
                >
                  {eventDetails.address
                    ? eventDetails.address.label
                    : "Select Address"}
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                name="invitation"
                onChange={(e) => handleFileChange(e)}
                accept="image/*"
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                name="gatePass"
                onChange={(e) => handleFileChange(e)}
                accept="image/*"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} mt={4}>
            <TextField
              label={<FieldLabel label="Receiver Name" />}
              name="receiverName"
              value={eventDetails.receiverName}
              onChange={handleChange}
              placeholder="Enter Receiver Name"
              // fullWidth
            />
            <TextField
              label={<FieldLabel label="Receiver Mobile Number" />}
              name="receiverMobile"
              value={eventDetails.receiverMobile}
              onChange={handleChange}
              placeholder="Enter Receiver Mobile Number"
              sx={{ marginLeft: "1rem" }}
            />
          </Grid>
          <Box mt={4} textAlign="center">
            {isCheckoutAllowed ? (
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleProceedToTerms}
              >
                Terms
              </Button>
            )}
          </Box>
        </Paper>

        <Modal
          open={showTerms}
          onClose={() => setShowTerms(false)}
          aria-labelledby="terms-modal-title"
          aria-describedby="terms-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: 600,
              bgcolor: "background.paper",
              border: "1px solid #000",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              height: "80vh",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <Terms onContinue={handleAcceptTerms} />
          </Box>
        </Modal>

        <Modal
          open={isAddressModalOpen}
          onClose={handleCloseAddressModal}
          aria-labelledby="address-modal-title"
          aria-describedby="address-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography
              id="address-modal-title"
              variant="h6"
              textAlign="center"
              gutterBottom
            >
              Search Address
            </Typography>
            {/* <GooglePlacesAutocomplete
              apiKey="YOUR_GOOGLE_PLACES_API_KEY" // Replace with your API key
              selectProps={{
                value: eventDetails.address,
                onChange: handleAddressChange,
                placeholder: "Search for an address",
              }}
            /> */}
          </Box>
        </Modal>
        <CustomAlert
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          message="Please fill in all mandatory fields before proceeding!"
        />
      </Box>
    </LocalizationProvider>
  );
};

export default EventDetails;
