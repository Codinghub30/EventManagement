import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const [accountDetails, setAccountDetails] = useState({
    name: "Anup",
    email: "anup30@gmail.com",
    mobileNumber: "7605968434",
    companyName: "NNC",
    companyType: "Partnership & LLP",
    designation: "Developer",
    panCard: "838733838",
  });
  const userDetails = useSelector((state) => state.auth.userDetails);
  console.log(userDetails);
  const companyDetails = userDetails.company_profile?.[0] || {};
  useEffect(() => {
    if (userDetails) {
      setAccountDetails({
        name: userDetails.username || "",
        email: userDetails.email || "",
        mobileNumber: userDetails.mobilenumber || "",
        companyName: companyDetails.company_name || "",
        companyType: companyDetails.company_type || "",
        designation: companyDetails.designation || "",
        panCard: companyDetails.pan_number || "",
      });
    }
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails({ ...accountDetails, [name]: value });
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 700,
        margin: "20px auto",
        backgroundColor: "#fff",
        borderRadius: 4,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        position: "relative",
        marginTop: "5rem",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -40,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#1976d2",
          height: 80,
          width: 80,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <AccountCircleIcon sx={{ fontSize: 50 }} />
      </Box>

      <Typography
        variant="h5"
        align="center"
        sx={{
          marginBottom: 4,
          marginTop: 4,
          fontWeight: "bold",
          color: "#333",
          textTransform: "uppercase",
        }}
      >
        Account
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            marginBottom: 1,
            color: "#555",
            textTransform: "uppercase",
          }}
        >
          Personal Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={accountDetails.name}
              name="name"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={accountDetails.email}
              name="email"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile Number"
              variant="outlined"
              value={accountDetails.mobileNumber}
              name="mobileNumber"
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* Company Details */}
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            marginTop: 4,
            marginBottom: 1,
            color: "#555",
            textTransform: "uppercase",
          }}
        >
          Company Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Name"
              variant="outlined"
              value={accountDetails.companyName}
              name="companyName"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Company Type"
              variant="outlined"
              value={accountDetails.companyType}
              name="companyType"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Designation"
              variant="outlined"
              value={accountDetails.designation}
              name="designation"
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* Additional Details */}
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            marginTop: 4,
            marginBottom: 1,
            color: "#555",
            textTransform: "uppercase",
          }}
        >
          Additional Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="PAN Card"
              variant="outlined"
              value={accountDetails.panCard}
              name="panCard"
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* Document Upload */}
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            marginTop: 4,
            marginBottom: 1,
            color: "#555",
            textTransform: "uppercase",
          }}
        >
          Upload Documents
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper
              sx={{
                height: 120,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                border: "2px dashed #ddd",
              }}
            >
              <IconButton color="primary" component="label">
                <PhotoCamera />
                <input hidden accept="image/*" type="file" />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              sx={{
                height: 120,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                border: "2px dashed #ddd",
              }}
            >
              <IconButton color="primary" component="label">
                <PhotoCamera />
                <input hidden accept="image/*" type="file" />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>

        {/* Save Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 4,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              paddingX: 4,
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
