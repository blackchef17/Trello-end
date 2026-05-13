import express from "express";

import { createTaskController, getTaskController, getSingleTaskController, updateTaskController, deleteTaskController, assignTaskController } from "../controllers/taskController.js";

const taskRoutes = express.Router();

// POST Create task
taskRoutes.post("/:projectId", createTaskController);

// GET all task
taskRoutes.get("/:projectId", getTaskController)

// GET all single task
taskRoutes.get("/single/:taskId", getSingleTaskController)

// UPDATE all task
taskRoutes.patch("/:taskId", updateTaskController)

// DELETE all task
taskRoutes.delete("/:taskId", deleteTaskController)

// ASSIGN TASK
taskRoutes.patch("/:taskId/assign", assignTaskController);

export default taskRoutes;