import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  Autocomplete,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import CloseIcon from "@mui/icons-material/Close";
import authService from "../../../../../../api/ApiService";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../../../../redux/slice/LoaderSlice";
import { getErrorMessage } from "../../../../../../utils/helperFunc";

const LocationSection = ({ onContinue, setOpenLocation }) => {
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState("");
  const [savedLocations, setSavedLocations] = useState([]);
  const [locationCoords, setLocationCoords] = useState({
    lat: null,
    lng: null,
  });
  const [addressDetails, setAddressDetails] = useState([]);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const dispatch = useDispatch();

  const GOOGLE_MAPS_API_KEY = "AIzaSyDLyeYKWC3vssuRVGXktAT_cY-8-qHEA_g";

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const onLoadAutocomplete = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();
    const locationName = place?.formatted_address || "No address found";
    const locationLat = place?.geometry?.location?.lat();
    const locationLng = place?.geometry?.location?.lng();

    setSearchedLocation(locationName);
    setLocationCoords({ lat: locationLat, lng: locationLng });
  };
  const getAddress = async () => {
    try {
      dispatch(setLoading(true));
      const res = await authService.getUserProfile(userDetails._id);
      console.log("Getting user Address", res.data);

      setAddressDetails(res.data.saved_address);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      getErrorMessage(error);
    }
  };

  const handleSaveLocation = async () => {
    if (searchedLocation) {
      const newLocation = {
        id: Date.now(),
        name: searchedLocation,
        checked: false,
      };
      // setSavedLocations([...addressDetails, newLocation]);
      const res = await authService.addAddress(userDetails._id, {
        saved_address: {
          id: userDetails._id,
          selected_region: searchedLocation,
          latitude: locationCoords.lat,
          longitude: locationCoords.lng,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        },
      });
      getAddress();
      setIsAddingNewAddress(false);
      setSearchedLocation("");
    }
  };

  const handleCheckboxChange = (id) => {
    setSavedLocations((prevLocations) =>
      prevLocations.map((location) =>
        location.id === id
          ? { ...location, checked: !location.checked }
          : location
      )
    );
  };
  const handleContinue = () => {
    const selectedLocations = savedLocations
      .filter((location) => location.checked)
      .map((location) => location.name)
      .join(", ");

    console.log(selectedLocations);

    onContinue({
      address: selectedLocations,
      lat: locationCoords.lat,
      lng: locationCoords.lng,
    });
  };
  useEffect(() => {
    getAddress();
  }, []);
  if (!isLoaded) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "1rem",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Saved Address
        </Typography>
        <CloseIcon
          sx={{ cursor: "pointer" }}
          onClick={() => setOpenLocation(false)}
        />
      </Box>

      {addressDetails.map((location) => (
        <FormControlLabel
          key={location.id}
          control={
            <Checkbox
              checked={location.checked}
              onChange={() => handleCheckboxChange(location.id)}
            />
          }
          label={location.selected_region}
        />
      ))}
      {!isAddingNewAddress ? (
        <Button
          variant="outlined"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={() => setIsAddingNewAddress(true)}
        >
          + Add New Address
        </Button>
      ) : (
        <Box
          sx={{
            marginTop: 2,
            padding: 2,
            border: "1px solid #ddd",
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            Add New Address
          </Typography>
          <Autocomplete
            onLoad={onLoadAutocomplete}
            onPlaceChanged={onPlaceChanged}
          >
            <TextField
              label="Search Location"
              placeholder="Enter a location"
              fullWidth
              value={searchedLocation}
              onChange={(e) => setSearchedLocation(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Autocomplete>
          <GoogleMap
            mapContainerStyle={{ height: "200px", width: "100%" }}
            center={{ lat: 12.9716, lng: 77.5946 }}
            zoom={12}
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveLocation}
              disabled={!searchedLocation}
            >
              Save Location
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setIsAddingNewAddress(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
      <Button
        variant="contained"
        fullWidth
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleContinue}
      >
        Continue
      </Button>
    </Box>
  );
};

export default LocationSection;
