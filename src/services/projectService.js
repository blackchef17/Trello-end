// CREATE PROJECT
import { ROLES } from "../constants/role-constants";
import { checkTeamPermission } from "../utils/teamPermission";

export const createProjectService = async ({name, teamId, userId}) => {

    // Check Permission
    await checkTeamPermission(teamId, userId, [ROLES.ADMIN, ROLES.MANAGER]);

    // Check if the project exist in the same team
    const existingProject = await project.findOne({
        name: name.trim(),
        team: teamId
    })

    if(existingProject) {
        throw new Error ("Project with this name already exist")
    }


    return await project.create({
        name,
        team: teamId,
        createdBy: userId
    });

    if()
};


// GET ALL PROJECT
export const getProjectServices = async ({teamId, userId}) => {

    await checkTeamPermission(teamId, userId);

    return await project.find({Team: teamId})
};


// GET SINGLE PROJECT
export const getSingleProjectServices = async ({projectId, userId}) => {

    const project = await project.findById(projectId)

    if(!project){
        throw new Error ("Project not found")
    }

    await checkTeamPermission(projectId, userId);

    return project;
};


// UPDATE PROJECT
export const updateProjectService = async ({projectId, userId}) => {

    const project = await project.findById(projectId)

    if(!project){
        throw new Error ("Project not found")
    }

    await checkTeamPermission(projectId, userId, [ROLES.ADMIN, ROLES.MANAGER])

    Object.assign(project, data)

    await project.save()

    return project;

}


// DELETE PROJECT
export const deleteProjectService = async ({projectId, userId}) => {

    const project = await project.findById(projectId)

    await checkTeamPermission(projectId, userId, [ROLES.ADMIN])

    await project.deleteOne()

    return project;
}
