import express from "express";
import {
  searchPizza,
  searchJuice,
  searchCombo,
} from "../controllers/searchController.js";
const router = express.Router();

router.get("/pizza", searchPizza);
router.get("/juice", searchJuice);
router.get("/combo", searchCombo);

export default router;
