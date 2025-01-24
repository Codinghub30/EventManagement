import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss"; // Custom styles for your design
import { useDispatch } from "react-redux";
import { setDates } from "../../redux/slice/dateSlice"; // Import the Redux action

const Calendar = () => {
  const [selectedDates, setSelectedDates] = useState([null, null]); // For range selection
  const dispatch = useDispatch();

  const handleDateChange = (dates) => {
    setSelectedDates(dates);

    if (dates[0] && dates[1]) {
      dispatch(setDates({ startDate: dates[0], endDate: dates[1] })); // Dispatch to Redux
    }
  };

  const handleConfirm = () => {
    if (selectedDates[0] && selectedDates[1]) {
      alert("Dates confirmed!");
    } else {
      alert("Please select a date range first.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Select Event Dates</h2>
      <DatePicker
        selected={selectedDates[0]} // Start date
        onChange={handleDateChange} // Triggered when the user selects dates
        startDate={selectedDates[0]}
        endDate={selectedDates[1]}
        selectsRange
        inline
        monthsShown={1}
      />
      <button
        onClick={handleConfirm}
        className="confirm-button"
        disabled={!selectedDates[0] || !selectedDates[1]}
      >
        Confirm
      </button>
    </div>
  );
};

export default Calendar;
