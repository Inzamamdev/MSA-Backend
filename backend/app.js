import express from "express";
import dotenv from "dotenv";
import searchRoutes from "./src/routes/searchRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/search", searchRoutes);
app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
