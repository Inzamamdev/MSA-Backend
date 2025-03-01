import express from "express";
import bodyParser from "body-parser";
import searchRoutes from "./src/routes/searchRoutes.js";

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use("/search", searchRoutes);

export default app;
