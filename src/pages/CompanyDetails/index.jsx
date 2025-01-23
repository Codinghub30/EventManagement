import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
  MenuItem,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import authService from "../../api/ApiService";
import { useSelector } from "react-redux";

const CompanyDetails = () => {
  const [companyType, setCompanyType] = useState("");
  const [formData, setFormData] = useState({
    company_type: "",
    company_name: "",
    designation: "",
    gst_number: "",
    pan_number: "",
    cin_number: "",
    pan_front_image: null,
    pan_back_image: null,
  });
  const userDetails = useSelector((state) => state.auth.userDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCompanyTypeChange = (e) => {
    const value = e.target.value;
    setCompanyType(value);

    setFormData({
      company_type: value,
      company_name: formData.company_name,
      designation: formData.designation,
      gst_number: formData.gst_number,
      pan_number: formData.pan_number,
      cin_number: formData.cin_number,
      pan_front_image: formData.pan_front_image,
      pan_back_image: formData.pan_back_image,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async () => {
    try {
      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        payload.append(key, formData[key]);
      });

      console.log("Payload before sending to API:", payload);
      console.log("Payload with files:", payload);

      const response = await authService.updateUserProfile(
        userDetails._id,
        payload
      );
      console.log("API Response:", response);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
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
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{
          marginBottom: 4,
          fontWeight: "bold",
          color: "#333",
          textTransform: "uppercase",
        }}
      >
        Company Details
      </Typography>

      <Grid container spacing={2}>
        {/* Company Type Dropdown */}
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Company Type"
            name="company_type"
            value={companyType}
            onChange={handleCompanyTypeChange}
            variant="outlined"
          >
            <MenuItem value="Private Limited & Limited">
              Private Limited & Limited
            </MenuItem>
            <MenuItem value="Partnership & LLP">Partnership & LLP</MenuItem>
            <MenuItem value="Proprietorship">Proprietorship</MenuItem>
            <MenuItem value="Self/Others">Self/Others</MenuItem>
          </TextField>
        </Grid>

        {/* Common Fields */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Company Name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            variant="outlined"
            required
          />
        </Grid>

        {companyType !== "Self/Others" && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
        )}

        {companyType !== "Self/Others" && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="TDS"
              name="tds"
              value={"2%"} // Presuming TDS should always be "2%"
              onChange={handleChange}
              variant="outlined"
              disabled
            />
          </Grid>
        )}

        {/* Conditional Fields Based on Company Type */}
        {[
          "Private Limited & Limited",
          "Partnership & LLP",
          "Proprietorship",
        ].includes(companyType) && (
          <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="GST Number"
                name="gst_number"
                value={formData.gst_number}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="PAN Number"
                name="pan_number"
                value={formData.pan_number}
                onChange={handleChange}
                variant="outlined"
                required
              />
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
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    name="pan_front_image"
                    onChange={handleFileChange}
                  />
                </IconButton>
              </Paper>
              <Typography align="center" variant="subtitle2">
                PAN Front Image
              </Typography>
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
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    name="pan_back_image"
                    onChange={handleFileChange}
                  />
                </IconButton>
              </Paper>
              <Typography align="center" variant="subtitle2">
                PAN Back Image
              </Typography>
            </Grid>
          </>
        )}

        {companyType === "Private Limited & Limited" && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="CIN Number"
              name="cin_number"
              value={formData.cin_number}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
        )}

        {companyType === "Proprietorship" && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Trade License"
              name="tradeLicense"
              value={formData.tradeLicense}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
        )}
      </Grid>

      {/* Submit Button */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            paddingX: 4,
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default CompanyDetails;
