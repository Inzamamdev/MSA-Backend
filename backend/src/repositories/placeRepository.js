import axios from "axios";
import dotenv from "dotenv";
import { geocodeLocation } from "../utils/location.js";
dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;
const BASE_URL = process.env.PLACES_BASE_URL;

const fetchPlaces = async (query, locationText) => {
  try {
    const locationCoordinates = await geocodeLocation(locationText);
    const response = await axios.get(BASE_URL, {
      params: {
        location: locationCoordinates, // Example: San Francisco
        radius: 5000,
        keyword: query,
        key: API_KEY,
      },
    });
    return response.data.results.map((place) => ({
      name: place.name,
      address: place.vicinity,
      rating: place.rating || 0,
      phone: place.formatted_phone_number || "N/A",
    }));
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
};

export default { fetchPlaces };
