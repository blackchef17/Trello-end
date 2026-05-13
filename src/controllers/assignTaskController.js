import { assignTaskService } from "../services/assignTaskService.js";

export const assignTaskController = async (req, res, next) => {

    try {

        const { taskId } = req.params;

        const { assignedTo } = req.body;

        const userId = res.locals.user.id;

        const task = await assignTaskService({
            taskId,
            assignedTo,
            userId
        });

        res.json({
            message: "Task assigned successfully",
            data: task
        });

    } catch(error) {
        next(error);
    }
}