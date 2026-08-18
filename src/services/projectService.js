// CREATE PROJECT
import Project from "../models/projectSchema.js";
import { ROLES } from "../constants/roleConstants.js";
// import { checkTeamPermission } from "../utils/teamPermission.js";
import Team from "../models/teamModel.js";

export const createProjectService = async ({ name, teamId, userId }) => {
  // Check Permission
  await checkTeamPermission(teamId, userId, [ROLES.ADMIN, ROLES.MANAGER]);

  // Check if the project exist in the same team
  const existingProject = await Project.findOne({
    name: name.trim(),
    team: teamId,
  });

  console.log("TEAM ID RECEIVED:", teamId);
  console.log("USER ID RECEIVED:", userId);
  if (existingProject) {
    throw new Error("Project with this name already exist");
  }

  return await Project.create({
    name: name.trim(),
    team: teamId,
    createdBy: userId,
  });
};

// GET ALL PROJECT
export const getProjectService = async ({ teamId, userId }) => {
  if (teamId) {
    await checkTeamPermission(teamId, userId);

    return Project.find({ team: teamId });
  }

  return Project.find({ createdBy: userId });
};

// GET SINGLE PROJECT
export const getSingleProjectService = async ({ projectId, userId }) => {
  const project = await checkProjectPermission(projectId);

  await checkTeamPermission(project.team, userId);

  return project;
};

// UPDATE PROJECT
export const updateProjectService = async ({
  projectId,
  userId,
  name,
  description,
  status,
}) => {
  const project = await checkProjectPermission(projectId);

  await checkTeamPermission(project.team, userId, [ROLES.ADMIN, ROLES.MANAGER]);

  Object.assign(project, { name, description, status });

  await project.save();

  return project;
};

// DELETE PROJECT
export const deleteProjectService = async ({ projectId, userId }) => {
  const project = await checkProjectPermission(projectId);

  await checkTeamPermission(project.team, userId, [ROLES.ADMIN]);

  await project.deleteOne();

  return project;
};

// Project Validation
export const checkProjectPermission = async (projectId) => {
  // Find project ID
  const project = await Project.findById(projectId);

  // if project does not exist
  if (!project) {
    throw new Error("Project not found");
  }

  // return task
  return project;
};

// Team Validation
export const checkTeamPermission = async (
  teamId,
  userId,
  allowedRoles = [],
) => {
  const team = await Team.findById(teamId);

  if (!team) {
    throw new Error("Team is not found");
  }

  const member = team.members.find((m) => m.user.toString() === userId);

  if (!member) {
    throw new Error("Not a member");
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(member.role)) {
    throw new Error("Access denied");
  }

  return { team, member };
};
