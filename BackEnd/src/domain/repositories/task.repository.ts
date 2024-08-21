import { CreateTaskDto, DeleteTaskDto, UpdateTaskDto } from "..";
import { TaskEntity } from "../entities/task.entity";

export abstract class TaskRepository {
    abstract createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity>;
    abstract updateTask(updateTaskDto: UpdateTaskDto): Promise<TaskEntity>;
    abstract deleteTask(deleteTaskDto: DeleteTaskDto): Promise<void>;
}