import { ITodoRepository } from '../../repositories/todos/todo.repository';

export class DeleteTodoUseCase {
    constructor(private todoRepository: ITodoRepository) {}

    async execute(id: string): Promise<void> {
        return await this.todoRepository.delete(id);
    }
}
