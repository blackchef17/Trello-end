import express from "express";

import { createTeamController, getMyTeamsController, addMemberToTeamController, inviteUserController, updateMemberRoleController } from "../controllers/teamController.js"
import { authorizeRole } from "../middlewares/authorizeRole.js";

const router = express.Router();


//POST CREATE TEAM
router.post("/", createTeamController);


//GET GET MY TEAMS
router.get("/", getMyTeamsController);


//POST /api/teams/:teamId/members ADD MEMBERS
router.post("/:teamId/members", addMemberToTeamController);

// EMAIL INVITE
router.post("/:teamId/invite", inviteUserController)

// UPDATE ROLE
router.patch("/:teamId/role", updateMemberRoleController);

// ONLY ADMIN CAN UPDATE ROLES
router.patch("/teams/:teamId/role", authorizeRole("admin"), updateMemberRoleController);

//ADMIN AND MANAGER CAN ADD MEMBER
router.post("/teams/:teamId/add-member", authorizeRole("admin", "manager"),addMemberToTeamController )

export default router;