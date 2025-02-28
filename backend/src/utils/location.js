import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const GEOCODE_URL = process.env.GEOCODING_BASE_URL;
const API_KEY = process.env.GOOGLE_API_KEY;

export const geocodeLocation = async (locationText) => {
  console.log("locationYet", locationText);
  console.log("GEOCODE_URL", GEOCODE_URL);
  try {
    const response = await axios.get(GEOCODE_URL, {
      params: {
        address: locationText,
        key: API_KEY,
      },
    });

    if (response.data.results && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return `${lat},${lng}`;
    } else {
      throw new Error("No geocoding results found.");
    }
  } catch (error) {
    console.error("Geocoding error:", error.message);
    throw error;
  }
};
