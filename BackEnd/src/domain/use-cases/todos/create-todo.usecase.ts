import { ITodoRepository } from '../../repositories/todos/todo.repository';
import { TodoEntity } from '../../entities/todo.entity';
import { CreateTodoDTO } from '../../dtos/todo/create-task.dto';

export class CreateTodoUseCase {
    constructor(private todoRepository: ITodoRepository) {}

    async execute(dto: CreateTodoDTO): Promise<TodoEntity> {
        const todo = new TodoEntity(
            Date.now().toString(),
            dto.title,
            dto.description,
            dto.isFinished,
            new Date(),
            new Date(),
        );

        return await this.todoRepository.create(todo);
    }
}
