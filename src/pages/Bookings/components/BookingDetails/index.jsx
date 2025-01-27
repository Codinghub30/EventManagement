import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper, Divider, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import authService from "../../../../api/ApiService";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../redux/slice/LoaderSlice";
import {
  formatCurrencyIntl,
  getErrorMessage,
} from "../../../../utils/helperFunc";

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
        setProducts(res.data.orderId.product_data);
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        getErrorMessage(error);
      }
    };

    getBookingDetails();
  }, [id]);

  const downloadInvoice = () => {
    const doc = new jsPDF();

    // Add a border and title
    doc.setFillColor(240, 240, 240);
    doc.rect(5, 5, 200, 287, "F"); // Background rectangle
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text("Invoice", 105, 15, null, null, "center");

    // Event details
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    const leftMargin = 20;
    const lineSpacing = 7;
    let yPosition = 45;

    doc.text(`Event Name: ${booking.event_name}`, leftMargin, yPosition);
    yPosition += lineSpacing;
    doc.text(`Location: ${booking.event_location}`, leftMargin, yPosition);
    yPosition += lineSpacing;
    doc.text(`Date: ${booking.event_date}`, leftMargin, yPosition);
    yPosition += lineSpacing;
    doc.text(`Start Time: ${booking.event_start_time}`, leftMargin, yPosition);
    yPosition += lineSpacing;
    doc.text(`End Time: ${booking.event_end_time}`, leftMargin, yPosition);

    // Products Table
    const tableColumn = ["Product Name", "Price", "Quantity"];
    const tableRows = [];

    products.forEach((product) => {
      const productData = [
        product.productName,
        `₹${product.productPrice.toString().replace(/[^\d.]/g, "")}`,
        product.quantity,
      ];

      tableRows.push(productData);
    });

    doc.autoTable({
      startY: yPosition + 10,
      head: [tableColumn],
      body: tableRows,
      styles: {
        headStyles: { fillColor: [40, 116, 240], textColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      },
    });

    const finalY = doc.previousAutoTable.finalY + 10;
    doc.text(`Base Amount: ₹${booking.base_amount}`, leftMargin, finalY);
    doc.text(
      `Amount After TDS Deduction: ₹${booking.amount_after_deduction}`,
      leftMargin,
      finalY + lineSpacing
    );
    doc.text(
      `GST Applied Value: ₹${booking.gst_applied_value}`,
      leftMargin,
      finalY + 2 * lineSpacing
    );

    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Thank you for your business!", 105, 280, null, null, "center");
    doc.text(
      "Generated on: " + new Date().toLocaleString(),
      105,
      285,
      null,
      null,
      "center"
    );

    doc.save("invoice.pdf");
  };

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
          <Paper className="booking-box" elevation={3}>
            <Typography variant="h6" className="section-title">
              Total: {products.length} items
            </Typography>
            <Box className="booking-product-container">
              {products.map((item) => (
                <Box className="booking-products" key={item.id}>
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
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className="payment-details" elevation={3}>
            <Typography variant="h6" className="section-title">
              Payment Details
            </Typography>
            <Box>
              <Typography variant="p">
                Amount Paid: {formatCurrencyIntl(booking.paid_amount)}
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
              onClick={downloadInvoice}
            >
              Download Invoice
            </Button>
          </Paper>
        </Grid>
        <Grid>
          <Paper
            className="booking-box"
            sx={{ marginLeft: "2rem" }}
            elevation={3}
          >
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
      </Grid>
    </Box>
  );
};

export default BookingDetails;
