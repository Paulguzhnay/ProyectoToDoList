import { AuthMiddleWare } from '../middlewares/auth.middleware';
import { TaskController } from './controller';
import {  TaskDataSourceImpl, TaskRepositoryImpl } from "../../infrastructure";
import { Router } from "express";

export class TaskRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new TaskDataSourceImpl();
        const taskRepository = new TaskRepositoryImpl(datasource);
        const controller = new TaskController(taskRepository);

        //* Define your routes here
        router.post('/tasks', [AuthMiddleWare.validateToken], controller.createTask);
        router.put('/tasks/:id', [AuthMiddleWare.validateToken], controller.updateTask);
        router.delete('/tasks/:id', [AuthMiddleWare.validateToken], controller.deleteTask);
        // router.get('/tasks', [AuthMiddleWare.validateToken], controller.getAllTasks);
        return router;
    }
}
