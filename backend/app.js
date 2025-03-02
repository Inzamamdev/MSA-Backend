import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import searchRoutes from "./src/routes/searchRoutes.js";
import cors from "cors";
dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_API_URL,
  })
);
app.use(bodyParser.json());
app.use("/search", searchRoutes);

export default app;
