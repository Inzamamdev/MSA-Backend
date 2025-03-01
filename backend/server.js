import dotenv from "dotenv";
import app from "./app.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./src/graphql/schema.js";
import { resolvers } from "./src/graphql/resolver.js";
import rateLimiter from "./src/middleware/rateLimit.js";
dotenv.config();
const PORT = process.env.PORT || 5000;

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use("/graphql", rateLimiter, expressMiddleware(server));
  app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
    console.log(`GraphQL endpoint available at ${PORT}/graphql`);
  });
}

startServer();
