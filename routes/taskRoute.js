import { verifiedToken } from "../controller/JWTMiddleWare.js";
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

router.get("/user/:id", verifiedToken, allTasks);
router.delete("/", verifiedToken, deleteAllTasks);
router.delete("/:id", verifiedToken, deleteById);
router.get("/:id", verifiedToken, taskById);
router.post("/", verifiedToken, addNewTask);
router.put("/:id", verifiedToken, updateTask);

export default router;
