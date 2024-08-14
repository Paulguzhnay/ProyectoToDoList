import { ITodoRepository } from '../../repositories/todos/todo.repository';
import { TodoEntity } from '../../entities/todo.entity';

export class GetTodoUseCase {
    constructor(private todoRepository: ITodoRepository) {}

    async execute(id: string): Promise<TodoEntity | null> {
        return await this.todoRepository.findById(id);
    }
}
