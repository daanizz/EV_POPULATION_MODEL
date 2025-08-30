import {
    allTasks,
    deleteAllTasks,
    deleteById,
    taskById,
    addNewTask,
    updateTask,
} from "../controller/taskController.js";
import { Router } from "express";

const router = Router();

router.get("/user/:id", allTasks);
router.delete("/", deleteAllTasks);
router.delete("/:id", deleteById);
router.get("/:id", taskById);
router.post("/", addNewTask);
router.put("/:id", updateTask);

export default router;
