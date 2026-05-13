import req from "express/lib/request";
import { createTaskService, getSingleTaskService, getTaskService, updateTaskService } from "../services/taskService";
import res from "express/lib/response";

// CREATE TASKS
export const createTaskController = async (req, res, next) => {

    try {
        const {title} = req.body
        const {projectId} = req.params;
        const userId = res.locals.user.id;

        const task = await createTaskService({title, projectId, userId});

        res.status(201).json({
            meassage: "Task Created",
            data: task
        })
    } catch (error) {
        next(error)
    }
};


// GET ALL TASK
export const getTaskController = async (req, res, next) => {

    try {
        const {projectId} = req.params;
        const userId = res.locals.user.id;

        // GET filters from query
        const { status, priority } = req.query;

        const tasks = await getTaskService({projectId, userId, status, priority});

        res.status(201).json({
            message: "Tasks fetched",
            data: tasks
        })
    } catch(error){
        next(error)
    }
};


// GET SINGLE TASK
export const getSingleTaskController = async (req, res, next) => {

    try {
        const { taskId } = req.params;
        const userId = res.locals.user.id;

        const task = await getSingleTaskService({taskId, userId});

         res.status(201).json({
            message: "Tasks fetched",
            data: task
        })
        } catch(error){
        next(error)
        }
};


// UPDATE TASK
export const updateTaskController = async (req, res, next) => {

    try{
        const { taskId } = req.params;
        const userId = res.locals.user.id;

        const task = await updateTaskService(taskId, userId, data)

        res.status(201).json({
            message: "Tasks fetched",
            data: task
        })
        } catch(error){
        next(error)
        }
};


// DELETE TASK
export const deleteTaskController = async (req, res, next) => {

    try{
        const { taskId } = req.params;
        const userId = res.locals.user.id;

        const taskResult = await deleteTaskService(taskId, userId)

         res.json(result);
         } catch (error) {
         next(error);
         }
    };