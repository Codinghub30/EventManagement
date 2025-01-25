import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Rating } from "@mui/material";
import "./styles.scss";
import authService from "../../../../../../api/ApiService";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../../../../redux/slice/LoaderSlice";
import { getErrorMessage } from "../../../../../../utils/helperFunc";
import CustomModal from "../../../../../../components/CustomModal";

const ReviewSection = ({ id }) => {
  const [reviews, setReviews] = useState();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");
  const [description, setDescription] = useState("");
  const userDetails = useSelector((state) => state.auth.userDetails);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const payload = {
      user_id: userDetails._id,
      user_name: userDetails.username,
      review_title: title,
      review_description: description,
      ratings: 2,
    };
    dispatch(setLoading(true));

    try {
      const res = await authService.writeServiceReview(payload, id);
      dispatch(setLoading(false));
      getReview();
      setOpenModal(true);
      setModalMessage("Your review has been submitted successfully!");
      setModalType("success");
      setDescription("");
      setTitle("");
      setReviews([]);
    } catch (error) {
      setOpenModal(true);
      dispatch(setLoading(false));
      setModalMessage("Please enter a review before submitting.");
      setModalType("failure");
      getErrorMessage(error);
    }
  };

  const getReview = async () => {
    dispatch(setLoading(true));
    try {
      const res = await authService.getServiceReview(id);
      setReviews(res.data.reviews);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      getErrorMessage(error);
    }
  };

  useEffect(() => {
    getReview();
  }, []);
  return (
    <Box className="review-section">
      <Typography variant="h5" className="section-title">
        Customer Reviews
      </Typography>
      {reviews?.length > 0 ? (
        reviews?.map((review, index) => (
          <Box key={index} className="review-card">
            <Rating value={review.ratings} readOnly />
            <Typography variant="h6" className="review-title">
              {review.review_title}
            </Typography>
            <Typography variant="body2" className="review-description">
              {review.review_description}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body1" className="no-reviews">
          No reviews yet. Be the first to review this service!
        </Typography>
      )}
      <Box className="add-review">
        <Typography variant="h6" className="add-review-title">
          Write a Review
        </Typography>
        <Rating
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          className="rating-input"
        />
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          className="review-input"
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Tell us about your experience"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          className="review-input"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <CustomModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          message={modalMessage}
          type={modalType}
        />
      </Box>
    </Box>
  );
};

export default ReviewSection;
