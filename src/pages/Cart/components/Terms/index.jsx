import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Modal,
} from "@mui/material";
import { useState } from "react";

const Terms = ({ open, onClose, onContinue }) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAcceptTerms = (event) => {
    setIsAccepted(event.target.checked);
  };

  const handleContinue = () => {
    if (isAccepted) {
      onContinue(); // Notify the parent component
      onClose(); // Close the modal
    } else {
      alert("Please accept the terms and conditions to proceed.");
    }
  };

  return (
    // <Modal open={open} onClose={onClose}>
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold" }}
      >
        Terms and Conditions
      </Typography>
      <Box
        sx={{
          maxHeight: "300px",
          overflowY: "auto",
          mb: 3,
          p: 2,
          border: "1px solid #ddd",
          borderRadius: "4px",
          bgcolor: "#f9f9f9",
        }}
      >
        <Typography variant="body2" paragraph>
          By accessing this website, you agree to comply with and be bound by
          the following terms and conditions. Please read them carefully.
        </Typography>
        <Typography variant="body2" paragraph>
          Our services are provided on an "as is" basis. We make no guarantees
          regarding the reliability, accuracy, or completeness of our services.
        </Typography>
        <Typography variant="body2" paragraph>
          You are solely responsible for ensuring that your use of the services
          complies with applicable laws and regulations.
        </Typography>
        <Typography variant="body2" paragraph>
          Our privacy policy governs the collection and use of your personal
          data. By using our services, you consent to the terms of our privacy
          policy.
        </Typography>
        <Typography variant="body2" paragraph>
          We may update these terms and conditions from time to time. Please
          review them periodically for changes.
        </Typography>
      </Box>
      <FormControlLabel
        control={
          <Checkbox
            checked={isAccepted}
            onChange={handleAcceptTerms}
            color="primary"
          />
        }
        label="I accept the terms and conditions."
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleContinue}
          disabled={!isAccepted}
        >
          Continue to Checkout
        </Button>
      </Box>
    </Box>
    // </Modal>
  );
};

export default Terms;
