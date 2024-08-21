import { Router } from "express";
import { AuthRoutes } from './auth/routes';
import { TaskRoutes } from './task/routes';

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        
        //* Define your routes here
        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/todo', TaskRoutes.routes);
        return router;
    }
}