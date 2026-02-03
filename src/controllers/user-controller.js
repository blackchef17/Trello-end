import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import userschema from '../models/userschema.js';
import User from '../models/userschema.js';


//Register User
export const register = async (req, res, next) => {
    try{
        const {username, email, password} = req.body;

        //Check if all field are inputted
        if(!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        //Check if user exist
        const existingUser = await userschema.findOne({
            $or: [{ email }, { username }]
        })

         if (existingUser) {
             return res.status(400).json({
             message: "User already exists"
        });
        }

         //HASHING YOUR PASSWORD
        const HashedPassword = await bcrypt.hash(password, 10);


       //Create new user
        const user = await userschema.create({
            username,
            email,
            password: HashedPassword
        })

        //Create JWT Token
        const token = jwt.sign(
            {id: user.id, username: user.username},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN || "1h"}
        )

        //Create Refresh Token
        const refreshToken = jwt.sign(
            {id: user._id},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d"}
        ) 

        res.status(201).json({
            message: "user registered successfully",
            token,
            refreshToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
    next(error); // pass to centralized error handler
  }
};

//FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
    const {email} = req.body;

    const user = await User.findOne({email});

    if(!user) {
        return res.json({
            message: "if user exists, reset token sent"
        });
    }

    // Create random token
    const resetToken = crypto.randomBytes(32).toString("hex")

    // Hash Token
    const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    // Save token to user
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    res.json({
        message: "Reset token generated",
        resetToken
    })
};


// Reset Password
export const resetPassword = async (req, res) => {
    const {token, newPassword} = req.body;

    // Hash incoming token
    const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

    //Find user
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: {$gt: Date.now()}
    });

    if(!user) {
        return res.status(400).json({
            message: "Invalid or expired token"
        });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Updated password
    user.password = hashedPassword;

    // Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({
        message: "password reset successful"
    })
}


//Refresh Access Token
export const refreshAccessToken = (req, res) => {
    const {token} = req.body;
    if(!token) return res.status(401).json({message: "Token not provided"})

        try {
            // verify refresh token and get the payload
            const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

            // Generate a new access token
            const accessToken = jwt.sign(
                {id: payload.id},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: process.env.JWT_EXPIRES_IN || "1h"}
            );

            res.json({accessToken});

        } catch (err) {
            res.status(403).json({message: "Invalid or Expired Token"})
        }
}