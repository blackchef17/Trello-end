import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  createProjectController,
  getProjectController,
  getSingleProjectController,
  updateProjectController,
  deleteProjectController,
} from "../controllers/projectController.js";
import taskRoutes from "./taskRoutes.js";

const projectRoutes = express.Router();

//Protect all project route
projectRoutes.use(authenticate);

//GET GET ALL TASKS USING THE PROJECT
projectRoutes.use("/tasks", taskRoutes);

//POST CREATE PROJECT
projectRoutes.post("/", createProjectController);

//GET GET ALL PROJECT
projectRoutes.get("/", getProjectController);

// GET single project
projectRoutes.get("/:projectId", getSingleProjectController);

// UPDATE project
projectRoutes.patch("/:projectId", updateProjectController);

// DELETE project
projectRoutes.delete("/:projectId", deleteProjectController);

export default projectRoutes;
