import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Place {
    name: String
    address: String
    rating: Float
    phone: String
  }
  type Query {
    searchPizza(location: String): [Place]
    searchJuice(location: String): [Place]
    searchCombo(location: String): [Place]
  }
`;
