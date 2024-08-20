import { AuthMiddleWare } from '../middlewares/auth.middleware';
import { ToDoController } from './controller';
import { ToDoDataSourceImpl, ToDoRepositoryImpl } from "../../infrastructure";
import { Router } from "express";

export class TodoRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new ToDoDataSourceImpl();
        const todoRepository = new ToDoRepositoryImpl(datasource);
        const controller = new ToDoController(todoRepository);

        //* Define your routes here
        router.post('/', [AuthMiddleWare.validateToken], controller.createTask);
        router.put('/:id', [AuthMiddleWare.validateToken], controller.updateTask);
        router.delete('/:id', [AuthMiddleWare.validateToken], controller.deleteTask);
        router.get('/', [AuthMiddleWare.validateToken], controller.getAllTasks);
        return router;
    }
}
