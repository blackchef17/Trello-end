import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },

    description: {
        type: string
    },

    owner: {
        type: mongoose.Schema.type.objectId,
        ref: "user",
        required: true
    }, 

    members: [
    {
        type: mongoose.Schema.type.objectId,
        ref: "user"
    }
]
},
 {timestamps: true}
);

export default mongoose.model("Team", teamSchema)