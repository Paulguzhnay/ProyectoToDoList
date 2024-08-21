import { CreateTaskDto } from '../../dtos/task/create-task.dto';
import { CustomError } from '../../errors/custom.error';
import { TaskRepository } from '../../repositories/task.repository';


interface Task {
    id: string;
    title: string;
    description: string;
    isFinished: boolean;
}

interface CreateTaskUseCase {
    execute(createTaskDto: CreateTaskDto): Promise<Task>;
}

export class CreateTask implements CreateTaskUseCase {
    constructor(
        private readonly taskRepository: TaskRepository,

    ) { }

    async execute(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = await this.taskRepository.createTask(createTaskDto);
        if (!task) throw CustomError.internalServer('Error creating task');
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            isFinished: task.isFinished
        }

    }
}

