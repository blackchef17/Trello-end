import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: ["Todo", "in_progress", "Done"],
            default: "Todo"
        },

        priority: {
            type: string,
            enum: ["low", "medium", "high"],
            default: "medium"
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        dueDate: {
            type: Date,
            default: null
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Task", taskSchema);