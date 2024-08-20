import { CreateTaskDto, UpdateTaskDto } from "..";
import { TodoEntity } from "../entities/todo.entity";

export abstract class ToDoDataSource {
    abstract create(createTaskDto: CreateTaskDto): Promise<TodoEntity>;
    abstract update(updateTaskDto: UpdateTaskDto): Promise<TodoEntity>;
    abstract delete(id: string): Promise<void>;
    abstract getAll(): Promise<TodoEntity[]>;
    abstract getOne(id: string): Promise<TodoEntity>;
}