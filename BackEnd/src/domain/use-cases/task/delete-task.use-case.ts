import { DeleteTaskDto } from "../../dtos/task/delete-task.dto";
import { TaskRepository } from "../../repositories/task.repository";


interface DeleteTaskUseCase {
    execute(deleteTaskDto: DeleteTaskDto): Promise<void>;
}

export class DeleteTask implements DeleteTaskUseCase {
    constructor(
        private readonly taskRepository: TaskRepository
    ) {}

    async execute(deleteTaskDto: DeleteTaskDto): Promise<void> {
        return await this.taskRepository.deleteTask(deleteTaskDto);
    }
}
