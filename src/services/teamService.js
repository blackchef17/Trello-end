import Team from "../models/teamModel.js";
import crypto from "crypto";
import { sendInviteEmail } from "./emailService.js";
import { ROLES } from "../constants/roleConstants.js";

//CREATE NEW TEAM
export const createTeamServices = async ({ name, description, ownerId }) => {
  const team = await Team.create({
    name,
    description,
    owner: ownerId,
    members: [
      {
        user: ownerId,
        role: "admin",
      },
    ],
  });
  return team;
};

//GET MY TEAMS
export const getMyTeamServices = async (userId) => {
  const teams = await Team.find({
    "members.user": userId,
  }).populate("owner members.user", "username email");

  return teams;
};

// ADD MEMBERS TO TEAM
export const addTeamMemberToTeamService = async (
  teamId,
  requesterId,
  userId,
) => {
  const team = await Team.findById(teamId);

  if (!team) {
    throw new Error("Team not found");
  }

  console.log("Requester ID:", requesterId);
  console.log(
    "Team Members:",
    team.members.map((m) => ({
      user: m.user.toString(),
      role: m.role,
    })),
  );

  // Find the requester inside the team
  const requester = team.members.find(
    (m) => String(m.user) === String(requesterId),
  );

  // Ensure requester is part of the team
  if (!requester) {
    throw new Error("Not a team member");
  }

  // Enforce role-based permission (middleware logic)
  if (![ROLES.ADMIN, ROLES.MANAGER].includes(requester.role)) {
    throw new Error("Access denied");
  }

  // PREVENT DUPLICATE MEMBERS
  const alreadyMember = team.members.find(
    (member) => member.user.toString() === userId,
  );

  if (alreadyMember) {
    throw new Error("user already in team");
  }

  team.members.push({
    user: userId,
    role: ROLES.MEMBER,
  });

  await team.save();

  return team;
};

// CREATE API TO CHANGE ROLES
export const updateMemberRoleService = async (
  ownerId,
  teamId,
  userId,
  role,
) => {
  const team = await Team.findById(teamId);

  const ownerRole = team.members.find((m) => m.user.equals(ownerId))?.role;

  if (ownerRole != ROLES.ADMIN) {
    throw new Error(
      "Access denied!. You do not have the permission to do this action",
    );
  }

  // 👇 ADD DEBUG LOGS HERE
  console.log("Team members:", team.members);
  console.log("UserId:", userId);

  const member = team.members.find((m) => m.user?.toString() === userId);

  if (!member) {
    throw new Error("Member not found");
  }

  member.role = role;

  await team.save();

  return team;
};

// INVITE EMAIL
export const inviteUserToTeamService = async (teamId, email) => {
  const inviteToken = crypto.randomBytes(20).toString("hex");

  const inviteLink = `${process.env.BASE_URL}/api/teams/join?token=${inviteToken}&teamId=${teamId}`;

  await sendInviteEmail(email, inviteLink);

  return {
    message: "Invitation sent successfully",
  };
};
