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
  console.log(serviceData);

  return (
    <Box className="single-service">
      {/* Hero Section */}
      <Box className="hero-section">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fm=jpg&q=60&w=3000"
          alt="Service"
          className="hero-image"
        />
        <Box className="hero-overlay">
          <Typography variant="h3">{serviceData.shop_name}</Typography>
          <Typography variant="subtitle1">{serviceData.profession}</Typography>
          <Typography variant="body1">₹ {serviceData.pricing} / Day</Typography>
          <Typography variant="body2">
            {serviceData.experience_in_business} years in Business
          </Typography>
          <Typography variant="body2">
            {serviceData.address[0]?.roadArea},{" "}
            {serviceData.address[0]?.cityDownVillage},{" "}
            {serviceData.address[0]?.state}, {serviceData.address[0].pincode}
          </Typography>
          <Button variant="contained" color="primary" onClick={toggleModal}>
            Show Business Hours
          </Button>
          <img
            style={{
              width: "10rem",
              borderRadius: "83%",
              height: "10rem",
              marginTop: "0.5rem",
            }}
            src={serviceData.shop_image_or_logo}
            alt="Not Found"
          />
        </Box>
      </Box>

      {/* Contact Buttons */}
      <Box className="contact-buttons">
        <IconButton
          href={`https://wa.me/${serviceData.mobile_number}`}
          target="_blank"
          className="whatsapp-button"
        >
          <WhatsAppIcon />
        </IconButton>
        <IconButton
          href={`tel:${serviceData.mobile_number}`}
          target="_blank"
          className="phone-button"
        >
          <PhoneIcon />
        </IconButton>
      </Box>

      {/* Tabs Section */}
      <Tabs
        value={tabValue}
        sx={{ marginTop: "2rem" }}
        onChange={handleTabChange}
        centered
      >
        <Tab label="Services" />
        <Tab label="Reviews" />
        <Tab label="Photos" />
      </Tabs>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Box className="services">
          {serviceData?.additional_services?.length > 0 ? (
            serviceData?.additional_services?.map((service, index) => (
              <Box key={index} className="service-card">
                <Box className="service-icon">
                  {/* Add an icon or placeholder */}
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Service Icon"
                    className="service-icon-image"
                  />
                </Box>
                <Box className="service-content">
                  <Typography variant="h6" className="service-title">
                    {service.parameter}
                  </Typography>
                  <Typography variant="body1" className="service-description">
                    {service.value}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography
              variant="body1"
              style={{ textAlign: "center" }}
              className="no-services"
            >
              No Services Available.
            </Typography>
          )}
        </Box>
      )}

      {tabValue === 1 && <ReviewSection id={id} />}

      {tabValue === 2 && (
        <Grid container spacing={2} className="photos">
          {serviceData?.additional_services?.length > 0 ? (
            serviceData.additional_services.map((service, index) => (
              <Box key={index} className="service-card">
                <Box className="service-icon">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Service Icon"
                    className="service-icon-image"
                  />
                </Box>
                <Box className="service-content">
                  <Typography variant="h6" className="service-title">
                    {service.parameter}
                  </Typography>
                  <Typography variant="body1" className="service-description">
                    {service.value}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography
              variant="body1"
              style={{ textAlign: "center", margin: "51px auto" }}
              className="no-services"
            >
              No Photos Available.
            </Typography>
          )}
        </Grid>
      )}

      {/* Modal */}
      <Modal open={openModal} onClose={toggleModal}>
        <Box className="modal-content">
          <Typography variant="h6">Business Hours</Typography>
          {serviceData.business_hours?.map((hour, index) => (
            <Box key={index} className="business-hour">
              <Typography variant="body1">{hour.day}</Typography>
              <Typography variant="body2">
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
