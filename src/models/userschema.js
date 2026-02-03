import mongoose from "mongoose";

const userSchema = new mongoose.Schema (
    {
        username: {
            type: String,
            required: [true, "username is required"],
            minlength: [3, "username must be atleast 3 character"],
            maxlength: [20, "username must be less than 20 character"],
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
        },
        password: {
            type: String,
            required: [true, "password is required"],
            minlength: [6, "password must not be less than 6 character"]
        }, 


        //Password Reset Field
        resetPasswordToken: String,
        resetPasswordExpires: Date
    },
    {timestamps: true}
);

const User = mongoose.model("User", userSchema)

export default User;