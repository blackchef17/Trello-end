import Project from "../models/projectSchema.js";
import Task from "../models/taskSchema.js";
import {ROLES} from "../constants/role-constants.js";
import { checkTeamPermission } from "../utils/teamPermission.js";
import { checkProjectPermission } from "./projectService.js";


// CREATE TASKS
export const createTaskService = async ({title, projectId, userId}) => {

    // Find project by their ID
    const project = await checkProjectPermission(projectId)

    // Check Permission
    await checkTeamPermission(project.team, userId);


    return await Task.create({
        projectId,
        title: title.trim(),
        createdBy: userId
    })
};


// GET ALL TASK
export const getTaskService = async ({projectId, userId, status, priority}) => {

    // Create filters object
    const filters = {};

    if(projectId) {
console.log("PROJECT ID:", projectId);
         const project = await checkProjectPermission(projectId)

         await checkTeamPermission(project.team, userId);

         filters.project = projectId;
    }


    //Add status filter if provided
    if (status) {
        filters.status = status;
    }

    // Add priority filter if provided
    if (priority) {
        filters.priority = priority;
    }

    // find tasks using filters
    return Task.find(filters);
};


// GET SINGLE TASK
export const getSingleTaskService = async ({taskId, userId}) => {

  const task = await checkTaskPermission(taskId)

  const taskProject = await Project.findById(task.projectId)

  await checkTeamPermission(taskProject.team, userId);

  return task;
}


// UPDATE TASK
export const updateTaskService = async ({taskId, userId, data}) => {

    const task = await checkTaskPermission(taskId)

    const taskProject = await Project.findById(task.projectId)

    await checkTeamPermission(taskProject.team, userId);

    Object.assign(task, data);

    await task.save();

    return task;
};


// DELETE TASK
export const deleteTaskService = async ({taskId, userId}) => {

    const task = await checkTaskPermission(taskId)

    const taskProject = await Project.findById(task.projectId)

    await checkTeamPermission(taskProject.team, userId)

    await task.deleteOne();

    return task;
};


//Assign Task
export const assignTaskService = async ({taskId, userId, assignedTo}) => {

    // Find Task
    const task = await checkTaskPermission(taskId)

    // Find project connected to the task
    const taskProject = await checkProjectPermission(task.projectId);

    // check permission
    const { team } = await checkTeamPermission(taskProject.team, userId, [ROLES.ADMIN, ROLES.MANAGER])

    const member = team.members.find(
    (m) => m.user.toString() === assignedTo
    );

    if (!member) {
    throw new Error("User is not a team member");
    }

    // Assign task
    task.assignedTo = assignedTo;

    await task.save();

    return task;
}
 

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
}