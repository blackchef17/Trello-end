// CREATE PROJECT
import Project from "../models/projectSchema.js"
import { ROLES } from "../constants/role-constants.js";
import { checkTeamPermission } from "../utils/teamPermission.js";
import { checkProjectPermission } from "../utils/projectPermission.js";


export const createProjectService = async ({name, teamId, userId}) => {

    // Check Permission
    await checkTeamPermission(teamId, userId, [ROLES.ADMIN, ROLES.MANAGER]);

    // Check if the project exist in the same team
    const existingProject = await Project.findOne({
        name: name.trim(),
        team: teamId
    })

    if(existingProject) {
        throw new Error ("Project with this name already exist")
    }


    return await project.create({
        name: name.trim(),
        team: teamId,
        createdBy: userId
    });
};


// GET ALL PROJECT
export const getProjectServices = async ({teamId, userId}) => {

    await checkTeamPermission(teamId, userId);

    return project.find({team: teamId})
};


// GET SINGLE PROJECT
export const getSingleProjectServices = async ({projectId, userId}) => {

    const project = await checkProjectPermission(projectId)

    await checkTeamPermission(project.team, userId);

    return project;
};


// UPDATE PROJECT
export const updateProjectService = async ({projectId, userId, data}) => {

    const project = await checkProjectPermission(projectId)

    await checkTeamPermission(project.team, userId, [ROLES.ADMIN, ROLES.MANAGER])

    Object.assign(project, data)

    await project.save()

    return project;

};


// DELETE PROJECT
export const deleteProjectService = async ({projectId, userId}) => {

    const project = await checkProjectPermission(projectId)

    await checkTeamPermission(project.team, userId, [ROLES.ADMIN])

    await project.deleteOne()

    return project;
}
