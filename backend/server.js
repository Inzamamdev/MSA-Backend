import app from "../../app.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "../../src/graphql/schema.js";
import { resolvers } from "../../src/graphql/resolver.js";
import rateLimiter from "express-rate-limit";

let server;

beforeAll(async () => {
  server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use(
    "/graphql",
    rateLimiter,
    expressMiddleware(server, {
      context: async ({ req }) => ({}),
    })
  );
});

import request from "supertest";
import app from "../../app.js";

describe("GraphQL Endpoint", () => {
  it("should return pizza places for searchPizza query", async () => {
    const query = `{query
        { searchPizza(location: "New York") { name address rating phone } }}`;

    const response = await request(app).post("/graphql").send(query);

    console.log("response", response.body);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("searchPizza");
  });
});

afterAll(async () => {
  await server.stop();
});
