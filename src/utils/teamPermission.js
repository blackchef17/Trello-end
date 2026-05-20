import { ROLES } from "../constants/role-constants.js"
import Team from "../models/teamModel.js"


export const checkTeamPermission = async (teamId, userId, allowedRoles = []) => {
    const team = await Team.findById(teamId)

    if(!team) {
        throw new Error("Team is not found")
    }

    const member = team.members.find(
    (m) => m.user.toString() === userId
    )

    if(!member) {
        throw new Error("Not a member")
    }

   if (allowedRoles.length > 0 && !allowedRoles.includes(member.role)) {
    throw new Error("Access denied");
  }

    return {team, member};
}