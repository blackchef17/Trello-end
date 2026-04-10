import Team from "../models/teamModel.js";
import crypto from "crypto";
import { sendInviteEmail } from "./email-service.js";

//CREATE NEW TEAM
export const createTeamServices = async ({name, description, ownerId}) => {

    const team = await Team.create({
        name,
        description,
        owner: ownerId,
        members: [
            {
                user: ownerId,
                role: "admin"
            }
        ]
    });
    return team;
};


//GET MY TEAMS
export const getMyTeamServices = async (userId) => {

    const teams = await Team.find({
        members: userId
    }).populate("owner members", "username email");

    return teams;
};


// ADD MEMBERS TO TEAM
export const addTeamMemberToTeamService = async (teamId, userId) => {

    const team = await Team.findById(teamId)

    if(!team) {
        throw new Error ("Team not found")
    }

    const alreadyMember = team.members.find(
        member => member.user.toString() === userId
    )

    // PREVENT DUPLICATE MEMBERS
    if(alreadyMember){
        throw new Error ("user already in team")
    }

    team.members.push({
        user: userId,
        role: "member"
    });

    await team.save();

    return team;
}



// CREATE API TO CHANGE ROLES
export const updateMemberRoleService = async (teamId, userId, role) => {
    
    const team = await Team.findById(teamId);

     // 👇 ADD DEBUG LOGS HERE
    console.log("Team members:", team.members);
    console.log("UserId:", userId);

      const member = team.members.find(
        m => m.user?.toString() === userId
    );

     if(!member) {
        throw new Error("Member not found");
    }

    member.role = role;

    await team.save();

    return team;
}


// INVITE EMAIL
export const inviteUserToTeamService = async (teamId, email) => {

    const inviteToken = crypto.randomBytes(20).toString("hex");

    const inviteLink =  `${process.env.BASE_URL}/api/teams/join?token=${inviteToken}&teamId=${teamId}`;

    await sendInviteEmail(email, inviteLink);

    return {
        message: "Invitation sent successfully"
    };
};
