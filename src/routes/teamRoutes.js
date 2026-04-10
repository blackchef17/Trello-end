import express from "express";

import { createTeamController, getMyTeamsController, addMemberToTeamController, inviteUserController, updateMemberRoleController } from "../controllers/teamController.js"
import { authorizeRole } from "../middlewares/authorizeRole.js";

const userRouter = express.Router();


//POST CREATE TEAM
userRouter.post("/", createTeamController);


//GET GET MY TEAMS
userRouter.get("/", getMyTeamsController);


//POST /api/teams/:teamId/members ADD MEMBERS
userRouter.post("/:teamId/members", addMemberToTeamController);

// EMAIL INVITE
userRouter.post("/:teamId/invite", inviteUserController)

// UPDATE ROLE
userRouter.patch("/:teamId/role", updateMemberRoleController);

// ONLY ADMIN CAN UPDATE ROLES
userRouter.patch("/:teamId/role", authorizeRole("admin"), updateMemberRoleController);

//ADMIN AND MANAGER CAN ADD MEMBER
userRouter.post("/:teamId/add-member", authorizeRole("admin", "manager"),addMemberToTeamController )

export default userRouter;