export const getErrorMessage = (error) => {
  if (error && error.message) {
    return error.message;
  } else if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.message
  ) {
    return error.response.data.message;
  } else {
    return "An unexpected error occurred.";
  }
};

export async function getCurrentCity() {
  const GOOGLE_API_KEY = "AIzaSyDLyeYKWC3vssuRVGXktAT_cY-8-qHEA_g";

  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;

        try {
          const response = await fetch(geocodingUrl);
          const data = await response.json();

          if (data.status === "OK" && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;

            const city = addressComponents.find((component) =>
              component.types.includes("locality")
            )?.long_name;

            const town = addressComponents.find((component) =>
              component.types.includes("sublocality_level_1")
            )?.long_name;

            resolve({
              city: city || "City not found",
              town: town || "Town not found",
            });
          } else {
            resolve({ city: "City not found", town: "Town not found" });
          }
        } catch (error) {
          reject("Error fetching location data.");
        }
      },
      (error) => {
        reject(error.message || "Error getting location.");
      },
      { enableHighAccuracy: true } // Request high-accuracy location
    );
  });
}

export const formatCurrencyIntl = (amount) => {
  if (typeof amount !== "number") return "Invalid amount";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
