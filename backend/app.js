import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
