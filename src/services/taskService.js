import Project from "../models/projectSchema.js";
import Task from "../models/taskSchema.js";
import { ROLES } from "../constants/roleConstants.js";
import { checkTeamPermission } from "../utils/teamPermission.js";
import { checkProjectPermission } from "./projectService.js";

// CREATE TASKS
export const createTaskService = async ({ title, projectId, userId }) => {
  // Find project by their ID
  const project = await checkProjectPermission(projectId);

  // Check Permission
  await checkTeamPermission(project.team, userId);

  return await Task.create({
    projectId,
    title: title.trim(),
    createdBy: userId,
  });
};

// GET ALL TASK
export const getTaskService = async (filter) => {
  // Create filters object
  const { userId, projectId, taskId, status, priority, projectOwner } = filter;

  let query = {};

  if (projectId) {
    query.projectId = projectId;
  }

  if (taskId) {
    query._id = taskId;
  }

  //Add status filter if provided
  if (status) {
    query.status = status;
  }

  // Add priority filter if provided
  if (priority) {
    query.priority = priority;
  }

  if (projectOwner) {
    ownedProject = await Project.find({ owner: projectOwner }).select("_id");
    ownedProjectIds = ownedProject.map((project) => project._id);
    query.projectId = { $in: ownedProjectIds };
  }

  let tasks = null;

  if (!userId) {
    tasks = await Task.find(query);
  } else {
    tasks = await Task.find(query).populate({
      path: "projectId",
      populate: {
        path: "team",
        match: { "members.user": userId },
      },
    });

    tasks = tasks.filter((task) => task.projectId?.team);
  }

  // find tasks using filters
  return tasks;
};

// GET SINGLE TASK
export const getSingleTaskService = async (taskId, userId = null) => {
  let task = null;

  if (!userId) {
    task = await Task.findById(taskId);
  } else {
    task = await Task.findById(taskId).populate({
      path: "projectId",
      populate: {
        path: "team",
        match: { "members.user": userId },
      },
    });
  }

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

// UPDATE TASK
export const updateTaskService = async ({ taskId, userId, data }) => {
  const task = await checkTaskPermission(taskId);

  const taskProject = await Project.findById(task.projectId);

  await checkTeamPermission(taskProject.team, userId);

  Object.assign(task, data);

  await task.save();

  return task;
};

// DELETE TASK
export const deleteTaskService = async ({ taskId, userId }) => {
  const task = await checkTaskPermission(taskId);

  const taskProject = await Project.findById(task.projectId);

  await checkTeamPermission(taskProject.team, userId);

  await task.deleteOne();

  return task;
};

//Assign Task
export const assignTaskService = async ({ taskId, userId, assignedTo }) => {
  // Find Task
  const task = await checkTaskPermission(taskId);

  // Find project connected to the task
  const taskProject = await checkProjectPermission(task.projectId);

  // check permission
  const { team } = await checkTeamPermission(taskProject.team, userId, [
    ROLES.ADMIN,
    ROLES.MANAGER,
  ]);

  const member = team.members.find((m) => m.user.toString() === assignedTo);

  if (!member) {
    throw new Error("User is not a team member");
  }

  // Assign task
  task.assignedTo = assignedTo;

  await task.save();

  return task;
};

// Validation
export const checkTaskPermission = async (taskId) => {
  // Find task by ID
  const task = await Task.findById(taskId);

  // If task does not exist
  if (!task) {
    throw new Error("Task not found");
  }

  // Return task
  return task;
};
