import placeService from "../../src/services/placeService.js";
import placeRepository from "../../src/repositories/placeRepository.js";

jest.mock("../../src/repositories/placeRepository.js");

describe("Place Service", () => {
  it("should return places for a given query and location", async () => {
    const mockPlaces = [
      {
        name: "Test Pizza Place",
        address: "123 Test St",
        rating: 4.5,
        phone: "N/A",
      },
    ];
    placeRepository.fetchPlaces.mockResolvedValue(mockPlaces);

    const result = await placeService.getPlaces("pizza", "New York");
    expect(result).toEqual(mockPlaces);
    expect(placeRepository.fetchPlaces).toHaveBeenCalledWith(
      "pizza",
      "New York"
    );
  });

  it("should use default location if none provided", async () => {
    const mockPlaces = [
      {
        name: "Default Pizza Place",
        address: "456 Default St",
        rating: 4,
        phone: "N/A",
      },
    ];
    placeRepository.fetchPlaces.mockResolvedValue(mockPlaces);

    const result = await placeService.getPlaces("pizza", "Ulhasnagar");
    expect(result).toEqual(mockPlaces);
    expect(placeRepository.fetchPlaces).toHaveBeenCalledWith(
      "pizza",
      "Ulhasnagar"
    );
  });
});
