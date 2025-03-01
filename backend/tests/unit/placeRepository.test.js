import placeRepository from "../../src/repositories/placeRepository.js";
import { geocodeLocation } from "../../src/utils/location.js";
import axios from "axios";
jest.mock("axios");
jest.mock("../../src/utils/location.js");

describe("Place Repository", () => {
  it("should fetch places successfully", async () => {
    geocodeLocation.mockResolvedValue("40.7128,-74.0060"); // Coordinates for New York
    const fakeResponse = {
      data: {
        results: [
          {
            name: "Brooklyn Pizza Crew",
            phone: "N/A",
            rating: "4.4",
          },
        ],
      },
    };
    axios.get.mockResolvedValue(fakeResponse);

    const result = await placeRepository.fetchPlaces("pizza", "New York");

    expect(result).toEqual(fakeResponse.data.results);
    expect(axios.get).toHaveBeenCalled();
    expect(geocodeLocation).toHaveBeenCalledWith("New York");
  });

  it("should return empty array if axios throws an error", async () => {
    geocodeLocation.mockResolvedValue("40.7128,-74.0060");
    axios.get.mockRejectedValue(new Error("API Error"));

    const result = await placeRepository.fetchPlaces("pizza", "New York");

    expect(result).toEqual([]);
  });
});
