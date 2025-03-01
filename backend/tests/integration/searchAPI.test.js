import request from "supertest";
import app from "../../app.js";

describe("REST API Endpoints", () => {
  it("GET /search/pizza should return a JSON array", async () => {
    const response = await request(app)
      .get("/search/pizza?location=New York")
      .expect("Content-Type", /json/)
      .expect(200);

    // Check that the response body is an array
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /search/juice should return a JSON array", async () => {
    const response = await request(app)
      .get("/search/juice?location=New York")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /search/combo should return a JSON array", async () => {
    const response = await request(app)
      .get("/search/combo?location=New York")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});
