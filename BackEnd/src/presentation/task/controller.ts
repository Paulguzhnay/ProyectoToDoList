
import { Request, Response } from 'express';
import {
    TaskRepository,
    UpdateTaskDto,
    CreateTaskDto,
    CustomError,
    CreateTask,
    UpdateTask,
    DeleteTaskDto,
    DeleteTask,
    GetTasksDto,
    GetTasks
} from '../../domain';

export class TaskController {
    constructor(
        private readonly taskRepository: TaskRepository
    ) { }

    private handleError(error: unknown, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal server error' });
    }

    createTask = (req: Request, res: Response) => {
        const [error, createTaskDto] = CreateTaskDto.create(req.body);
        if (error) return res.status(400).json({ message: error });

        new CreateTask(this.taskRepository)
            .execute(createTaskDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }

    updateTask = (req: Request, res: Response) => {
        const taskID = req.params.id;
        const [error, updateTaskDto] = UpdateTaskDto.create({ id: taskID, ...req.body});
        if (error) return res.status(400).json({ message: error });

        new UpdateTask(this.taskRepository)
            .execute(updateTaskDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }

    deleteTask = (req: Request, res: Response) => {
        const taskID = req.params.id;
        const [error, deleteTaskDto] = DeleteTaskDto.create({id: taskID, ...req.body});
        if (error) return res.status(400).json({ message: error });

        new DeleteTask(this.taskRepository)
            .execute(deleteTaskDto!)
            .then(() => res.json({ message: 'Task deleted successfully' }))
            .catch(error => this.handleError(error, res));
    }

    getTasks = (req: Request, res: Response) => {
        const [error] = GetTasksDto.create(req.body);
        if (error) return res.status(400).json({ message: error }); 
             
        new GetTasks(this.taskRepository)
            .execute(req.body)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }
}