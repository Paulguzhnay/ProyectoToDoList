import { UpdateTaskDto } from '../../dtos/task/update-todo.dto';
import { CustomError } from '../../errors/custom.error';
import { TaskRepository } from '../../repositories/task.repository';


interface Task {
    id: string;
    title: string;
    description: string;
    isFinished: boolean;
}

interface UpdateTaskUseCase {
    execute(updateTaskDto: UpdateTaskDto): Promise<Task>;
}

export class UpdateTask implements UpdateTaskUseCase {
    constructor(
        private readonly taskRepository: TaskRepository,

    ) { }

    async execute(updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.taskRepository.updateTask(updateTaskDto);
        if (!task) throw CustomError.internalServer('Error creating task');
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            isFinished: task.isFinished
        }
    }
}

