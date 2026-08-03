import {
  forgotPasswordService,
  loginUserService,
  refreshAccessTokenService,
  registerUserService,
  resetPasswordService,
} from "../services/userService.js";

// Register User
export const registerUserController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    //Check if all field are inputted
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        status: 0,
        data: null,
      });
    }

    const output = await registerUserService({ username, email, password });

    res.status(201).json({
      message: "user registered successfully. Please login",
      status: 1,
      data: output,
    });
  } catch (error) {
    next(error); // pass to centralized error handler
  }
};

// LOGIN USER
export const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        status: 0,
        data: null,
      });
    }

    //
    const result = await loginUserService({ email, password });

    res.json({
      message: "Login successful",
      status: 1,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//FORGOT PASSWORD
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        status: 0,
        data: null,
      });
    }

    const result = await forgotPasswordService(email);

    res.json({
      message: "Forgot Password",
      status: 1,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Reset Password
export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        message: "Token and new password are required",
        status: 0,
        data: null,
      });
    }

    const result = await resetPasswordService(token, newPassword);

    res.json({
      message: "Reset Password Successful",
      status: 1,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//Refresh Access Token
export const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Token not provided" });
    }
    const result = await refreshAccessTokenService(refreshToken);

    res.json({
      message: "Refresh Token successful",
      status: 1,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
