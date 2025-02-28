import placeService from "../services/placeService.js";

export const resolvers = {
  Query: {
    searchPizza: async (_, { location }) =>
      await placeService.getPlaces("pizza", location),
    searchJuice: async (_, { location }) =>
      await placeService.getPlaces("juice", location),
    searchCombo: async (_, { location }) =>
      await placeService.getPlaces("pizza and juice", location),
  },
};
