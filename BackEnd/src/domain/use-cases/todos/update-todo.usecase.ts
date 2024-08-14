import { ITodoRepository } from '../../repositories/todos/todo.repository';
import { TodoEntity } from '../../entities/todo.entity';
import { UpdateTodoDTO } from '../../dtos/todos/update-todo.dto';

export class UpdateTodoUseCase {
    constructor(private todoRepository: ITodoRepository) {}

    async execute(id: string, dto: UpdateTodoDTO): Promise<TodoEntity | null> {
        return await this.todoRepository.update(id, dto);
    }
}
