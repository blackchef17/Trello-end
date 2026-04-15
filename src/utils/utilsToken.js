import jwt from "jsonwebtoken";

// Create access token
export const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
};

//Create Refresh Token
export const generateRefreshToken = (user) => {
 return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET,
  { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d" },
)};

//Verify refresh token
export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};
