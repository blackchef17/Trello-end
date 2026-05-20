import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { createProjectController, getProjectController, getSingleProjectController, updateProjectController, deleteProjectController } from "../controllers/projectController.js";
import taskRoutes from "./taskRoutes.js";

const projectRoutes = express.Router();

//Protect all project route
projectRoutes.use(authenticate)

//POST CREATE PROJECT
projectRoutes.post("/:teamId", createProjectController);


//GET GET ALL PROJECT
projectRoutes.get("/:teamId", getProjectController)

// GET single project
projectRoutes.get("/single/:projectId", getSingleProjectController)

// UPDATE project
projectRoutes.patch("/:projectId", updateProjectController)

// DELETE project
projectRoutes.delete("/:projectId", deleteProjectController)

projectRoutes.use("/tasks", taskRoutes)

export default projectRoutes;
