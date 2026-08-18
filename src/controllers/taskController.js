import {
  createTaskService,
  getSingleTaskService,
  getTaskService,
  updateTaskService,
  assignTaskService,
} from "../services/taskService.js";

// CREATE TASKS
export const createTaskController = async (req, res, next) => {
  try {
    const { title, projectId } = req.body;
    // const {projectId} = req.params;
    const userId = res.locals.userId;

    const task = await createTaskService({ title, projectId, userId });

    return res.status(201).json({
      meassage: "Task Created",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL TASK
export const getTaskController = async (req, res, next) => {
  try {
    // const {projectId} = req.params;
    const userId = res.locals.userId;

    // GET filters from query
    const { projectId, status, priority } = req.query;

    // console.log("Get Tasks ? ProjectID: " + projectId);

    const tasks = await getTaskService({ projectId, userId, status, priority });

    return res.status(201).json({
      message: "Tasks fetched",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE TASK
export const getSingleTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const userId = res.locals.userId;

    const task = await getSingleTaskService(taskId, userId);

    return res.status(200).json({
      message: "Tasks fetched",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE TASK
export const updateTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const userId = res.locals.userId;
    const { title, description, status, priority, assignedTo, dueDate } =
      req.body;

    const task = await updateTaskService({
      taskId,
      userId,
      title,
      description,
      status,
      priority,
      assignedTo,
      dueDate,
    });

    return res.status(200).json({
      message: "Tasks updated successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE TASK
export const deleteTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const userId = res.locals.userId;

    const taskResult = await deleteTaskService(taskId, userId);

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

//Assign Task
export const assignTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const { assignedTo } = req.body;

    const userId = res.locals.userId;

    const task = await assignTaskService({
      taskId,
      assignedTo,
      userId,
    });

    return res.json({
      message: "Task assigned successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};
