import mongoose from "mongoose";

const taskModel = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        isDone: {
            type: Boolean,
            required: true,
            default: false,
        },
        lastDate: {
            type: Date,
        },
        category: {
            type: String,
            enum: ["Academic", "Hobby", "Skill"],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model("Task", taskModel);
