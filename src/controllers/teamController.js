import {
  createTeamServices,
  getMyTeamServices,
  addTeamMemberToTeamService,
  inviteUserToTeamService,
  updateMemberRoleService,
} from "../services/teamService.js";

// Create New Team
export const createTeamController = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const ownerId = res.locals.userId;

    if (!name) {
      return res.status(400).json({
        message: "Team name is required",
        status: 0,
        data: null,
      });
    }

    const output = await createTeamServices({
      name,
      description,
      ownerId,
    });

    return res.status(201).json({
      message: "Team created successfully",
      status: 1,
      data: output,
    });
  } catch (error) {
    next(error);
  }
};

// GET MT TEAMS
export const getMyTeamsController = async (req, res, next) => {
  try {
    const userId = res.locals.userId;

    const result = await getMyTeamServices(userId);

    return res.status(200).json({
      message: "Teams fetched successfully",
      status: 1,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ADD MEMBER TO TEAM
export const addMemberToTeamController = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const requesterId = res.locals.userId;
    const newUserId = req.body.userId;

    if (!newUserId) {
      return res.status(400).json({
        message: "User ID is required",
        status: 0,
        data: null,
      });
    }

    const result = await addTeamMemberToTeamService(
      teamId,
      requesterId,
      newUserId,
    );

    return res.status(200).json({
      message: "Member added successfully",
      status: 1,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATING ROLES
export const updateMemberRoleController = async (req, res, next) => {
  try {
    const ownerId = res.locals.userId;
    const { teamId } = req.params;
    const { userId, role } = req.body;

    if (!userId || !role) {
      return res.status(400).json({
        message: "User ID and role are required",
      });
    }

    const result = await updateMemberRoleService(ownerId, teamId, userId, role);

    return res.status(200).json({
      message: "Role updated successfully",
      status: 1,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// SEND INVITATION
export const inviteUserController = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const result = await inviteUserToTeamService(teamId, email);

    return res.json({
      message: "Invite sent",
      status: 1,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
