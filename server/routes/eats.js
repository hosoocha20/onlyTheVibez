import express from "express";
import { getAllEats, getEatCategory } from "../controllers/eatsController.js";
const router = express.Router()

router.get("/allEats", getAllEats)

router.get("/:EatCategory", getEatCategory)


export default router