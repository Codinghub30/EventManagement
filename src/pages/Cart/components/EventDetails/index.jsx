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
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  renderTimeViewClock,
} from "@mui/x-date-pickers";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Custom Components
import authService from "../../../../api/ApiService";
import Terms from "../Terms";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../../redux/slice/CartSlice";
import CustomAlert from "../../../../components/CustomAlerts";
import LocationSection from "./components/LocationSection";
import CustomModal from "../../../../components/CustomModal";
import OrderSummery from "./components/OrderSummery";
import { config } from "../../../../api/config";
import axios from "axios";

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
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [addLocation, setAddLocation] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");
  const { startDate, endDate, numberOfDays } = useSelector(
    (state) => state.date
  );

  const dispatch = useDispatch();

  const handleProceedToTerms = () => {
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
    } else {
      setShowTerms(true);
    }
  };

  const handleAcceptTerms = () => {
    setShowTerms(false);
    setIsCheckoutAllowed(true);
  };
  const handleLocationContinue = (locationData) => {
    setAddLocation(locationData.address);
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      event_location: locationData.address,
      location_lat: locationData.lat,
      location_long: locationData.lng,
    }));
    setOpenLocation(false);
  };

  const handleAddressChange = (value) => {
    setEventDetails({ ...eventDetails, address: value });
    setIsAddressModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const productData = cartItems?.map((item, index) => ({
    orderId: item._id,
    id: item._id || "undefined",
    productName: item.product_name || "Unknown",
    productPrice: item.product_price || 0,
    totalPrice: (item.product_price || 0) * (item.quantity || 1),
    quantity: item.quantity || 1,
    context: "product",
    sellerName: cartItems.vendor_name || "Unknown",
    sellerId: cartItems.vendor_id || "Unknown",
    eventStartDate: eventDetails.eventDate?.format("YYYY-MM-DD"),
    eventEndDate: eventDetails.eventDate?.add(3, "days").format("YYYY-MM-DD"),
  }));

  const handleDateChange = (newDate) => {
    setEventDetails({ ...eventDetails, eventDate: newDate });
  };

  const handleTimeChange = (field, newTime) => {
    setEventDetails({ ...eventDetails, [field]: newTime });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      console.log(`File selected for ${name}:`, files[0]);
      setEventDetails((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const handleConfirmOrder = async () => {
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
    formData.append("number_of_days", numberOfDays);

    formData.append("upload_invitation", eventDetails.upload_invitation);

    formData.append("upload_gatepass", eventDetails.upload_gatepass);

    formData.append("receiver_name", eventDetails.receiverName);
    formData.append("receiver_mobilenumber", eventDetails.receiverMobile);
    formData.append("product_data", JSON.stringify(productData));
    formData.append("user_id", userData._id); //userData._id
    formData.append("user_name", userData.username); //userData.username
    formData.append("user_mailid", userData.email); //userData.email
    formData.append("venue_name", eventDetails.eventVenue);
    formData.append(
      "venue_open_time",
      eventDetails.startTime?.format("hh:mm A")
    );
    formData.append("location_lat", 65545.4); //hardcoded
    formData.append("location_long", 12.553434); //hardcoded
    formData.append("event_location", "mysuru"); //hardcoded
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
      // const response = await authService.createOrder(formData);
      const response = await axios.post(
        `${config.BASEURL}${config.CREATE_ORDER}`,
        formData,
        {
          headers: {
            content: "multipart/form-data",
          },
        }
      );
      setOpenModal(true);
      setModalMessage("Order Created Successfully");
      setModalType("success");
      isOrderSummaryOpen(false);
    } catch (error) {
      console.error(
        "Error creating order:",
        error.response?.data || error.message
      );
      alert("Failed to create order. Please check console for details.");
    }

    dispatch(clearCart());
  };

  const handleModalClose = () => {
    setIsOrderSummaryOpen(false);
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
    setIsOrderSummaryOpen(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Box
          sx={{
            padding: "2rem",
            backgroundColor: "#f9f9f9",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "29rem",
            marginTop: "1rem",
          }}
        >
          {/* <Paper
          elevation={4}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 700,
            borderRadius: 2,
            backgroundColor: "#fff",
          }}
        > */}

          <Grid
            container
            spacing={3}
            sx={{
              "@media(max-width:600px)": {
                marginLeft: "6rem",
                width: "21rem",
              },
            }}
          >
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="600"
              sx={{
                padding: "1.5rem",
              }}
            >
              Event Details
            </Typography>

            <Grid item xs={12}>
              <DatePicker
                label={<FieldLabel label="Event Date" />}
                value={eventDetails.eventDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
                onChange={(e) =>
                  setEventDetails({
                    ...eventDetails,
                    eventName: e.target.value,
                  })
                }
                placeholder="Enter event name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={<FieldLabel label="Event Venue" />}
                name="eventVenue"
                value={eventDetails.eventVenue}
                onChange={(e) =>
                  setEventDetails({
                    ...eventDetails,
                    eventVenue: e.target.value,
                  })
                }
                placeholder="Enter venue name"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={<FieldLabel label="Receiver Name" />}
                name="receiverName"
                value={eventDetails.receiverName}
                onChange={(e) =>
                  setEventDetails({
                    ...eventDetails,
                    receiverName: e.target.value,
                  })
                }
                placeholder="Receiver Name"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={<FieldLabel label="Receiver Mobile" />}
                name="receiverMobile"
                value={eventDetails.receiverMobile}
                onChange={(e) =>
                  setEventDetails({
                    ...eventDetails,
                    receiverMobile: e.target.value,
                  })
                }
                placeholder="Receiver Mobile Number"
                fullWidth
              />
            </Grid>
            <Button
              sx={{
                width: "39rem",
                marginTop: "2rem",
                marginLeft: "2rem",
                border: "1px solid",
              }}
              onClick={() => setOpenLocation(!openLocation)}
            >
              Location
            </Button>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                // startIcon={<UploadFileIcon />}
              >
                Upload Invitation
                <input
                  type="file"
                  name="upload_invitation"
                  onChange={handleFileChange}
                  hidden
                />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                // startIcon={<UploadFileIcon />}
              >
                Upload Gate Pass
                <input
                  type="file"
                  name="upload_gatepass"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>
            <Box
              mt={4}
              textAlign="center"
              sx={{
                display: "flex",
                margin: "20px auto",
              }}
            >
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
          </Grid>

          {/* </Paper> */}
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
            open={isOrderSummaryOpen}
            onClose={handleModalClose}
            aria-labelledby="order-summary-title"
            aria-describedby="order-summary-description"
          >
            <OrderSummery
              cartItems={cartItems}
              billingDetails={billingDetails}
              handleConfirmOrder={handleConfirmOrder}
              handleModalClose={handleModalClose}
            />
          </Modal>
          <CustomModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            message={modalMessage}
            type={modalType}
          />
          {/* <Modal
          open={openLocation}
          onClose={() => setOpenLocation(false)}
          aria-labelledby="order-summary-title"
          aria-describedby="order-summary-description"
        > */}
          <Box sx={{ position: "relative" }}>
            {openLocation && (
              <Box
                sx={{
                  position: "absolute",
                  top: "90%",
                  transform: "translate(-120%, -50%)",
                  width: "50rem",
                  height: "600px",
                  maxWidth: 500,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  borderRadius: 2,
                  p: 3,
                  zIndex: "20",
                }}
              >
                <LocationSection
                  onContinue={handleLocationContinue}
                  setOpenLocation={setOpenLocation}
                />
              </Box>
            )}
          </Box>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={() => setSnackbarOpen(false)}
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              Please fill in all mandatory fields!
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default EventDetails;
