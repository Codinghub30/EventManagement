import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Typography,
} from "@mui/material";
import {
  LocalizationProvider,
  StaticDateRangePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CalendarModal = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState([null, null]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleConfirm = () => {
    console.log("Selected Dates:", selectedRange);
    toggleModal();
  };

  return (
    // <Box
    //   display="flex"
    //   justifyContent="center"
    //   alignItems="center"
    //   height="100vh"
    //   bgcolor="#f9f9f9"
    // >
    //   <Button
    //     variant="contained"
    //     onClick={toggleModal}
    //     sx={{
    //       backgroundColor: "#7C4DFF",
    //       color: "#FFFFFF",
    //       padding: "10px 20px",
    //       fontSize: "16px",
    //       borderRadius: "8px",
    //       fontWeight: "bold",
    //       textTransform: "none",
    //     }}
    //   >
    //     Select Event Dates
    //   </Button>

    //   <Dialog
    //     open={isModalVisible}
    //     onClose={toggleModal}
    //     fullWidth
    //     maxWidth="sm"
    //     PaperProps={{
    //       style: {
    //         borderRadius: 10,
    //         padding: 20,
    //       },
    //     }}
    //   >
    //     <DialogTitle
    //       sx={{
    //         textAlign: "center",
    //         fontSize: "20px",
    //         fontWeight: "bold",
    //         marginBottom: "10px",
    //       }}
    //     >
    //       Select Event Dates
    //     </DialogTitle>
    //     <DialogContent>
    //       <LocalizationProvider dateAdapter={AdapterDayjs}>
    //         <StaticDateRangePicker
    //           displayStaticWrapperAs="desktop"
    //           value={selectedRange}
    //           onChange={(newValue) => setSelectedRange(newValue)}
    //           calendars={1}
    //           renderInput={() => null} // Hide the default input fields
    //         />
    //       </LocalizationProvider>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           justifyContent: "center",
    //           mt: 3,
    //         }}
    //       >
    //         <Button
    //           onClick={handleConfirm}
    //           variant="contained"
    //           sx={{
    //             width: "90%",
    //             backgroundColor: "#7C4DFF",
    //             color: "#FFFFFF",
    //             padding: "10px",
    //             borderRadius: "8px",
    //             fontWeight: "bold",
    //             textTransform: "none",
    //             fontSize: "16px",
    //           }}
    //         >
    //           Confirm
    //         </Button>
    //       </Box>
    //     </DialogContent>
    //   </Dialog>
    // </Box>
    <></>
  );
};

export default CalendarModal;
