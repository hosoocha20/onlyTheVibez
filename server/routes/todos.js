import express from "express";
import { getAllTodos, getTodoCategory } from "../controllers/todosController.js";
const router = express.Router()

router.get("/allTodos", getAllTodos)

router.get("/:funCategory", getTodoCategory)


export default router