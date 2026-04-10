import Team from "../models/teamModel.js";
import { addMemberToTeamController } from "../controllers/teamController.js";

export const authorizeRole = (...allowedRoles) => {
    return async (req, res, next) => {

        try {
            const {teamId} = req.params;
            const userId = req.user.id;

            const team = await Team.findById(teamId);

            if(!team) {
                return res.status(404).json({
                    message: "Team not found"
                })
            }

            const member = team.members.find(
                m => m.user && m.user.equals(userId)
            );

            if(!member) {
                return res.status(403).json({
                    message: "Not a team member"
                })
            }

            if(!allowedRoles.includes(addMemberToTeamController.role)) {
                return res.status(403).json({
                    message: "Access denied"
                })
            }
            next();
        } catch (error) {
            next(error)
        }
    }
}