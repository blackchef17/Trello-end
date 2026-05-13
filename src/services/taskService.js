import Project from "../models/projectSchema.js";
import Task from "../models/taskSchema.js";
import {ROLES} from "../constants/role-constants.js";
import { checkTeamPermission } from "../utils/teamPermission.js";
import { checkTaskPermission } from "../utils/TaskPermission.js";


// CREATE TASKS
export const createTaskService = async ({title, projectId, userId}) => {

    // Find project by their ID
    const project = await checkProjectPermission(projectId)

    // Check Permission
    await checkTeamPermission(project.team, userId);


    return await project.createdAt({
        title: title.trim(),
        project: projectId,
        createdBy: userId
    })
};


// GET ALL TASK
export const getTaskService = async ({projectId, userId, status, priority}) => {

    const project = await checkProjectPermission(projectId)

    await checkTeamPermission(project.team, userId);

    // Create filters object
    const filters = {projectId};

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

    await checkTeamPermission(project.team, userId);

    return task;
}


// UPDATE TASK
export const updateTaskService = async ({taskId, userId, data}) => {

    const task = await checkTaskPermission(taskId)

    const taskProject = await Project.findById(task.projectId)

    await checkTeamPermission(project.team, userId);

    Object.assign(task, data);

    await task.save();

    return task;
};


// DELETE TASK
export const deleteTaskService = async ({taskId, userId}) => {

    const task = await checkTaskPermission(taskId)

    await checkTeamPermission(project.team, userId)

    await task.deleteOne();

    return task;
};
 