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
        router.post('/', [AuthMiddleWare.validateToken], controller.createTask);
        router.put('/:id', [AuthMiddleWare.validateToken], controller.updateTask);
        router.delete('/:id', [AuthMiddleWare.validateToken], controller.deleteTask);
        router.get('/', [AuthMiddleWare.validateToken], controller.getTasks);
        return router;
    }
}
