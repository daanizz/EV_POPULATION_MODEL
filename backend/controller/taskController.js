import task from "../models/task.js";

export const allTasks = async (req, res) => {
    try {
        const { id } = req.params;
        const tasks = await task.find({ userId: id });
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ error: "something went wrong.." });
    }
};

export const deleteAllTasks = async (req, res) => {
    try {
        const deleted = await task.deleteMany({});
        return res.status(200).json({
            success: "true",
            deletedCount: deleted.deletedCount,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await task.findByIdAndDelete(id);
        if (!deleted) {
            console.log("Couldnt delete the specified task..");
            return res.status(404).json({ message: "error in deleting task" });
        }
        return res.status(200).json({ message: "Deleted the task" });
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error");
    }
};

export const taskById = async (req, res) => {
    try {
        const { id } = req.params;
        const taskDoc = await task.findById(id);
        if (!taskDoc) {
            return res
                .status(404)
                .json({ error: "couldnt find any task in Database!!" });
        }
        return res.status(200).json({ success: true, task: taskDoc });
    } catch (error) {
        return res.status(500).json({ error: "internal error" });
    }
};

export const addNewTask = async (req, res) => {
    try {
        const newTask = req.body;
        if (
            !newTask.title ||
            !newTask.content ||
            !newTask.lastDate ||
            !newTask.category
        ) {
            return res
                .status(400)
                .json({ success: false, error: "All fields are required" });
        }
        const addTask = new task({
            title: newTask.title,
            content: newTask.content,
            lastDate: newTask.lastDate,
            category: newTask.category,
            userId: newTask.userId,
        });
        await addTask.save();
        return res.status(201).json({ success: true });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, error: "Internal server error" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const toChange = await task.findById(id);
        if (!toChange) {
            return res
                .status(404)
                .json({ message: "couldnt find the given collection" });
        }
        const newChanges = req.body;
        const updates = {};
        if (
            newChanges.content !== undefined &&
            newChanges.content !== toChange.content
        )
            updates.content = newChanges.content;
        if (
            newChanges.isDone !== undefined &&
            newChanges.isDone !== toChange.isDone
        )
            updates.isDone = newChanges.isDone;
        if (
            newChanges.lastDate !== undefined &&
            newChanges.lastDate !== toChange.lastDate
        )
            updates.lastDate = newChanges.lastDate;

        if (Object.keys(updates).length > 0) {
            await task.findByIdAndUpdate(id, updates);
            return res.status(200).json({
                success: true,
                message: "Successfully updated the changes",
            });
        }

        return res
            .status(400)
            .json({ message: "Bad request,no updates made.." });
    } catch (error) {
        return res.status(500).json({ message: false });
    }
};
