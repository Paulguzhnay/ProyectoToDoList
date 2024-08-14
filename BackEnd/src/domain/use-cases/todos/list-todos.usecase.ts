import { ITodoRepository } from '../../repositories/todos/todo.repository';
import { TodoEntity } from '../../entities/todo.entity';

export class ListTodosUseCase {
    constructor(private todoRepository: ITodoRepository) {}

    async execute(): Promise<TodoEntity[]> {
        return await this.todoRepository.findAll();
    }
}
