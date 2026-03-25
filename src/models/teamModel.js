import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 

    members: [
        {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    role: {
        type: String,
        enum: ["admin", "manager", "member"],
        default: "member"
    }
}
]
},
 {timestamps: true});

export default mongoose.model("Team", teamSchema)