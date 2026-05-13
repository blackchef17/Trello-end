import express from "express";
import { createProjectController, getProjectController, getSingleProjectController, updateProjectController, deleteProjectController } from "../controllers/projectController.js";

const projectRoutes = express.Router();

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

export default projectRoutes;
