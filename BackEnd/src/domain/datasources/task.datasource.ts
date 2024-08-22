import {
    CreateTaskDto,
    DeleteTaskDto,
    GetTasksDto,
    UpdateTaskDto
} from "..";

import { TaskEntity } from "../entities/task.entity";

export abstract class TaskDataSource {
    abstract createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity>;
    abstract updateTask(updateTaskDto: UpdateTaskDto): Promise<TaskEntity>;
    abstract deleteTask(deleteTaskDto: DeleteTaskDto): Promise<void>;
    abstract getTasks(getTasksDto: GetTasksDto): Promise<TaskEntity[]>;
}