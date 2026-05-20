import express from "express";
import { createTeamController, getMyTeamsController, addMemberToTeamController, inviteUserController, updateMemberRoleController } from "../controllers/teamController.js"
import projectRoutes from "./projectRoutes.js";

const userTeamRoutes = express.Router();


//POST CREATE TEAM
userTeamRoutes.post("/", createTeamController);


//GET GET MY TEAMS
userTeamRoutes.get("/", getMyTeamsController);


//POST /api/teams/:teamId/members ADD MEMBERS
userTeamRoutes.post("/:teamId/members", addMemberToTeamController);

// EMAIL INVITE
userTeamRoutes.post("/:teamId/invite", inviteUserController)

// UPDATE ROLE
// userRouter.patch("/:teamId/role", updateMemberRoleController);

// ONLY ADMIN CAN UPDATE ROLES
userTeamRoutes.patch("/:teamId/role", updateMemberRoleController);

//ADMIN AND MANAGER CAN ADD MEMBER
userTeamRoutes.post("/:teamId/add-member", addMemberToTeamController);

userTeamRoutes.use("/projects", projectRoutes);

export default userTeamRoutes;