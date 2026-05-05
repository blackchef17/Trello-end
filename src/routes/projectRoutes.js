import express from "express";
import { createProjectController } from "../controllers/projectController.js";

const projectRoutes = express.Router();

//POST CREATE PROJECT
projectRoutes.post("/:teamId", createProjectController);


//GET GET ALL PROJECT
projectRoutes.get("/:teamId", getProjectController)

export default projectRoutes;
