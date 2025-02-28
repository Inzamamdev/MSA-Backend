import placeRepository from "../repositories/placeRepository.js";

const getPlaces = async (query, location) => {
  return await placeRepository.fetchPlaces(query, location);
};

export default { getPlaces };
