import express from "express";
import {
  searchPizza,
  searchJuice,
  searchCombo,
} from "../controllers/searchController.js";
import rateLimiter from "../middleware/rateLimit.js";
const router = express.Router();

router.get("/pizza", rateLimiter, searchPizza);
router.get("/juice", rateLimiter, searchJuice);
router.get("/combo", rateLimiter, searchCombo);

export default router;
