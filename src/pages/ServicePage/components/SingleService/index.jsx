import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Tab,
  Tabs,
  Grid,
  IconButton,
  Modal,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import ReviewSection from "./components/ReviewSection";
import "./styles.scss";
import authService from "../../../../api/ApiService";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../redux/slice/LoaderSlice";
import { getErrorMessage } from "../../../../utils/helperFunc";

const SingleService = () => {
  const { id } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const fetchServiceData = async () => {
    dispatch(setLoading(true));
    try {
      const response = await authService.getParticularService(id);
      setServiceData(response.data);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      getErrorMessage(error);
    }
  };

  useEffect(() => {
    fetchServiceData();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  if (!serviceData) return <Typography>Loading...</Typography>;

  return (
    <Box className="single-service">
      <Box
        className="header"
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <img
          src={serviceData.shop_image_or_logo}
          alt="Shop Logo"
          className="shop-logo"
        />
        <Typography variant="h4">{serviceData.shop_name}</Typography>
        <Typography variant="body1" color="textSecondary">
          ₹ {serviceData.pricing} / Day
        </Typography>
        <Typography variant="subtitle1">{serviceData.profession}</Typography>
        <Typography variant="body2">
          {serviceData.experience_in_business} years in Business
        </Typography>
        <Typography variant="body2">
          {serviceData.address[0]?.roadArea},{" "}
          {serviceData.address[0]?.cityDownVillage},{" "}
          {serviceData.address[0]?.state}, {serviceData.address[0].pincode}
        </Typography>
        <Typography variant="body2">
          Business Hours: Until {serviceData.business_hours[0].end_time}{" "}
          <Button variant="text" color="primary" onClick={toggleModal}>
            Show More
          </Button>
        </Typography>
      </Box>

      <Box className="contact-buttons">
        <IconButton
          href={`https://wa.me/${serviceData.mobile_number}`}
          target="_blank"
          color="success"
        >
          <WhatsAppIcon />
        </IconButton>
        <IconButton
          href={`tel:${serviceData.mobile_number}`}
          target="_blank"
          color="primary"
        >
          <PhoneIcon />
        </IconButton>
      </Box>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        className="tabs"
        centered
      >
        <Tab label="Services" />
        <Tab label="Reviews" />
        <Tab label="Photos" />
      </Tabs>

      {tabValue === 0 && (
        <Box className="services">
          {serviceData?.additional_services?.map((service, index) => (
            <Box key={index} className="service">
              <Typography variant="subtitle1">{service.parameter}</Typography>
              <Typography variant="body2">{service.value}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {tabValue === 1 && <ReviewSection id={id} />}

      {tabValue === 2 && (
        <Grid container spacing={2} className="photos">
          {serviceData.additional_images?.map((image, index) => (
            <Grid item xs={6} md={4} key={index}>
              <img src={image} alt={`Service ${index}`} className="photo" />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Modal for Business Hours */}
      <Modal open={openModal} onClose={toggleModal}>
        <Box className="modal-content">
          <Typography variant="h6" className="modal-header">
            Business Hours
          </Typography>
          {serviceData.business_hours?.map((hour, index) => (
            <Box key={index} className="business-hour">
              <Typography variant="body1" component="span">
                {hour.day}
              </Typography>
              <Typography
                variant="body2"
                component="span"
                className={new Date().getDay() - 1 === index ? "highlight" : ""}
              >
                {hour.start_time} - {hour.end_time}
              </Typography>
            </Box>
          ))}
          <Button variant="contained" color="secondary" onClick={toggleModal}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default SingleService;
