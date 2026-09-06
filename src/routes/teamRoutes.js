import express from "express";
import {
  createTeamController,
  getMyTeamsController,
  addMemberToTeamController,
  inviteUserController,
  updateMemberRoleController,
} from "../controllers/teamController.js";
import projectRoutes from "./projectRoutes.js";

const userTeamRoutes = express.Router();

//
userTeamRoutes.use("/projects", projectRoutes);

//POST CREATE TEAM
userTeamRoutes.post("/", createTeamController);

//GET MY TEAMS
userTeamRoutes.get("/", getMyTeamsController);

//POST /api/teams/:teamId/members ADD MEMBERS
userTeamRoutes.post("/:teamId/members", addMemberToTeamController);

// EMAIL INVITE
userTeamRoutes.post("/:teamId/invite", inviteUserController);

// ONLY ADMIN CAN UPDATE ROLES
userTeamRoutes.patch("/:teamId/role", updateMemberRoleController);

export default userTeamRoutes;
