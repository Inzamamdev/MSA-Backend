import request from "supertest";
import app from "../../app.js"; // app.js does NOT call app.listen()
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "../../src/graphql/schema.js";
import { resolvers } from "../../src/graphql/resolver.js";

let server;

beforeAll(async () => {
  server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => ({}),
    })
  );
});

describe("GraphQL Endpoint", () => {
  it("should return pizza places for searchPizza query", async () => {
    const query = {
      query:
        'query { searchPizza(location: "New York") { name address rating phone } }',
    };

    const response = await request(app)
      .post("/graphql")
      .send(query)
      .set("Accept", "application/json")
      .expect(200);

    console.log("Response Body:", response.body);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("searchPizza");
  });
});

afterAll(async () => {
  await server.stop();
});
