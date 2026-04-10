import { createDiffieHellmanGroup } from "crypto";
import { createTeamServices, getMyTeamServices, addTeamMemberToTeamService, inviteUserToTeamService, updateMemberRoleService } from "../services/team-service.js"

// Create New Team
export const createTeamController = async (req, res, next) => {
    try {

        const {name, description, ownerId} = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Team name is required",
                status: 0,
                data: null
            });
        }

        const output = await createTeamServices({
            name,
            description,
            ownerId
        });

        res.status(201).json({
            message: "Team created successfully",
            status: 1,
            data: output
        })
    } catch (error) {
        next(error)
    }
};


// GET MT TEAMS
export const getMyTeamsController = async (req, res, next) => {
    try {

        const userId = req.user.id
        
        const result = await getMyTeamServices(userId);

        res.json({
            message: "Teams fetched successfully",
            status: 1,
            data: result
        })
    } catch (error) {
        next(error)
    }
};


// ADD MEMBER
export const addMemberToTeamController = async (req, res, next) => {

    try {

        const {teamId} = req.params;
         const {userId} = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
                status: 0,
                data: null
            })
        }

        const result = await addTeamMemberToTeamService(teamId, userId);

        res.json({
            message: "Member added successfully",
            status: 1,
            data: result
        });

    } catch (error){
        next(error)
    }
}



// UPDATING ROLES
export const updateMemberRoleController = async (req, res, next) => {

    try {

        const {teamId} = req.params;
        const {userId, role} = req.body;

        if(!userId || !role) {
            return res.status(400).json({
                message: "User ID and role are required"
            })
        }

        const result = await updateMemberRoleService(teamId, userId, role)

        res.json({
            message: "Role updated successfully",
            status: 1,
            data: result
        });

    } catch (error){
        next(error);
    }
};


// SEND INVITATION
export const inviteUserController = async (req, res, next) => {

    try {

        const {teamId} = req.params;
        const {email} = req.body;

        if(!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const result = await inviteUserToTeamService(teamId, email)

        res.json({
            message: "Invite sent",
            status: 1,
            data: result
        });
    } catch (error) {
        next (error);
    } 
}