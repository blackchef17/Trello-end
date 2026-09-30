import {
  createProjectService,
  getProjectService,
  getSingleProjectService,
  updateProjectService,
  deleteProjectService,
} from "../services/projectService.js";

// CREATE PROJECT
export const createProjectController = async (req, res, next) => {
  try {
    const { name, teamId } = req.body;
    // const { teamId } = req.params;
    const userId = res.locals.userId;

    const project = await createProjectService({ name, teamId, userId });

    return res.status(201).json({
      message: "Project Created",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL PROJECT
export const getProjectController = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const userId = res.locals.userId;

    const projects = await getProjectService({ teamId, userId });

    return res.json({
      message: "All Project Fetched",
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE PROJECT
export const getSingleProjectController = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = res.locals.userId;

    console.log("Get Project: ProjectId: " + projectId);

    const project = await getSingleProjectService({ projectId, userId });

    return res.json({
      message: "Single project fetched",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE PROJECT
export const updateProjectController = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = res.locals.userId;
    const { name, description, status } = req.body;

    const project = await updateProjectService({
      projectId,
      userId,
      name,
      description,
      status,
    });

    return res.status(200).json({
      message: "project updated successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE PROJECT
export const deleteProjectController = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = res.locals.userId;

    const project = await deleteProjectService({ projectId, userId });

    return res.json({
      message: "project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
