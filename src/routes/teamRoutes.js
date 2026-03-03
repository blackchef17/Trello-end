import express from "express";

import {createTeam, getMyTeam, addMemberToTeam} from "../controllers/teamController.js"

const router = express.Router();


//POST /api/teams
router.post("/", createTeam);


//GET /api/teams
router.post("/", getMyTeam);


//POST /api/teams/:teamId/members
router.post("/:teamId/members", addMemberToTeam);

export default router;