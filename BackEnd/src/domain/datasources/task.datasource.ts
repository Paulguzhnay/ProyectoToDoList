import {
    CreateTaskDto,
    DeleteTaskDto,
    GetTaskDto,
    UpdateTaskDto
} from "..";

import { TaskEntity } from "../entities/task.entity";

export abstract class TaskDataSource {
    abstract createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity>;
    abstract updateTask(updateTaskDto: UpdateTaskDto): Promise<TaskEntity>;
    abstract deleteTask(deleteTaskDto: DeleteTaskDto): Promise<void>;
    abstract getTask(getTaskDto: GetTaskDto): Promise<TaskEntity>;
}