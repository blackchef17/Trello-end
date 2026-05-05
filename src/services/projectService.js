// CREATE PROJECT
import { checkTeamPermission } from "../utils/teamPermission";

export const createProjectService = async ({name, teamId, userId}) => {

    await checkTeamPermission(teamId, userId);

    return await project.create({
        name,
        team: teamId,
        createdBy: userId
    });
};


// GET ALL PROJECT
export const getProjectServices = async ({teamId, userId}) => {

    await checkTeamPermission(teamId, userId);

    return await project.find({Team: teamId})

    res.json({
        message: "Project fetched successfully" 
    })
};


// GET SINGLE PROJECT
export const getSingleProjectServices = async ({projectId, userId}) => {

    await checkTeamPermission(projectId, userId);

    return await project.find({Team: teamId})

    res.json({
        message: "Single Project fetched successfully" 
    })
};
}