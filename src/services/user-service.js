import User from "../models/userschema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendPasswordResetEmail } from "./email-service.js";
// import userschema from '../models/userschema.js';

//REGISTER USER
export const registerUserService = async (userData) => {
  const { username, email, password } = userData;

  //Check if user exist
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  //HASHING YOUR PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);

  //Create new user
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  // Return Only User Info (Nothing else)
  return {
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
  };
};

//LOGIN SPACE
export const loginUserService = async ({ email, password }) => {
  //Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  //Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Create access token
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" },
  );

  //Create Refresh Token
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d" },
  );

  //Return tokens and user info
  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      email: user.email,
    },
  };
};

//FORGOT PASSWORD
export const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    return {
      message: "if user exists, reset token sent",
    };
  }

  // Create random token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash Token
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Save token to user
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  await user.save();

  // Create reset password link
  const link = "http://localhost:3000/users/reset-password/" + hashedToken;

  // send link to email
  sendPasswordResetEmail(email, link);

  return {
    message: "Reset token generated",
    // resetToken,
  };
};

//RESET PASSWORD
export const resetPasswordService = async (token, newPassword) => {
  // Hash incoming token
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  //Find user
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  // Throw error
  if (!user) {
    throw new Error("Invalid or Expired token");
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Updated password
  user.password = hashedPassword;

  // Clear reset fields
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return {
    message: "password reset successful",
  };
};

//REFRESH ACCESS TOKEN
export const refreshAccessTokenService = async (token) => {
  // verify refresh token and get the payload
  const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

  // Generate a new access token
  const accessToken = jwt.sign(
    { id: payload.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" },
  );
  return { accessToken };
};
