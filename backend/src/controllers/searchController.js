import placeService from "../services/placeService.js";

const searchPlaces = async (req, res, category) => {
  const location = req.query.location;
  try {
    const places = await placeService.getPlaces(category, location);
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchPizza = (req, res) => searchPlaces(req, res, "pizza");
export const searchJuice = (req, res) => searchPlaces(req, res, "juice");
export const searchCombo = (req, res) =>
  searchPlaces(req, res, "pizza and juice");
