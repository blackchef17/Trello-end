import Task from "../models/taskModel.js";
import Project from "../models/projectModel.js";
import { checkTeamPermission } from "../utils/teamPermission.js";
import { findTaskOrFail } from "../utils/findTask.js";
import { findProjectOrFail } from "../utils/findProject.js";
import { ROLES } from "../constants/role-constants.js";
import { checkTaskPermission } from "../utils/TaskPermission.js";


export const assignTaskService = async (taskId, userId, assignedTo) => {

    // Find Task
    const task = await checkTaskPermission(taskId)

    // Find project connected to the task
    const taskProject = await checkTaskPermission(task.projectId);

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