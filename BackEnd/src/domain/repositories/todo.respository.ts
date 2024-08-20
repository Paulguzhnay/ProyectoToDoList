import { CreateTaskDto, UpdateTaskDto } from "..";
import { TodoEntity } from "../entities/todo.entity";



export abstract class ToDoRepository {
    abstract createTask(createTaskDto: CreateTaskDto): Promise<TodoEntity>;
    abstract updateTask(updateTaskDto: UpdateTaskDto): Promise<TodoEntity>;
}