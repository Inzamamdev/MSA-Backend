import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./src/graphql/schema.js";
import { resolvers } from "./src/graphql/resolver.js";
import bodyParser from "body-parser";
import searchRoutes from "./src/routes/searchRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(bodyParser.json());
app.use("/search", searchRoutes);
const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req }) => ({}),
  })
);
app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
  console.log(`GraphQL endpoint available at ${PORT}/graphql`);
});
