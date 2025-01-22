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

const CompanyDetails = () => {
  const [companyType, setCompanyType] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    designation: "",
    tds: "2%",
    gstNumber: "",
    panNumber: "",
    panFrontImage: null,
    panBackImage: null,
    cinNumber: "",
    tradeLicense: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
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
            name="companyType"
            value={companyType}
            onChange={(e) => {
              setCompanyType(e.target.value);
              setFormData({
                ...formData,
                companyName: "",
                designation: "",
                tds: "2%",
                gstNumber: "",
                panNumber: "",
                panFrontImage: null,
                panBackImage: null,
                cinNumber: "",
                tradeLicense: "",
              });
            }}
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
            name="companyName"
            value={formData.companyName}
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
              value={formData.tds}
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
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="PAN Number"
                name="panNumber"
                value={formData.panNumber}
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
                    name="panFrontImage"
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
                    name="panBackImage"
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
              name="cinNumber"
              value={formData.cinNumber}
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
          onClick={() => {
            console.log("Form Data Submitted:", formData);
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default CompanyDetails;
