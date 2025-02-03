import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import authService from "../../api/ApiService";

const Toc = () => {
  const [tnc, setTnc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await authService.getToc();
        console.log(response.data);

        setTnc(response.data.termsContent || []);
      } catch (err) {
        setError("Failed to load Terms & Conditions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  return (
    <Box sx={{ pt: 3, pb: 30 }}>
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Terms & Conditions
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
            {tnc.length > 0 ? (
              <Box sx={{ mb: 1 }} dangerouslySetInnerHTML={{ __html: tnc }} />
            ) : (
              <Typography>No Terms & Conditions available.</Typography>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Toc;
